import type {
  Locale,
  ReactorNodeId,
  WokReactorStageProps,
} from "../../types/portal";
import { getReactorNodeMetadata } from "./reactor-nodes";

interface SvgNodeCoordinate {
  readonly id: ReactorNodeId;
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
}

const NODE_COORDINATES: ReadonlyArray<SvgNodeCoordinate> = [
  { id: "devin", cx: 210, cy: 155, r: 46 },
  { id: "antigravity", cx: 590, cy: 155, r: 46 },
  { id: "freebuff", cx: 400, cy: 405, r: 48 },
  { id: "substrate", cx: 400, cy: 245, r: 62 },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function renderDeterministicFallbackSvg(
  props: WokReactorStageProps
): string {
  const locale: Locale = props.locale ?? "en";
  const activeHarness: ReactorNodeId = props.activeHarness;
  const activeHorizon = props.activeHorizon ?? "all";
  const activeMeta = getReactorNodeMetadata(activeHarness, locale);

  const headerTitle =
    locale === "vi"
      ? "SƠ ĐỒ LÒ PHẢN ỨNG CYBER-WOK · CHẾ ĐỘ TĨNH TẤT ĐỊNH"
      : "CYBER-WOK REACTOR SCHEMATIC · DETERMINISTIC FALLBACK";

  const statusPrefix = locale === "vi" ? "NODE ĐANG CHỌN" : "ACTIVE NODE";

  const nodeGroups = NODE_COORDINATES.map((coord) => {
    const meta = getReactorNodeMetadata(coord.id, locale);
    const isActive = coord.id === activeHarness;
    const strokeWidth = isActive ? 3.5 : 1.75;
    const strokeColor = isActive ? meta.accentHex : "#3A2E1E";
    const fillColor = isActive ? "#171F2E" : "#111622";
    const modelLine = meta.modelIds.join(" / ");

    const activeRing = isActive
      ? `<circle cx="${coord.cx}" cy="${coord.cy}" r="${coord.r + 12}" fill="none" stroke="${meta.accentHex}" stroke-width="2.5" stroke-dasharray="6 4" data-active-ring="${coord.id}" />`
      : "";

    return [
      `<g data-reactor-node="${coord.id}" data-node-active="${isActive ? "true" : "false"}">`,
      activeRing,
      `<circle cx="${coord.cx}" cy="${coord.cy}" r="${coord.r}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />`,
      `<text x="${coord.cx}" y="${coord.cy - 10}" text-anchor="middle" fill="#F4EFE6" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">${escapeXml(meta.id.toUpperCase())}</text>`,
      `<text x="${coord.cx}" y="${coord.cy + 8}" text-anchor="middle" fill="${meta.accentHex}" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600">${escapeXml(modelLine)}</text>`,
      `<text x="${coord.cx}" y="${coord.cy + 24}" text-anchor="middle" fill="#94A3B8" font-family="Be Vietnam Pro, sans-serif" font-size="10">${escapeXml(meta.label)}</text>`,
      `</g>`,
    ].join("");
  }).join("");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" role="img" aria-label="${escapeXml(headerTitle)} - ${escapeXml(activeMeta.label)}" data-fallback-adapter="DeterministicCanvasFallbackAdapter" data-active-harness="${activeHarness}" data-active-horizon="${activeHorizon}" data-locale="${locale}">`,
    `<rect x="0" y="0" width="800" height="500" fill="#080B10" />`,
    `<rect x="12" y="12" width="776" height="476" rx="2" fill="none" stroke="#3A2E1E" stroke-width="1.5" />`,
    `<text x="28" y="38" fill="#F5A623" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">${escapeXml(headerTitle)}</text>`,
    `<text x="772" y="38" text-anchor="end" fill="#22D3EE" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">${escapeXml(statusPrefix)}: ${escapeXml(activeHarness.toUpperCase())} (${escapeXml(activeMeta.modelIds.join(", "))})</text>`,
    `<ellipse cx="400" cy="265" rx="295" ry="185" fill="#111622" stroke="#F5A623" stroke-width="2" stroke-opacity="0.65" data-wok-basin="seasoned-cast-iron" />`,
    `<ellipse cx="400" cy="265" rx="255" ry="155" fill="none" stroke="#3A2E1E" stroke-width="1.5" stroke-dasharray="8 6" />`,
    `<polygon points="400,155 478,200 478,290 400,335 322,290 322,200" fill="#080B10" stroke="#22D3EE" stroke-width="2" data-substrate-lattice="honeycomb-hexagon" />`,
    `<polygon points="400,175 460,210 460,280 400,315 340,280 340,210" fill="none" stroke="#3A2E1E" stroke-width="1.25" />`,
    `<g data-wire-arcs="acp-jsonrpc">`,
    `<path d="M 252 175 Q 325 205 342 225" fill="none" stroke="#F5A623" stroke-width="2" stroke-dasharray="5 4" />`,
    `<path d="M 548 175 Q 475 205 458 225" fill="none" stroke="#22D3EE" stroke-width="2" stroke-dasharray="5 4" />`,
    `<path d="M 400 357 L 400 307" fill="none" stroke="#10B981" stroke-width="2" stroke-dasharray="5 4" />`,
    `<path d="M 256 155 Q 400 95 544 155" fill="none" stroke="#3A2E1E" stroke-width="1.5" />`,
    `</g>`,
    nodeGroups,
    `<rect x="28" y="446" width="744" height="28" rx="2" fill="#111622" stroke="#3A2E1E" stroke-width="1" />`,
    `<text x="40" y="464" fill="#F4EFE6" font-family="JetBrains Mono, monospace" font-size="11">ACP WIRE: ${escapeXml(activeMeta.wireProtocol)} · CMD: ${escapeXml(activeMeta.sampleCommand)}</text>`,
    `</svg>`,
  ].join("");
}
