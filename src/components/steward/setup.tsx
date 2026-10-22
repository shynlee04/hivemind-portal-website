import type { PortalDictionary } from "@/modules/locale-dictionary";
import { HexImage } from "@/components/hex-image";
import styles from "./steward.module.css";

export function StewardSetup({ dict }: { readonly dict: PortalDictionary }) {
  const setup = dict.steward.setup;
  return (
    <section className={styles.setup}>
      <div className="shell">
        <div className={styles.setupLeft}>
          <h2 className={styles.setupHeading} data-reveal>
            {setup.heading}
          </h2>
          <p className={styles.setupBody} data-reveal style={{ "--rd": 1 } as import("react").CSSProperties}>
            {setup.body}
          </p>
          <ul className={styles.setupSteps}>
            {setup.steps.map((step, index) => (
              <li
                key={step.command}
                className={styles.setupStep}
                data-reveal
                style={{ "--rd": index + 2 } as import("react").CSSProperties}
              >
                <span className="hex-bullet" aria-hidden="true" />
                <p>
                  <code>{step.command}</code>
                  <span>{step.what}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.setupRight}>
          <div className={styles.questionCard} data-ui data-reveal>
            <pre className={styles.questionPre}>
              <code>
                <span className={styles.questionTitle}>{setup.card.title}</span>
                {setup.card.options.map((option) => (
                  <span key={option} className={styles.questionOption}>
                    {option}
                  </span>
                ))}
                <span className={styles.questionHint}>{setup.card.hint}</span>
                <span className={styles.questionHealth}>{setup.card.health}</span>
              </code>
            </pre>
          </div>
          <h3 className={styles.needsHeading}>{setup.needsHeading}</h3>
          <ul className={styles.needsList}>
            {setup.needs.map((need) => (
              <li key={need}>
                <span className="hex-bullet" aria-hidden="true" />
                {need}
              </li>
            ))}
          </ul>
          <p className={styles.needsNote}>{setup.needsNote}</p>
          <HexImage
            id="catba"
            alt={dict.common.images.catba.alt}
            className={styles.setupPhoto}
          />
        </div>
      </div>
    </section>
  );
}
