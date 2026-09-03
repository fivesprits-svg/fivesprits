import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { nodeId, parseFig, resolveVectorNodePaths } from "openfig-core";

const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/figma/extract-design-manifest.mjs <file.fig>");
const document = parseFig(new Uint8Array(readFileSync(source)));
const roots = [
  "76:678",
  "76:722",
  "76:843",
  "76:6482",
  "76:6580",
  "87:9793",
  "112:11690",
  "84:8975",
  "140:2",
  "112:13024",
];
const selected = new Map();
function visit(id) {
  const node = document.nodeMap.get(id);
  if (!node || selected.has(id)) return;
  selected.set(id, node);
  for (const child of document.childrenMap.get(id) ?? []) visit(nodeId(child));
}
roots.forEach(visit);
const hashToHex = (hash) => (hash ? Buffer.from(Object.values(hash)).toString("hex") : null);
const serializePaint = (paint) => ({
  ...paint,
  imageHash: hashToHex(paint.image?.hash),
  thumbnailHash: hashToHex(paint.imageThumbnail?.hash),
  image: undefined,
  imageThumbnail: undefined,
});
const nodes = Object.fromEntries(
  [...selected].map(([id, node]) => [
    id,
    {
      id,
      name: node.name,
      type: node.type,
      size: node.size,
      transform: node.transform,
      opacity: node.opacity,
      cornerRadius: node.cornerRadius,
      cornerRadii: node.cornerRadii,
      fills: node.fillPaints?.map(serializePaint),
      strokes: node.strokePaints?.map(serializePaint),
      strokeWeight: node.strokeWeight,
      effects: node.effects,
      blendMode: node.blendMode,
      text: node.textData?.characters,
      textData: node.textData,
      fontName: node.fontName,
      fontSize: node.fontSize,
      lineHeight: node.lineHeight,
      letterSpacing: node.letterSpacing,
      textAlignHorizontal: node.textData?.style?.textAlignHorizontal,
      fillGeometry: resolveVectorNodePaths(document, node).fill.map((path) => ({
        windingRule: path.windingRule,
        styleID: path.styleID,
        svgPath: path.svgPath,
      })),
      strokeGeometry: resolveVectorNodePaths(document, node).stroke.map((path) => ({
        windingRule: path.windingRule,
        styleID: path.styleID,
        svgPath: path.svgPath,
      })),
      stackMode: node.stackMode,
      stackSpacing: node.stackSpacing,
      parentId: node.parentIndex?.guid
        ? `${node.parentIndex.guid.sessionID}:${node.parentIndex.guid.localID}`
        : null,
      childIds: (document.childrenMap.get(id) ?? []).map(nodeId),
    },
  ]),
);
const manifest = {
  source: document.meta?.file_name,
  format: document.header.prelude,
  version: document.header.version,
  nodeCount: document.nodes.length,
  selectedNodeCount: selected.size,
  imageCount: document.images.size,
  imageHashes: [...document.images.keys()],
  roots,
  nodes,
};
const manifestPath = "docs/figma/customer-flow-manifest.json";
mkdirSync(dirname(manifestPath), { recursive: true });
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
const imageDir = "public/customer-flow/figma-images";
mkdirSync(imageDir, { recursive: true });
for (const [name, bytes] of document.images) writeFileSync(join(imageDir, name), bytes);
console.log(`Extracted ${selected.size} nodes and ${document.images.size} images.`);
