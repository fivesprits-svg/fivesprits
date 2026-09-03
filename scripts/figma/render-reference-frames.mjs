import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync("docs/figma/customer-flow-manifest.json", "utf8"));
const outputDir = "docs/figma/reference-renders";
mkdirSync(outputDir, { recursive: true });

const escapeXml = (value = "") =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const color = (paint, fallback = "none") => {
  if (paint?.type !== "SOLID" || !paint.color) return fallback;
  const { r, g, b, a = 1 } = paint.color;
  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${a * (paint.opacity ?? 1)})`;
};

const matrix = (transform) =>
  transform
    ? `matrix(${transform.m00} ${transform.m10} ${transform.m01} ${transform.m11} ${transform.m02} ${transform.m12})`
    : "matrix(1 0 0 1 0 0)";
const visiblePaint = (paints = [], index = 0) =>
  paints[index] ?? paints.find((paint) => paint.visible !== false);
const imageHref = (paint) => {
  const hash = paint?.imageHash;
  const thumbnail = paint?.thumbnailHash;
  const available = manifest.imageHashes ?? [];
  const selected = available.includes(hash) ? hash : thumbnail;
  return selected ? `../../../public/customer-flow/figma-images/${selected}` : null;
};
const shadowFilter = (node, id) => {
  const shadow = node.effects?.find(
    (effect) => effect.visible !== false && effect.type === "DROP_SHADOW",
  );
  if (!shadow) return { definition: "", attribute: "" };
  const dx = shadow.offset?.x ?? 0;
  const dy = shadow.offset?.y ?? 0;
  const blur = (shadow.radius ?? 0) / 2;
  return {
    definition: `<filter id="shadow-${id.replace(":", "-")}" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${blur}" flood-color="${color({ type: "SOLID", color: shadow.color }, "black")}"/></filter>`,
    attribute: ` filter="url(#shadow-${id.replace(":", "-")})"`,
  };
};

let definitions = [];

function renderNode(id) {
  const node = manifest.nodes[id];
  if (!node) return "";
  const width = node.size?.x ?? 0;
  const height = node.size?.y ?? 0;
  const fill = color(
    node.fills?.find((paint) => paint.visible !== false),
    "none",
  );
  const stroke = color(
    node.strokes?.find((paint) => paint.visible !== false),
    "none",
  );
  let body = "";
  const imagePaint = node.fills?.find((paint) => paint.visible !== false && paint.type === "IMAGE");
  const href = imageHref(imagePaint);
  const clipId = `clip-${id.replace(":", "-")}`;
  const shadow = shadowFilter(node, id);
  if (shadow.definition) definitions.push(shadow.definition);
  if (["FRAME", "ROUNDED_RECTANGLE", "RECTANGLE", "ELLIPSE"].includes(node.type)) {
    body +=
      node.type === "ELLIPSE"
        ? `<ellipse cx="${width / 2}" cy="${height / 2}" rx="${width / 2}" ry="${height / 2}" fill="${fill}" stroke="${stroke}"${shadow.attribute}/>`
        : `<rect width="${width}" height="${height}" rx="${node.cornerRadius ?? node.cornerRadii?.[0] ?? 0}" fill="${fill}" stroke="${stroke}" stroke-width="${node.strokeWeight ?? 0}"${shadow.attribute}/>`;
  }
  if (href) {
    definitions.push(
      `<clipPath id="${clipId}"><rect width="${width}" height="${height}" rx="${node.cornerRadius ?? node.cornerRadii?.[0] ?? 0}"/></clipPath>`,
    );
    const fit = imagePaint.imageScaleMode === "STRETCH" ? "none" : "xMidYMid slice";
    body += `<image href="${href}" width="${width}" height="${height}" preserveAspectRatio="${fit}" clip-path="url(#${clipId})"/>`;
  }
  for (const geometry of node.fillGeometry ?? []) {
    body += `<path d="${escapeXml(geometry.svgPath)}" fill="${color(visiblePaint(node.fills, geometry.styleID), fill)}" fill-rule="${geometry.windingRule === "EVENODD" ? "evenodd" : "nonzero"}"${shadow.attribute}/>`;
  }
  for (const geometry of node.strokeGeometry ?? []) {
    body += `<path d="${escapeXml(geometry.svgPath)}" fill="${color(visiblePaint(node.strokes, geometry.styleID), stroke)}"/>`;
  }
  if (node.type === "TEXT" && node.text) {
    const fontSize = node.fontSize ?? node.textData?.style?.fontSize ?? 14;
    const fontWeight = node.textData?.style?.fontWeight ?? 400;
    const fontFamily = escapeXml(node.fontName?.family ?? "Inter");
    const lineHeight = node.lineHeight?.value ?? node.lineHeight ?? fontSize * 1.2;
    const lines = node.text.split("\n");
    body += `<text x="0" y="${fontSize}" font-family="${fontFamily}, Arial, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" letter-spacing="${node.letterSpacing?.value ?? node.letterSpacing ?? 0}" fill="${color(node.fills?.[0], "black")}">${lines.map((line, index) => `<tspan x="0" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`).join("")}</text>`;
  }
  body += (node.childIds ?? []).map(renderNode).join("");
  return `<g transform="${matrix(node.transform)}" opacity="${node.opacity ?? 1}" data-node-id="${id}">${body}</g>`;
}

for (const rootId of manifest.roots) {
  const root = manifest.nodes[rootId];
  definitions = [];
  const name = root.name
    .replaceAll(/[^a-z0-9]+/gi, "-")
    .replaceAll(/(^-|-$)/g, "")
    .toLowerCase();
  const content = (root.childIds ?? []).map(renderNode).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${root.size.x}" height="${root.size.y}" viewBox="0 0 ${root.size.x} ${root.size.y}" data-figma-frame="${rootId}"><defs>${definitions.join("")}</defs>${content}</svg>\n`;
  writeFileSync(`${outputDir}/${name}.svg`, svg);
}

console.log(`Rendered ${manifest.roots.length} independent Figma reference frames.`);
