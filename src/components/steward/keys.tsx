import {
  listPluginCommands,
  type PluginCommand,
} from "@/modules/command-console";
import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import { HexArt } from "@/components/hex-art";
import styles from "./steward.module.css";

export function StewardKeys({
  dict,
  locale,
}: {
  readonly dict: PortalDictionary;
  readonly locale: Locale;
}) {
  const keys = dict.steward.keys;
  const commands = listPluginCommands(locale);
  const groups: Array<{ label: string; rows: Array<PluginCommand> }> = [];
  for (const command of commands) {
    const last = groups[groups.length - 1];
    if (last && last.label === command.groupLabel) {
      last.rows.push(command);
    } else {
      groups.push({ label: command.groupLabel, rows: [command] });
    }
  }

  return (
    <section className={styles.keys}>
      <div className="shell">
        <h2 className={styles.keysHeading} data-reveal>
          <span>{keys.line1}</span>
          <span>{keys.line2}</span>
        </h2>
        <p className={styles.keysName}>{keys.tableName}</p>
        <div className={styles.keysTable} data-reveal>
          {groups.map((group) => (
            <div key={group.label} className={styles.keysGroup}>
              <p className={styles.keysGroupLabel}>{group.label}</p>
              {group.rows.map((row) => (
                <div key={row.key} className={styles.keysRow}>
                  <span className={styles.keysKey}>
                    <span className="hex-bullet" aria-hidden="true" />
                    <code>{row.key}</code>
                  </span>
                  <span className={styles.keysWhat}>{row.what}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.keysPhoto} data-reveal>
          <HexArt
            id={keys.image}
            alt={dict.common.images[keys.image].alt}
          />
        </div>
      </div>
    </section>
  );
}
