import { LocaleSchema, type Locale } from "@/modules/locale-dictionary";

export type TraceBranch =
  | "source"
  | "test"
  | "actors"
  | "evidence"
  | "pre-existing";

export type TraceHandle = `${string}:${TraceBranch}`;

export interface PackageRow {
  readonly branch: TraceBranch;
  readonly handle: TraceHandle;
  readonly label: string;
  readonly count: number;
  readonly summary: string;
}

export interface ChangePackage {
  readonly id: string;
  readonly signal: string;
  readonly call: string;
  readonly rows: ReadonlyArray<PackageRow>;
}

export type DiffLine = { readonly op: "+" | "-" | " " | "@"; readonly text: string };

export interface DiffFile {
  readonly path: string;
  readonly sha256: string;
  readonly actor: string;
  readonly lines: ReadonlyArray<DiffLine>;
}

export type TraceLeaf =
  | {
    readonly kind: "diff";
    readonly handle: TraceHandle;
    readonly files: ReadonlyArray<DiffFile>;
  }
  | {
    readonly kind: "actors";
    readonly handle: TraceHandle;
    readonly actors: ReadonlyArray<{
      readonly session: string;
      readonly harness: "devin" | "antigravity" | "opencode";
      readonly touched: ReadonlyArray<string>;
      readonly checks: ReadonlyArray<{
        readonly name: string;
        readonly result: "pass" | "fail";
      }>;
      readonly conclusion: string;
    }>;
  }
  | {
    readonly kind: "evidence";
    readonly handle: TraceHandle;
    readonly checks: ReadonlyArray<{
      readonly name: string;
      readonly state: "current" | "stale";
      readonly reason: string;
    }>;
  }
  | { readonly kind: "not-found"; readonly handle: string };

const CHANGE_ID = "c7f2";
const ACTOR = "ses_7Kq2 · antigravity";

const LOCALES = {
  en: {
    labels: {
      source: "source",
      test: "test",
      actors: "actors",
      evidence: "evidence",
      "pre-existing": "pre-existing",
    },
    summaries: {
      source: "src/retry.ts, src/queue.ts",
      test: "Regression test in test/retry.test.ts",
      actors: "ses_7Kq2 · antigravity · bun test pass",
      evidence: "bun test stale · typecheck current",
      "pre-existing": "README.md, already on disk",
    },
    actorConclusion:
      "Reset the timer between attempts and added a regression test.",
    evidenceStaleReason: "Ran at step 14; src/retry.ts edited at step 17",
    evidenceCurrentReason: "Ran after the last edit",
    preExistingActor: "before this session",
  },
  vi: {
    labels: {
      source: "nguồn",
      test: "test",
      actors: "tác nhân",
      evidence: "bằng chứng",
      "pre-existing": "có sẵn",
    },
    summaries: {
      source: "src/retry.ts, src/queue.ts",
      test: "Test hồi quy trong test/retry.test.ts",
      actors: "ses_7Kq2 · antigravity · bun test đạt",
      evidence: "bun test đã cũ · typecheck còn mới",
      "pre-existing": "README.md, đã có sẵn trên đĩa",
    },
    actorConclusion:
      "Reset bộ hẹn giờ giữa các lần thử và thêm test hồi quy.",
    evidenceStaleReason: "Chạy ở bước 14; src/retry.ts sửa ở bước 17",
    evidenceCurrentReason: "Chạy sau lần sửa cuối",
    preExistingActor: "trước phiên này",
  },
} as const;

function handle(branch: TraceBranch): TraceHandle {
  return `${CHANGE_ID}:${branch}`;
}

export function exampleChangePackage(locale: Locale): ChangePackage {
  const text = LOCALES[LocaleSchema.parse(locale)];
  return {
    id: CHANGE_ID,
    signal: "[substrate] dirty c7f2 · 3 files",
    call: `trace({ change: "${CHANGE_ID}" })`,
    rows: [
      {
        branch: "source",
        handle: handle("source"),
        label: text.labels.source,
        count: 2,
        summary: text.summaries.source,
      },
      {
        branch: "test",
        handle: handle("test"),
        label: text.labels.test,
        count: 1,
        summary: text.summaries.test,
      },
      {
        branch: "actors",
        handle: handle("actors"),
        label: text.labels.actors,
        count: 1,
        summary: text.summaries.actors,
      },
      {
        branch: "evidence",
        handle: handle("evidence"),
        label: text.labels.evidence,
        count: 2,
        summary: text.summaries.evidence,
      },
      {
        branch: "pre-existing",
        handle: handle("pre-existing"),
        label: text.labels["pre-existing"],
        count: 1,
        summary: text.summaries["pre-existing"],
      },
    ],
  };
}

export function openLeaf(rawHandle: string, locale: Locale): TraceLeaf {
  const text = LOCALES[LocaleSchema.parse(locale)];
  const [id, branch] = rawHandle.split(":");

  if (id !== CHANGE_ID) {
    return { kind: "not-found", handle: rawHandle };
  }

  switch (branch) {
    case "source":
      return {
        kind: "diff",
        handle: handle("source"),
        files: [
          {
            path: "src/retry.ts",
            sha256: "4e1f…a09c",
            actor: ACTOR,
            lines: [
              { op: "@", text: "@@ -12,6 +12,7 @@" },
              { op: " ", text: "  for (let attempt = 0; attempt < max; attempt++) {" },
              { op: "+", text: "    timer.reset();" },
              { op: " ", text: "    try {" },
              { op: " ", text: "      return await run(task);" },
            ],
          },
          {
            path: "src/queue.ts",
            sha256: "b7c2…d41e",
            actor: ACTOR,
            lines: [
              { op: "@", text: "@@ -4,7 +4,7 @@" },
              { op: "-", text: "  const delay = step * 100;" },
              { op: "+", text: "  const delay = timer.remaining(step);" },
            ],
          },
        ],
      };
    case "test":
      return {
        kind: "diff",
        handle: handle("test"),
        files: [
          {
            path: "test/retry.test.ts",
            sha256: "9f3a…55c0",
            actor: ACTOR,
            lines: [
              { op: "@", text: "@@ -31,2 +31,9 @@" },
              { op: "+", text: '  test("resets the timer between attempts", () => {' },
              { op: "+", text: "    const timer = new FakeTimer();" },
              { op: "+", text: "    retry(task, { timer });" },
              { op: "+", text: "    expect(timer.resetCalls).toBe(2);" },
              { op: "+", text: "  });" },
            ],
          },
        ],
      };
    case "actors":
      return {
        kind: "actors",
        handle: handle("actors"),
        actors: [
          {
            session: "ses_7Kq2",
            harness: "antigravity",
            touched: ["src/retry.ts", "test/retry.test.ts"],
            checks: [{ name: "bun test", result: "pass" }],
            conclusion: text.actorConclusion,
          },
        ],
      };
    case "evidence":
      return {
        kind: "evidence",
        handle: handle("evidence"),
        checks: [
          {
            name: "bun test",
            state: "stale",
            reason: text.evidenceStaleReason,
          },
          {
            name: "typecheck",
            state: "current",
            reason: text.evidenceCurrentReason,
          },
        ],
      };
    case "pre-existing":
      return {
        kind: "diff",
        handle: handle("pre-existing"),
        files: [
          {
            path: "README.md",
            sha256: "77aa…09f2",
            actor: text.preExistingActor,
            lines: [
              { op: "@", text: "@@ -1,4 +1,5 @@" },
              { op: " ", text: " # app" },
              { op: "+", text: " See docs/ for the retry policy." },
            ],
          },
        ],
      };
    default:
      return { kind: "not-found", handle: rawHandle };
  }
}
