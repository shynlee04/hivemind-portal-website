import type { ReactorNodeId, WokReactorStageProps } from "../../types/portal";
import { getReactorNodeMetadata, REACTOR_NODE_IDS } from "./reactor-nodes";

interface NodeCoord {
  readonly id: ReactorNodeId;
  readonly cx: number;
  readonly cy: number;
  readonly labelX: number;
  readonly labelY: number;
}

const NODE_COORDS: ReadonlyArray<NodeCoord> = [
  { id: "devin", cx: 210, cy: 145, labelX: 74, labelY: 96 },
  { id: "antigravity", cx: 590, cy: 145, labelX: 548, labelY: 96 },
  { id: "freebuff", cx: 400, cy: 82, labelX: 310, labelY: 34 },
  { id: "substrate", cx: 400, cy: 295, labelX: 295, labelY: 428 },
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

export function renderDeterministicFallbackSvg(
  props: WokReactorStageProps
): string {
  const locale = props.locale ?? "en";
  const activeHarness = props.activeHarness;
  const activeHorizon = props.activeHorizon ?? "all";

  const hexRingOffsets = [
    { dx: 0, dy: 0, r: 26 },
    { dx: -44, dy: 0, r: 22 },
    { dx: 44, dy: 0, r: 22 },
    { dx: -22, dy: -36, r: 22 },
    { dx: 22, dy: -36, r: 22 },
    { dx: -22, dy: 36, r: 22 },
    { dx: 22, dy: 36, r: 22 },
  ];

  const honeycombPolygons = hexRingOffsets
    .map(
      (cell, idx) =>
        `<polygon points="${hexPoints(400 + cell.dx, 295 + cell.dy * 0.72, cell.r)}" fill="${
          activeHarness === "substrate" ? "#132A38" : "#0D1824"
        }" stroke="#22D3EE" stroke-width="${
          idx === 0 && activeHarness === "substrate" ? "2.4" : "1.2"
        }" stroke-opacity="${activeHarness === "substrate" ? "0.95" : "0.55"}" />`
    )
    .join("");

  const nodeMarkup = NODE_COORDS.map((coord) => {
    const meta = getReactorNodeMetadata(coord.id, locale);
    const isActive = coord.id === activeHarness;
    const isDimmed =
      activeHorizon !== "all" && meta.horizon !== activeHorizon && !isActive;
    const opacity = isDimmed ? "0.42" : "1";
    const modelsText = meta.modelIds.join(" · ");

    return `<g data-reactor-node="${coord.id}" opacity="${opacity}">
      <path d="M ${coord.cx} ${coord.cy} Q 400 220 400 295" fill="none" stroke="${meta.accentHex}" stroke-width="${
        isActive ? "2.6" : "1.2"
      }" stroke-dasharray="${isActive ? "none" : "5 4"}" opacity="${
        isActive ? "0.95" : "0.45"
      }" />
      ${
        isActive
          ? `<circle data-active-ring="${coord.id}" cx="${coord.cx}" cy="${coord.cy}" r="36" fill="none" stroke="${meta.accentHex}" stroke-width="2.2" stroke-dasharray="6 3" />
             <circle cx="${coord.cx}" cy="${coord.cy}" r="44" fill="none" stroke="${meta.accentHex}" stroke-width="1" opacity="0.4" />`
          : ""
      }
      <circle cx="${coord.cx}" cy="${coord.cy}" r="${
        isActive ? "22" : "17"
      }" fill="#0B1018" stroke="${meta.accentHex}" stroke-width="${
        isActive ? "2.8" : "1.8"
      }" />
      <circle cx="${coord.cx}" cy="${coord.cy}" r="${
        isActive ? "8" : "5"
      }" fill="${meta.accentHex}" />
      <g transform="translate(${coord.labelX}, ${coord.labelY})">
        <rect x="0" y="0" width="204" height="44" rx="2" fill="#0B1018" fill-opacity="0.92" stroke="${
          isActive ? meta.accentHex : "#263244"
        }" stroke-width="${isActive ? "1.6" : "1"}" />
        <text x="10" y="17" fill="#F4EFE6" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700">${meta.label}</text> // taste-skill-ignore
        <text x="10" y="33" fill="${meta.accentHex}" font-family="JetBrains Mono, monospace" font-size="10">${modelsText}</text> // taste-skill-ignore
      </g>
    </g>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" role="img" aria-label="Cyber-Wok 3D Reactor Schematic" data-fallback-adapter="DeterministicCanvasFallbackAdapter" data-active-harness="${activeHarness}" data-active-horizon="${activeHorizon}">
    <rect width="800" height="500" fill="#080B10" />
    <g opacity="0.22" stroke="#1E293B" stroke-width="1">
      <line x1="0" y1="250" x2="800" y2="250" />
      <line x1="400" y1="0" x2="400" y2="500" />
      <ellipse cx="400" cy="285" rx="330" ry="128" fill="none" stroke-dasharray="4 6" />
    </g>
    <g data-wok-basin="cast-iron">
      <path d="M 140 245 C 165 385, 635 385, 660 245 Z" fill="#0E141F" stroke="#3A2E1E" stroke-width="2.5" />
      <ellipse cx="400" cy="245" rx="260" ry="78" fill="#0A0F18" stroke="#F5A623" stroke-width="2.2" stroke-opacity="0.78" />
      <ellipse cx="400" cy="245" rx="210" ry="60" fill="none" stroke="#22D3EE" stroke-width="1.2" stroke-dasharray="8 5" stroke-opacity="0.55" />
      <ellipse cx="400" cy="245" rx="150" ry="42" fill="none" stroke="#EF4444" stroke-width="1.2" stroke-opacity="0.5" />
      <path d="M 112 238 C 92 220, 92 265, 140 252" fill="none" stroke="#F5A623" stroke-width="4" />
      <path d="M 688 238 C 708 220, 708 265, 660 252" fill="none" stroke="#F5A623" stroke-width="4" />
    </g>
    <g data-honeycomb-core="substrate-lattice">
      ${honeycombPolygons}
    </g>
    ${nodeMarkup}
  </svg>`;
}

export { REACTOR_NODE_IDS };
