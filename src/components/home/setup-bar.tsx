import type { PortalDictionary } from "@/types/portal";

interface SetupBarProps {
  readonly setup: PortalDictionary["home"]["setup"];
}

const STAGE_GROWS = [12, 12, 18, 58] as const;

export function SetupBar({ setup }: SetupBarProps) {
  return (
    <section className="setup" id="setup" data-field="navy">
      <h2 className="setup__heading" data-reveal>
        {setup.heading}
      </h2>
      <div className="setup__stages" data-ui data-reveal>
        {setup.stages.map((stage, index) => (
          <div
            className="setup__stage"
            data-ui
            style={{ "--stage-grow": STAGE_GROWS[index] ?? 1 } as React.CSSProperties}
            key={`${index}-${stage.duration}`}
          >
            <div className="setup__seg">
              <span className="setup__duration">{stage.duration}</span>
            </div>
            <p className="setup__clause">{stage.clause}</p>
          </div>
        ))}
      </div>
      <p className="setup__requirement" data-reveal>
        {setup.requirement}
      </p>
    </section>
  );
}
