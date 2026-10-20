import { describe, expect, test } from "bun:test";
import {
  commandExamples,
  commandPrefill,
  interpretCommand,
  listPluginCommands,
} from "@/modules/command-console";

describe("CommandConsoleModule seam", () => {
  test("interpretCommand maps hosted commands, delegation, keys, and unknowns", () => {
    const pickerDevin = interpretCommand("/devin", "en");
    expect(pickerDevin.kind).toBe("hosted-picker");
    if (pickerDevin.kind === "hosted-picker") {
      expect(pickerDevin.harness).toBe("devin");
    }

    const pickerAgy = interpretCommand("/Antigravity", "en");
    expect(pickerAgy.kind).toBe("hosted-picker");
    if (pickerAgy.kind === "hosted-picker") {
      expect(pickerAgy.harness).toBe("antigravity");
    }

    const task = interpretCommand("/devin fix X", "en");
    expect(task.kind).toBe("hosted-task");
    if (task.kind === "hosted-task") {
      expect(task.harness).toBe("devin");
      expect(task.task).toBe("fix X");
    }

    const delegateAgy = interpretCommand(
      "hivemind-delegate review antigravity code",
      "en",
    );
    expect(delegateAgy.kind).toBe("delegate");
    if (delegateAgy.kind === "delegate") {
      expect(delegateAgy.harness).toBe("antigravity");
    }

    const delegateDevin = interpretCommand("delegate-devin x", "en");
    expect(delegateDevin.kind).toBe("delegate");
    if (delegateDevin.kind === "delegate") {
      expect(delegateDevin.harness).toBe("devin");
    }

    expect(interpretCommand("/hivemind-setup", "en").kind).toBe("setup");

    for (const input of ["CTRL+O", "ctrl-o"]) {
      const answer = interpretCommand(input, "en");
      expect(answer.kind).toBe("key");
      if (answer.kind === "key") {
        expect(answer.key).toBe("ctrl+o");
      }
    }

    const mention = interpretCommand("@src/a.ts", "en");
    expect(mention.kind).toBe("key");
    if (mention.kind === "key") {
      expect(mention.key).toBe("@");
    }

    const slash = interpretCommand("/", "en");
    expect(slash.kind).toBe("key");
    if (slash.kind === "key") {
      expect(slash.key).toBe("/");
    }

    const empty = interpretCommand("", "en");
    expect(empty.kind).toBe("unknown");
    expect(empty.title).toBe("Type a command");
    expect(empty.lines).toHaveLength(0);

    const bogus = interpretCommand("rm -rf", "en");
    expect(bogus.kind).toBe("unknown");
    expect(bogus.title).toBe("Not a plugin command");
  });

  test("interpretCommand returns vi titles and preserves the input in unknown lines", () => {
    const viTask = interpretCommand("/devin sửa test", "vi");
    expect(viTask.title).toBe("Devin · phiên mới");

    const viUnknown = interpretCommand("rm -rf", "vi");
    expect(viUnknown.title).toBe("Không phải lệnh của plugin");
    expect(viUnknown.lines[0]?.text).toBe("rm -rf");
  });

  test("listPluginCommands returns all 14 commands with matching keys across locales", () => {
    const enCommands = listPluginCommands("en");
    const viCommands = listPluginCommands("vi");

    expect(enCommands).toHaveLength(14);
    expect(viCommands).toHaveLength(14);
    expect(enCommands.map((c) => c.key)).toEqual(viCommands.map((c) => c.key));
    expect(enCommands.map((c) => c.group)).toEqual(
      viCommands.map((c) => c.group),
    );
    expect(enCommands[0]?.groupLabel).toBe("Open");
    expect(viCommands[0]?.groupLabel).toBe("Mở");
  });

  test("commandExamples and commandPrefill match the product commands", () => {
    expect(commandExamples("en")).toEqual([
      "/antigravity",
      "hivemind-delegate review src/retry.ts",
      "/hivemind-setup",
      "ctrl+o",
    ]);
    expect(commandExamples("vi")).toEqual(commandExamples("en"));
    expect(commandPrefill("en")).toBe("/devin fix the flaky retry test");
    expect(commandPrefill("vi")).toBe("/devin sửa test retry chập chờn");
  });
});
