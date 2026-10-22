import styles from "./hex-mark.module.css";

const CELL_H = 100;
const CELL_W = CELL_H * 0.866;
const GAP = 3;
const COLS = 14;
const PITCH_X = CELL_W + GAP;
const ROW_2_Y = CELL_H * 0.75 + GAP * 0.866;

const FILLS = ["ink", "field", "surface"] as const;

function hexPoints(cx: number, cy: number): string {
  const w = CELL_W / 2;
  const h = CELL_H / 2;
  return [
    `${cx},${cy - h}`,
    `${cx + w},${cy - h / 2}`,
    `${cx + w},${cy + h / 2}`,
    `${cx},${cy + h}`,
    `${cx - w},${cy + h / 2}`,
    `${cx - w},${cy - h / 2}`,
  ].join(" ");
}

const CELLS: ReadonlyArray<{ readonly points: string; readonly fill: string }> =
  Array.from({ length: COLS * 2 }, (_, index) => {
    const row = index >= COLS ? 1 : 0;
    const col = index % COLS;
    const cx =
      CELL_W / 2 + GAP / 2 + col * PITCH_X + (row === 1 ? PITCH_X / 2 : 0);
    const cy = CELL_H / 2 + GAP / 2 + (row === 1 ? ROW_2_Y : 0);
    return { points: hexPoints(cx, cy), fill: FILLS[(col + row) % 3]! };
  });

const VIEW_W = COLS * PITCH_X + GAP;
const VIEW_H = CELL_H + ROW_2_Y + GAP;

export function HexMark() {
  return (
    <svg
      className={styles.mark}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {CELLS.map((cell, index) => (
        <polygon key={index} points={cell.points} data-fill={cell.fill} />
      ))}
    </svg>
  );
}
