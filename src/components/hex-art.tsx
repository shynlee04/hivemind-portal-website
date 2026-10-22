import type { CSSProperties, ReactElement } from "react";
import type { ArtId } from "@/modules/locale-dictionary";
import styles from "./hex-art.module.css";

const CX = 43.3;
const CY = 50;

function pts(cx: number, cy: number, r: number): string {
  const x = r * 0.866;
  return `${cx},${cy - r} ${cx + x},${cy - r / 2} ${cx + x},${cy + r / 2} ${cx},${cy + r} ${cx - x},${cy + r / 2} ${cx - x},${cy - r / 2}`;
}

function Cell({
  cx,
  cy,
  r,
  className,
  style,
}: {
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
  readonly className?: string;
  readonly style?: CSSProperties;
}) {
  return (
    <polygon
      points={pts(cx, cy, r)}
      className={className}
      style={style}
    />
  );
}

function AgentScene() {
  const workers: ReadonlyArray<readonly [number, number]> = [
    [CX + 18, CY - 10.4],
    [CX, CY - 20.8],
    [CX - 18, CY - 10.4],
    [CX - 18, CY + 10.4],
    [CX, CY + 20.8],
    [CX + 18, CY + 10.4],
    [CX + 36, CY],
    [CX - 36, CY],
    [CX + 18, CY - 31.2],
    [CX - 18, CY + 31.2],
    [CX + 36, CY - 20.8],
    [CX - 36, CY + 20.8],
  ];
  return (
    <>
      <rect className={styles.bgInk} width="86.6" height="100" />
      {workers.map(([x, y], index) => (
        <Cell key={index} cx={x} cy={y} r={9} className={styles.cellFaint} />
      ))}
      <Cell cx={CX} cy={CY} r={12} className={styles.cellField} />
      <Cell
        cx={CX}
        cy={CY}
        r={4.5}
        className={`${styles.cellBg} ${styles.pulse}`}
      />
    </>
  );
}

function CombScene() {
  const rows: ReadonlyArray<readonly [number, number]> = [
    [CY - 26, 5],
    [CY - 13, 6],
    [CY, 5],
    [CY + 13, 6],
    [CY + 26, 5],
  ];
  let index = 0;
  return (
    <>
      <rect className={styles.bgField} width="86.6" height="100" />
      {rows.map(([y, count]) => {
        const startX = CX - ((count - 1) * 15.6) / 2;
        return Array.from({ length: count }, (_, column) => {
          index += 1;
          const filled = index % 3 === 0;
          return (
            <Cell
              key={`${y}-${column}`}
              cx={startX + column * 15.6}
              cy={y}
              r={8}
              className={filled ? `${styles.cellBg} ${styles.wave}` : styles.cellStrokeInk}
              style={filled ? ({ "--d": index } as CSSProperties) : undefined}
            />
          );
        });
      })}
    </>
  );
}

function YieldScene() {
  const pile: ReadonlyArray<readonly [number, number]> = [
    [CX - 26, CY + 24],
    [CX - 8.7, CY + 24],
    [CX + 8.7, CY + 24],
    [CX + 26, CY + 24],
    [CX - 17.3, CY + 39],
    [CX, CY + 39],
    [CX + 17.3, CY + 39],
    [CX - 8.7, CY + 54],
    [CX + 8.7, CY + 54],
  ];
  const frames: ReadonlyArray<readonly [number, number]> = [
    [CX - 17.3, CY - 24],
    [CX + 17.3, CY - 24],
    [CX, CY - 9],
    [CX - 34.6, CY - 9],
    [CX + 34.6, CY - 9],
  ];
  return (
    <>
      <rect className={styles.bgInk} width="86.6" height="100" />
      {frames.map(([x, y], index) => (
        <Cell key={index} cx={x} cy={y} r={9} className={styles.cellStrokeField} />
      ))}
      {pile.map(([x, y], index) => (
        <Cell key={index} cx={x} cy={y} r={9} className={styles.cellBg} />
      ))}
      <Cell
        cx={CX}
        cy={CY - 9}
        r={3.2}
        className={`${styles.cellBg} ${styles.drop}`}
      />
    </>
  );
}

function BuildScene() {
  const placed: ReadonlyArray<readonly [number, number]> = [
    [CX - 17.3, CY + 25],
    [CX + 17.3, CY + 25],
    [CX, CY + 40],
  ];
  const slots: ReadonlyArray<readonly [number, number]> = [
    [CX, CY + 10],
    [CX - 34.6, CY + 10],
    [CX + 34.6, CY + 10],
    [CX - 17.3, CY - 5],
    [CX + 17.3, CY - 5],
  ];
  return (
    <>
      <rect className={styles.bgSurface} width="86.6" height="100" />
      {slots.map(([x, y], index) => (
        <Cell
          key={index}
          cx={x}
          cy={y}
          r={9}
          className={`${styles.cellStrokeInk} ${styles.dash}`}
        />
      ))}
      {placed.map(([x, y], index) => (
        <Cell key={index} cx={x} cy={y} r={9} className={styles.cellInk} />
      ))}
      <Cell
        cx={CX}
        cy={CY - 24}
        r={9}
        className={`${styles.cellBg} ${styles.drop}`}
      />
    </>
  );
}

function OrbitScene() {
  return (
    <>
      <rect className={styles.bgField} width="86.6" height="100" />
      <circle
        cx={CX}
        cy={CY}
        r={30}
        className={`${styles.ringMuted} ${styles.dash}`}
      />
      <circle
        cx={CX}
        cy={CY}
        r={19}
        className={`${styles.ringMuted} ${styles.dash}`}
      />
      <Cell cx={CX} cy={CY} r={11} className={styles.cellInk} />
      <g className={styles.spinSlow}>
        <Cell cx={CX + 30} cy={CY} r={5} className={styles.cellBg} />
      </g>
      <g className={styles.spinReverse}>
        <Cell cx={CX} cy={CY - 19} r={3.4} className={styles.cellMuted} />
      </g>
    </>
  );
}

function DiagramScene() {
  const radii = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const vx = Math.sin(rad) * 26;
    const vy = -Math.cos(rad) * 26;
    return [CX + vx, CY + vy] as const;
  });
  const ticks = Array.from({ length: 9 }, (_, index) => CX - 28 + index * 7);
  return (
    <>
      <rect className={styles.bgField} width="86.6" height="100" />
      <Cell cx={CX} cy={CY} r={30} className={styles.cellStrokeInk} />
      {radii.map(([x, y], index) => (
        <line
          key={index}
          x1={CX}
          y1={CY}
          x2={x}
          y2={y}
          className={styles.lineFaint}
        />
      ))}
      <g className={styles.spinSlow}>
        <line x1={CX} y1={CY} x2={CX} y2={CY - 26} className={styles.lineBg} />
        <Cell cx={CX} cy={CY - 26} r={2.6} className={styles.cellBg} />
      </g>
      <circle cx={CX} cy={CY} r={3} className={styles.cellInk} />
      <line
        x1={CX - 28}
        y1={CY + 38}
        x2={CX + 28}
        y2={CY + 38}
        className={styles.lineInk}
      />
      {ticks.map((x, index) => (
        <line
          key={index}
          x1={x}
          y1={CY + 36}
          x2={x}
          y2={CY + 40}
          className={styles.lineInk}
        />
      ))}
      <Cell cx={CX - 30} cy={CY - 32} r={5} className={styles.cellStrokeInk} />
      <line
        x1={CX - 30}
        y1={CY - 39}
        x2={CX - 30}
        y2={CY - 25}
        className={styles.lineFaint}
      />
      <line
        x1={CX - 37}
        y1={CY - 32}
        x2={CX - 23}
        y2={CY - 32}
        className={styles.lineFaint}
      />
    </>
  );
}

const SCENES: Record<ArtId, () => ReactElement> = {
  agent: AgentScene,
  honeycomb: CombScene,
  yield: YieldScene,
  build: BuildScene,
  orbit: OrbitScene,
  diagram: DiagramScene,
};

export function HexArt({
  id,
  alt,
  className,
}: {
  readonly id: ArtId;
  readonly alt: string;
  readonly className?: string;
}) {
  const Scene = SCENES[id];
  return (
    <svg
      viewBox="0 0 86.6 100"
      role="img"
      aria-label={alt}
      className={`${styles.art} ${className ?? ""}`}
    >
      <Scene />
    </svg>
  );
}
