import type { PortalDictionary } from "@/modules/locale-dictionary";
import { HexImage } from "@/components/hex-image";
import styles from "./substrate.module.css";

export function SubstrateCommands({
  dict,
}: {
  readonly dict: PortalDictionary;
}) {
  const commands = dict.substrate.commands;
  return (
    <section className={styles.commands}>
      <div className="shell">
        <h2 className={styles.commandsHeading} data-reveal>
          <span>{commands.line1}</span>
          <span>{commands.line2}</span>
        </h2>
        <p className={styles.commandsName}>{commands.tableName}</p>
        <div className={styles.commandsTable} data-reveal>
          {commands.groups.map((group) => (
            <div key={group.label} className={styles.commandsGroup}>
              <p className={styles.commandsGroupLabel}>
                {group.label || " "}
              </p>
              {group.rows.map((row) => (
                <div key={row.key} className={styles.commandsRow}>
                  <span className={styles.commandsKey}>
                    <span className="hex-bullet" aria-hidden="true" />
                    <code>{row.key}</code>
                  </span>
                  <span className={styles.commandsWhat}>{row.what}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.commandsPhoto} data-reveal>
          <HexImage
            id={commands.image}
            alt={dict.common.images[commands.image].alt}
          />
        </div>
      </div>
    </section>
  );
}
