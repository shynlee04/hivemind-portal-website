export type TuiTone = "prompt" | "agent" | "tool" | "plan" | "muted" | "ok";

export interface TuiLine {
  readonly tone: TuiTone;
  readonly label: string;
  readonly text: string;
}

export function TuiFragment({
  lines,
  caption,
  className,
}: {
  readonly lines: ReadonlyArray<TuiLine>;
  readonly caption?: string;
  readonly className?: string;
}) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <pre className="tui" data-ui>
        {lines.map((line, index) => (
          <div
            key={index}
            className={`tui__line tui__line--${line.tone}`}
          >
            <span className="tui__label">{line.label}</span>
            <span className="tui__text">{line.text}</span>
          </div>
        ))}
      </pre>
      {caption === undefined ? null : (
        <figcaption className="tui__caption">{caption}</figcaption>
      )}
    </figure>
  );
}
