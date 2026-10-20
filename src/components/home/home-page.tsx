import {
  commandExamples,
  commandPrefill,
  interpretCommand,
  listPluginCommands,
  type CommandAnswer,
} from "@/modules/command-console";
import { PARTNER_URLS } from "@/modules/partner-conversion";
import type { Locale, PortalDictionary } from "@/types/portal";
import { Closing } from "./closing";
import { Hero, type SlotFrame } from "./hero";
import { KeysTable } from "./keys-table";
import { SetupBar } from "./setup-bar";
import { TryCommand } from "./try-command";

interface HomePageProps {
  readonly locale: Locale;
  readonly dictionary: PortalDictionary;
}

function slotFrame(command: string, answer: CommandAnswer): SlotFrame {
  const working =
    answer.lines.find((line) => line.tone === "agent")?.text ?? "";
  return { command, title: answer.title, working };
}

export function HomePage({ locale, dictionary }: HomePageProps) {
  const home = dictionary.home;
  const prefill = commandPrefill(locale);
  const examples = commandExamples(locale);
  const commands = listPluginCommands(locale);

  const slots: readonly [SlotFrame, SlotFrame] = [
    slotFrame("/devin", interpretCommand("/devin fix", locale)),
    slotFrame("/antigravity", interpretCommand("/antigravity fix", locale)),
  ];

  return (
    <>
      <Hero
        accessibleHeadline={home.hero.accessibleHeadline}
        lineOneWord={home.hero.lineOneWord}
        lineTwoWord={home.hero.lineTwoWord}
        support={home.hero.support}
        installCommand={home.hero.installCommand}
        copyLabel={home.hero.copyLabel}
        copiedLabel={home.hero.copiedLabel}
        copyAriaLabel={home.hero.copyAriaLabel}
        slots={slots}
      />
      <TryCommand
        locale={locale}
        prefill={prefill}
        examples={examples}
        heading={home.try.heading}
        inputLabel={home.try.inputLabel}
        examplesLabel={home.try.examplesLabel}
        sideTitle={home.try.sideTitle}
        sideBody={home.try.sideBody}
      />
      <SetupBar setup={home.setup} />
      <KeysTable keys={home.keys} commands={commands} />
      <Closing closing={home.closing} kofiHref={PARTNER_URLS.kofi} />
    </>
  );
}
