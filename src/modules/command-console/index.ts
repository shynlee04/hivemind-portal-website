import { LocaleSchema, type Locale } from "@/modules/locale-dictionary";
import { CONSOLE_COPY, type ConsoleCopy, type ConsoleKeyId } from "./answers";

export type Harness = "devin" | "antigravity" | "freebuff";
export type TuiTone = "prompt" | "agent" | "tool" | "plan" | "muted" | "ok";

export interface TuiLine {
  readonly tone: TuiTone;
  readonly label: string;
  readonly text: string;
}

interface AnswerBase {
  readonly title: string;
  readonly summary: string;
  readonly lines: ReadonlyArray<TuiLine>;
}

export type CommandAnswer =
  | (AnswerBase & { readonly kind: "hosted-picker"; readonly harness: Harness })
  | (AnswerBase & {
    readonly kind: "hosted-task";
    readonly harness: Harness;
    readonly task: string;
  })
  | (AnswerBase & { readonly kind: "delegate"; readonly harness: Harness })
  | (AnswerBase & { readonly kind: "setup" })
  | (AnswerBase & { readonly kind: "setup-health" })
  | (AnswerBase & { readonly kind: "key"; readonly key: string })
  | (AnswerBase & { readonly kind: "unknown" });

export type CommandGroup = "open" | "session" | "agent";

export interface PluginCommand {
  readonly group: CommandGroup;
  readonly groupLabel: string;
  readonly key: string;
  readonly what: string;
}

const HARNESS_NAMES: Record<Harness, string> = {
  devin: "Devin",
  antigravity: "Antigravity",
  freebuff: "Freebuff",
};

const KEY_IDS: ReadonlySet<string> = new Set<ConsoleKeyId>([
  "ctrl+o",
  "ctrl+m",
  "ctrl+e",
  "ctrl+t",
  "ctrl+x",
  "esc",
  "devin-children",
  "hivemind-doctor",
]);

const KEY_ALIASES: Record<string, ConsoleKeyId> = {
  "ctrl-o": "ctrl+o",
  "ctrl-m": "ctrl+m",
  "ctrl-e": "ctrl+e",
  "ctrl-t": "ctrl+t",
  "ctrl-x": "ctrl+x",
  escape: "esc",
};

function copyFor(locale: Locale): ConsoleCopy {
  return CONSOLE_COPY[LocaleSchema.parse(locale)];
}

function pickerAnswer(
  copy: ConsoleCopy,
  harness: Harness,
): CommandAnswer {
  const picker = copy.pickers[harness];
  return {
    kind: "hosted-picker",
    harness,
    title: picker.title,
    summary: picker.summary,
    lines: [
      { tone: "muted", label: "", text: copy.pickerNewSession },
      { tone: "agent", label: "", text: picker.sessions[0] },
      { tone: "agent", label: "", text: picker.sessions[1] },
    ],
  };
}

function hostedTaskAnswer(
  copy: ConsoleCopy,
  harness: Harness,
  task: string,
): CommandAnswer {
  return {
    kind: "hosted-task",
    harness,
    task,
    title: `${HARNESS_NAMES[harness]}${copy.hostedTask.titleSuffix}`,
    summary: copy.hostedTask.summary,
    lines: [
      { tone: "prompt", label: copy.hostedTask.promptLabel, text: task },
      {
        tone: "plan",
        label: copy.hostedTask.planLabel,
        text: copy.hostedTask.planText,
      },
      {
        tone: "tool",
        label: copy.hostedTask.toolLabel,
        text: copy.hostedTask.toolText,
      },
      {
        tone: "agent",
        label: HARNESS_NAMES[harness],
        text: copy.hostedTask.workingText,
      },
      { tone: "muted", label: "", text: copy.hostedTask.hintText },
    ],
  };
}

function delegateAnswer(
  copy: ConsoleCopy,
  harness: Harness,
): CommandAnswer {
  const freebuff = copy.delegateFreebuff;
  return {
    kind: "delegate",
    harness,
    title: `${copy.delegate.titlePrefix}${HARNESS_NAMES[harness]}`,
    summary: harness === "freebuff" ? freebuff.summary : copy.delegate.summary,
    lines: [
      {
        tone: "tool",
        label: copy.delegate.agentLabel,
        text: `hivemind-delegate → ${HARNESS_NAMES[harness]}`,
      },
      {
        tone: "muted",
        label: copy.delegate.childLabel,
        text: harness === "freebuff" ? freebuff.childText : copy.delegate.childText,
      },
      {
        tone: "ok",
        label: copy.delegate.resultLabel,
        text:
          harness === "freebuff"
            ? freebuff.resultText
            : copy.delegate.resultText,
      },
    ],
  };
}

function setupAnswer(copy: ConsoleCopy): CommandAnswer {
  return {
    kind: "setup",
    title: copy.setup.title,
    summary: copy.setup.summary,
    lines: [
      {
        tone: "agent",
        label: copy.setup.questionLabel,
        text: copy.setup.questionText,
      },
      { tone: "muted", label: "", text: copy.setup.optionsText },
      {
        tone: "ok",
        label: copy.setup.savedLabel,
        text: copy.setup.savedText,
      },
    ],
  };
}

function setupHealthAnswer(copy: ConsoleCopy): CommandAnswer {
  const health = copy.setupHealth;
  return {
    kind: "setup-health",
    title: health.title,
    summary: health.summary,
    lines: [
      { tone: "agent", label: health.agentLabel, text: health.agentText },
      { tone: "muted", label: "", text: health.statusText },
      { tone: "ok", label: health.nextLabel, text: health.nextText },
    ],
  };
}

function keyAnswer(copy: ConsoleCopy, key: string): CommandAnswer {
  const summary = copy.keySummaries[key as ConsoleKeyId] ?? "";
  return {
    kind: "key",
    key,
    title: key,
    summary,
    lines: [{ tone: "tool", label: copy.keyLabel, text: summary }],
  };
}

export function interpretCommand(input: string, locale: Locale): CommandAnswer {
  const copy = copyFor(locale);
  const trimmed = input.trim();

  if (trimmed === "") {
    return {
      kind: "unknown",
      title: copy.emptyTitle,
      summary: copy.unknown.summary,
      lines: [],
    };
  }

  const firstSpace = trimmed.search(/\s/);
  const token = (
    firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace)
  ).toLowerCase();
  const rest = firstSpace === -1 ? "" : trimmed.slice(firstSpace + 1).trim();

  if (
    token === "/devin" ||
    token === "/antigravity" ||
    token === "/freebuff"
  ) {
    const harness = token.slice(1) as Harness;
    return rest === ""
      ? pickerAnswer(copy, harness)
      : hostedTaskAnswer(copy, harness, rest);
  }
  if (token === "/hivemind-setup") {
    return /^health$/i.test(rest) ? setupHealthAnswer(copy) : setupAnswer(copy);
  }
  if (token === "hivemind-delegate" || token === "delegate") {
    if (/freebuff/i.test(rest)) return delegateAnswer(copy, "freebuff");
    return delegateAnswer(
      copy,
      /antigravity/i.test(rest) ? "antigravity" : "devin",
    );
  }
  if (token === "delegate-devin" || token === "/devin_delegate") {
    return delegateAnswer(copy, "devin");
  }

  const aliased = KEY_ALIASES[token];
  const canonical = aliased ?? token;
  if (KEY_IDS.has(canonical)) {
    return keyAnswer(copy, canonical);
  }
  if (trimmed.startsWith("@")) {
    return keyAnswer(copy, "@");
  }
  if (trimmed === "/") {
    return keyAnswer(copy, "/");
  }

  return {
    kind: "unknown",
    title: copy.unknown.title,
    summary: copy.unknown.summary,
    lines: [{ tone: "muted", label: "", text: trimmed }],
  };
}

export function listPluginCommands(
  locale: Locale,
): ReadonlyArray<PluginCommand> {
  const copy = copyFor(locale);
  return copy.commands.map((command) => ({
    group: command.group,
    groupLabel: copy.groupLabels[command.group],
    key: command.key,
    what: command.what,
  }));
}

export function commandExamples(locale: Locale): ReadonlyArray<string> {
  return copyFor(locale).examples;
}

export function commandPrefill(locale: Locale): string {
  return copyFor(locale).prefill;
}
