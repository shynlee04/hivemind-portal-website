import type { ReactorNodeId, WokReactorStageProps } from "../../types/portal";
import { getReactorNodeMetadata, REACTOR_NODE_IDS } from "./reactor-nodes";

interface NodeCoord {
  readonly id: ReactorNodeId;
  readonly cx: number;
  readonly cy: number;
  readonly labelX: number;
  readonly labelY: number;
}

export const NEO_TOKYO_NODE_HEX: Readonly<Record<ReactorNodeId, string>> = {
  devin: "#00F0FF",
  antigravity: "#FF2A6D",
  freebuff: "#FFB800",
  substrate: "#00E5A3",
};

const NODE_COORDS: ReadonlyArray<NodeCoord> = [
  { id: "devin", cx: 190, cy: 148, labelX: 38, labelY: 78 },
  { id: "antigravity", cx: 610, cy: 148, labelX: 502, labelY: 78 },
  { id: "freebuff", cx: 400, cy: 76, labelX: 270, labelY: 16 },
  { id: "substrate", cx: 400, cy: 320, labelX: 260, labelY: 418 },
];

function hexPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const x = (cx + r * Math.cos(angle)).toFixed(1);
    const y = (cy + r * Math.sin(angle)).toFixed(1);
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

function octagonPoints(cx: number, cy: number, rx: number, ry: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i + Math.PI / 8;
    const x = (cx + rx * Math.cos(angle)).toFixed(1);
    const y = (cy + ry * Math.sin(angle)).toFixed(1);
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

export function renderDeterministicFallbackSvg(
  props: WokReactorStageProps
): string {
  const locale = props.locale ?? "en";
  const activeHarness = props.activeHarness;
  const activeHorizon = props.activeHorizon ?? "all";

  const hexRingOffsets = [
    { dx: 0, dy: 0, r: 24 },
    { dx: -42, dy: 0, r: 20 },
    { dx: 42, dy: 0, r: 20 },
    { dx: -21, dy: -34, r: 20 },
    { dx: 21, dy: -34, r: 20 },
    { dx: -21, dy: 34, r: 20 },
    { dx: 21, dy: 34, r: 20 },
    { dx: -84, dy: 0, r: 16 },
    { dx: 84, dy: 0, r: 16 },
    { dx: -63, dy: -34, r: 16 },
    { dx: 63, dy: -34, r: 16 },
    { dx: -63, dy: 34, r: 16 },
    { dx: 63, dy: 34, r: 16 },
  ];

  const honeycombPolygons = hexRingOffsets
    .map(
      (cell, idx) =>
        `<polygon points="${hexPoints(400 + cell.dx, 320 + cell.dy * 0.68, cell.r)}" fill="${
          activeHarness === "substrate" ? "#092622" : "#0B0E17"
        }" stroke="#00E5A3" stroke-width="${
          idx === 0 && activeHarness === "substrate" ? "2.4" : "1.2"
        }" stroke-opacity="${activeHarness === "substrate" ? "0.95" : "0.52"}" />`
    )
    .join("");

  const nodeMarkup = NODE_COORDS.map((coord) => {
    const meta = getReactorNodeMetadata(coord.id, locale);
    const accentHex = NEO_TOKYO_NODE_HEX[coord.id];
    const isActive = coord.id === activeHarness;
    const isDimmed =
      activeHorizon !== "all" && meta.horizon !== activeHorizon && !isActive;
    const opacity = isDimmed ? "0.38" : "1";
    const modelsText = meta.modelIds.join(" / ");
    const boxWidth = coord.id === "substrate" ? 280 : 260;

    return `<g data-reactor-node="${coord.id}" opacity="${opacity}">
      <path d="M ${coord.cx} ${coord.cy} Q 400 218 400 262" fill="none" stroke="${accentHex}" stroke-width="${
        isActive ? "2.8" : "1.4"
      }" stroke-dasharray="${isActive ? "none" : "6 4"}" opacity="${
        isActive ? "0.96" : "0.48"
      }" />
      ${
        isActive
          ? `<circle data-active-ring="${coord.id}" cx="${coord.cx}" cy="${coord.cy}" r="36" fill="none" stroke="${accentHex}" stroke-width="2.2" stroke-dasharray="8 4" />
             <circle cx="${coord.cx}" cy="${coord.cy}" r="45" fill="none" stroke="${accentHex}" stroke-width="1.1" opacity="0.45" />`
          : ""
      }
      <polygon points="${octagonPoints(coord.cx, coord.cy, isActive ? 22 : 17, isActive ? 22 : 17)}" fill="#0B0E17" stroke="${accentHex}" stroke-width="${
        isActive ? "2.8" : "1.8"
      }" />
      <circle cx="${coord.cx}" cy="${coord.cy}" r="${
        isActive ? "8" : "5"
      }" fill="${accentHex}" />
      <g transform="translate(${coord.labelX}, ${coord.labelY})">
        <rect x="0" y="0" width="${boxWidth}" height="52" rx="4" fill="#0B0E17" fill-opacity="0.94" stroke="${
          isActive ? accentHex : "#1E293B"
        }" stroke-width="${isActive ? "1.8" : "1"}" />
        <text x="12" y="21" fill="#F8FAFC" font-family="Chakra Petch, sans-serif, monospace" font-size="14" font-weight="700">${meta.label}</text>
        <text x="12" y="41" fill="${accentHex}" font-family="Chakra Petch, sans-serif, monospace" font-size="14">${modelsText}</text>
      </g>
    </g>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" role="img" aria-label="Neo-Tokyo 3D Orbital Command Core Schematic" data-fallback-adapter="DeterministicCanvasFallbackAdapter" data-active-harness="${activeHarness}" data-active-horizon="${activeHorizon}">
    <rect width="800" height="500" fill="#05060A" />
    <g opacity="0.28" stroke="#151C2C" stroke-width="1">
      <line x1="0" y1="360" x2="800" y2="360" />
      <line x1="0" y1="410" x2="800" y2="410" />
      <line x1="0" y1="460" x2="800" y2="460" />
      <line x1="400" y1="0" x2="400" y2="500" />
      <line x1="400" y1="260" x2="80" y2="500" />
      <line x1="400" y1="260" x2="720" y2="500" />
      <ellipse cx="400" cy="295" rx="340" ry="126" fill="none" stroke="#00F0FF" stroke-opacity="0.35" stroke-dasharray="4 6" />
    </g>
    <g data-command-core="neo-tokyo-spire">
      <ellipse cx="400" cy="262" rx="268" ry="82" fill="#0B0E17" fill-opacity="0.72" stroke="#00F0FF" stroke-width="2.2" stroke-opacity="0.82" />
      <ellipse cx="400" cy="262" rx="212" ry="62" fill="none" stroke="#FF2A6D" stroke-width="1.5" stroke-dasharray="10 5" stroke-opacity="0.68" />
      <ellipse cx="400" cy="262" rx="152" ry="44" fill="none" stroke="#FFB800" stroke-width="1.4" stroke-opacity="0.64" />
      <polygon points="374,176 426,176 442,276 358,276" fill="#0B0E17" stroke="#00F0FF" stroke-width="2" />
      <polygon points="400,192 418,224 400,256 382,224" fill="#00F0FF" fill-opacity="0.85" />
    </g>
    <g data-honeycomb-core="substrate-lattice">
      ${honeycombPolygons}
    </g>
    ${nodeMarkup}
  </svg>`;
}

export { REACTOR_NODE_IDS };
