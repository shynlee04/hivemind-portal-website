import type { PortalDictionary } from "@/types/portal";

interface ClosingProps {
  readonly closing: PortalDictionary["home"]["closing"];
  readonly kofiHref: string;
}

export function Closing({ closing, kofiHref }: ClosingProps) {
  return (
    <section className="closing" data-field="navy">
      <h2 className="closing__heading" data-reveal>
        <span className="closing__line">{closing.headingLine1}</span>
        <span className="closing__line">{closing.headingLine2}</span>
      </h2>
      <div className="closing__bottom" data-reveal>
        <p className="closing__body">{closing.body}</p>
        <a
          className="btn btn--accent btn--tall closing__cta"
          href={kofiHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {closing.button}
        </a>
      </div>
    </section>
  );
}
