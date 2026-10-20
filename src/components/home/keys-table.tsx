import type { PluginCommand } from "@/modules/command-console";
import type { PortalDictionary } from "@/types/portal";

interface KeysTableProps {
  readonly keys: PortalDictionary["home"]["keys"];
  readonly commands: ReadonlyArray<PluginCommand>;
}

export function KeysTable({ keys, commands }: KeysTableProps) {
  return (
    <section className="keys" id="keys" data-field="white">
      <h2 className="keys__heading" data-reveal>
        <span className="keys__heading-line keys__heading-line--indent">
          {keys.headingLine1}
        </span>
        <span className="keys__heading-line">{keys.headingLine2}</span>
      </h2>
      <div className="keys__body">
        <div className="keys__card" data-reveal>
          <pre className="tui tui--permission" data-ui>
            <span className="tui__title">{keys.cardTitle}</span>
            <span className="tui__lines">
              <span className="tui__line tui__line--prompt">
                <span className="tui__label">$</span>
                <span className="tui__text">{keys.cardCommand}</span>
              </span>
            </span>
            <span className="tui__options">
              {keys.cardOptions.map((option, index) => (
                <span className="tui__option" key={option}>
                  <span className="tui__option-marker">
                    {index === 0 ? "›" : "\u00A0"}
                  </span>
                  <span className="tui__text">{option}</span>
                </span>
              ))}
            </span>
          </pre>
          <p className="keys__caption">{keys.caption}</p>
        </div>
        <span className="keys__table-name" data-reveal>
          {keys.tableName}
        </span>
        <div className="keys__table-wrap" data-reveal>
          <table className="keys__table">
            <tbody>
              {commands.map((command, index) => {
                const previous = commands[index - 1];
                const firstOfGroup =
                  !previous || previous.group !== command.group;
                const gapBefore = firstOfGroup || command.key === "ctrl+x";
                return (
                  <tr
                    className={gapBefore ? "keys__row keys__row--gap" : "keys__row"}
                    key={`${command.group}-${command.key}`}
                  >
                    <td className="keys__group">
                      {firstOfGroup ? command.groupLabel : ""}
                    </td>
                    <td className="keys__key">
                      <code>{command.key}</code>
                    </td>
                    <td className="keys__what">{command.what}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
