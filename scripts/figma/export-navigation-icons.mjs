import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { nodeId, parseFig, resolveVectorNodePaths } from "openfig-core";

const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/figma/export-navigation-icons.mjs <file.fig>");

const document = parseFig(new Uint8Array(readFileSync(source)));
const icons = {
  home: "79:8241",
  categories: "79:8245",
  offer: "79:8244",
  cart: "166:3148",
  profile: "79:8251",
  back: "76:734",
  lock: "112:13058",
  success: "161:3064",
  empty: "84:9099",
  remove: "140:36",
  error: "76:859",
  "logo-mark": "234:318",
  "status-signal": "76:682",
  "status-wifi": "76:684",
  "status-battery": "76:686",
};
const colors = {
  home: "white",
  categories: "white",
  offer: "white",
  cart: "white",
  profile: "white",
  success: "#34723a",
  remove: "#a33b33",
  error: "#b2443d",
  "logo-mark": "#c9a07e",
};

function collectVectors(rootId) {
  const vectors = [];
  function visit(id, offsetX = 0, offsetY = 0) {
    const node = document.nodeMap.get(id);
    if (!node) return;
    const x = offsetX + (id === rootId ? 0 : (node.transform?.m02 ?? 0));
    const y = offsetY + (id === rootId ? 0 : (node.transform?.m12 ?? 0));
    if (node.type === "VECTOR") {
      const resolved = resolveVectorNodePaths(document, node);
      const geometry = node.fillPaints?.length ? resolved.fill : resolved.stroke;
      for (const path of geometry) vectors.push({ path: path.svgPath, x, y });
    }
    for (const child of document.childrenMap.get(id) ?? []) visit(nodeId(child), x, y);
  }
  visit(rootId);
  return vectors;
}

for (const [name, rootId] of Object.entries(icons)) {
  const root = document.nodeMap.get(rootId);
  const width = root?.size?.x ?? 20;
  const height = root?.size?.y ?? 20;
  const paths = collectVectors(rootId)
    .map(({ path, x, y }) => `<path d="${path}" transform="translate(${x} ${y})"/>`)
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="${colors[name] ?? "black"}" data-figma-node="${rootId}">${paths}</svg>\n`;
  const target = `public/customer-flow/icons/${name}.svg`;
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, svg);
}

console.log(`Exported ${Object.keys(icons).length} navigation icons from Figma.`);
