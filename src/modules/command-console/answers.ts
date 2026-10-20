import type { Locale } from "@/types/portal";

export type ConsoleKeyId =
  | "ctrl+o"
  | "ctrl+m"
  | "ctrl+e"
  | "ctrl+t"
  | "ctrl+x"
  | "esc"
  | "@"
  | "/"
  | "devin-children"
  | "hivemind-doctor";

export interface ConsoleCopy {
  readonly groupLabels: {
    readonly open: string;
    readonly session: string;
    readonly agent: string;
  };
  readonly commands: ReadonlyArray<{
    readonly group: "open" | "session" | "agent";
    readonly key: string;
    readonly what: string;
  }>;
  readonly examples: ReadonlyArray<string>;
  readonly prefill: string;
  readonly pickerNewSession: string;
  readonly pickers: {
    readonly devin: {
      readonly title: string;
      readonly summary: string;
      readonly sessions: readonly [string, string];
    };
    readonly antigravity: {
      readonly title: string;
      readonly summary: string;
      readonly sessions: readonly [string, string];
    };
  };
  readonly hostedTask: {
    readonly titleSuffix: string;
    readonly summary: string;
    readonly promptLabel: string;
    readonly planLabel: string;
    readonly planText: string;
    readonly toolLabel: string;
    readonly toolText: string;
    readonly workingText: string;
    readonly hintText: string;
  };
  readonly delegate: {
    readonly titlePrefix: string;
    readonly summary: string;
    readonly agentLabel: string;
    readonly childLabel: string;
    readonly childText: string;
    readonly resultLabel: string;
    readonly resultText: string;
  };
  readonly setup: {
    readonly title: string;
    readonly summary: string;
    readonly questionLabel: string;
    readonly questionText: string;
    readonly optionsText: string;
    readonly savedLabel: string;
    readonly savedText: string;
  };
  readonly keyLabel: string;
  readonly keySummaries: Record<ConsoleKeyId, string>;
  readonly unknown: { readonly title: string; readonly summary: string };
  readonly emptyTitle: string;
}

export const CONSOLE_COPY: Record<Locale, ConsoleCopy> = {
  en: {
    groupLabels: {
      open: "Open",
      session: "In a session",
      agent: "Agent tools",
    },
    commands: [
      { group: "open", key: "/devin", what: "Open a Devin session" },
      {
        group: "open",
        key: "/antigravity",
        what: "Open an Antigravity session",
      },
      {
        group: "open",
        key: "/devin <task>",
        what: "New session with the task sent",
      },
      { group: "open", key: "/hivemind-setup", what: "Save your setup once" },
      { group: "session", key: "ctrl+o", what: "Switch session" },
      { group: "session", key: "ctrl+m", what: "Pick model" },
      { group: "session", key: "ctrl+e", what: "Pick session mode" },
      {
        group: "session",
        key: "ctrl+t",
        what: "Pick thinking level (Devin)",
      },
      {
        group: "session",
        key: "ctrl+x",
        what: "Cancel the running prompt",
      },
      {
        group: "session",
        key: "esc",
        what: "Back home, session keeps running",
      },
      { group: "session", key: "@", what: "Mention a file" },
      { group: "session", key: "/", what: "The agent's own commands" },
      {
        group: "agent",
        key: "hivemind-delegate",
        what: "Hand a task to Devin or Antigravity",
      },
      { group: "agent", key: "devin-children", what: "List child sessions" },
    ],
    examples: [
      "/antigravity",
      "hivemind-delegate review src/retry.ts",
      "/hivemind-setup",
      "ctrl+o",
    ],
    prefill: "/devin fix the flaky retry test",
    pickerNewSession: "+ New session",
    pickers: {
      devin: {
        title: "Devin · sessions",
        summary:
          "Lists every session on your Devin account, including ones started in Devin Desktop or the CLI. Pick one to continue with its full history, or start a new one.",
        sessions: [
          "Fix flaky retry test   ~/app   2h ago",
          "Refactor auth middleware   ~/api   yesterday   in use",
        ],
      },
      antigravity: {
        title: "Antigravity · sessions",
        summary:
          "Lists the sessions Antigravity keeps under its launch GEMINI_HOME. Pick one to continue, or start a new one.",
        sessions: [
          "Draft the release notes   ~/app   1h ago",
          "Audit the build script   ~/web   Monday",
        ],
      },
    },
    hostedTask: {
      titleSuffix: " · new session",
      summary:
        "Opens a new session and sends your task. Replies, thoughts, tool calls and plans stream in as they happen.",
      promptLabel: "you",
      planLabel: "plan",
      planText: "Reproduce, fix, run the tests",
      toolLabel: "tool",
      toolText: "read src/retry.ts",
      workingText: "Working on it…",
      hintText: "ctrl+x cancel   esc home   ctrl+o sessions",
    },
    delegate: {
      titlePrefix: "Delegated to ",
      summary:
        "Your agent hands the task to Devin or Antigravity in a real OpenCode child session. In the foreground it waits for the result; in the background the result reaches your agent when it's done.",
      agentLabel: "agent",
      childLabel: "child",
      childText: "ses_4f9c… running",
      resultLabel: "result",
      resultText: "Delivered to your agent",
    },
    setup: {
      title: "/hivemind-setup",
      summary:
        "Your agent asks a few questions with OpenCode's question tool, saves the answers, and doesn't ask again until something changes.",
      questionLabel: "agent",
      questionText: "Which harness should take delegated work?",
      optionsText: "Devin   Antigravity   Ask each time",
      savedLabel: "saved",
      savedText: "config/delegate",
    },
    keyLabel: "key",
    keySummaries: {
      "ctrl+o":
        "Reopens the session picker over a live session. A busy session waits until it's done.",
      "ctrl+m": "Pick the model.",
      "ctrl+e": "Pick the session mode.",
      "ctrl+t": "Pick the thinking level (Devin).",
      "ctrl+x": "Cancels the prompt that's running.",
      esc: "Back to home. The session keeps running and comes back intact.",
      "@": "Type @ for file completion. @path becomes a file the agent reads.",
      "/": "Inside a session, / lists that agent's own slash commands.",
      "devin-children": "Lists your session's child sessions.",
      "hivemind-doctor":
        "Checks a harness. Install and sign-in happen only after you approve.",
    },
    unknown: {
      title: "Not a plugin command",
      summary: "Try /devin, /antigravity or hivemind-delegate.",
    },
    emptyTitle: "Type a command",
  },
  vi: {
    groupLabels: {
      open: "Mở",
      session: "Trong phiên",
      agent: "Công cụ của agent",
    },
    commands: [
      { group: "open", key: "/devin", what: "Mở phiên Devin" },
      {
        group: "open",
        key: "/antigravity",
        what: "Mở phiên Antigravity",
      },
      {
        group: "open",
        key: "/devin <task>",
        what: "Phiên mới, gửi luôn tác vụ",
      },
      { group: "open", key: "/hivemind-setup", what: "Lưu thiết lập một lần" },
      { group: "session", key: "ctrl+o", what: "Đổi phiên" },
      { group: "session", key: "ctrl+m", what: "Chọn model" },
      { group: "session", key: "ctrl+e", what: "Chọn chế độ phiên" },
      {
        group: "session",
        key: "ctrl+t",
        what: "Chọn mức suy nghĩ (Devin)",
      },
      { group: "session", key: "ctrl+x", what: "Huỷ lệnh đang chạy" },
      {
        group: "session",
        key: "esc",
        what: "Về màn chính, phiên vẫn chạy",
      },
      { group: "session", key: "@", what: "Nhắc tới một file" },
      { group: "session", key: "/", what: "Lệnh riêng của agent" },
      {
        group: "agent",
        key: "hivemind-delegate",
        what: "Giao việc cho Devin hoặc Antigravity",
      },
      { group: "agent", key: "devin-children", what: "Xem các phiên con" },
    ],
    examples: [
      "/antigravity",
      "hivemind-delegate review src/retry.ts",
      "/hivemind-setup",
      "ctrl+o",
    ],
    prefill: "/devin sửa test retry chập chờn",
    pickerNewSession: "+ Phiên mới",
    pickers: {
      devin: {
        title: "Devin · phiên",
        summary:
          "Liệt kê mọi phiên trên tài khoản Devin của bạn, kể cả phiên mở từ Devin Desktop hay CLI. Chọn một phiên để làm tiếp với đầy đủ lịch sử, hoặc mở phiên mới.",
        sessions: [
          "Sửa test retry   ~/app   2 giờ trước",
          "Tách middleware auth   ~/api   hôm qua   đang dùng",
        ],
      },
      antigravity: {
        title: "Antigravity · phiên",
        summary:
          "Liệt kê các phiên Antigravity lưu trong GEMINI_HOME lúc khởi chạy. Chọn một phiên để làm tiếp, hoặc mở phiên mới.",
        sessions: [
          "Viết release notes   ~/app   1 giờ trước",
          "Rà script build   ~/web   thứ Hai",
        ],
      },
    },
    hostedTask: {
      titleSuffix: " · phiên mới",
      summary:
        "Mở phiên mới và gửi luôn tác vụ. Câu trả lời, suy nghĩ, lệnh gọi công cụ và kế hoạch hiện ra ngay khi agent làm.",
      promptLabel: "bạn",
      planLabel: "kế hoạch",
      planText: "Tái hiện lỗi, sửa, chạy test",
      toolLabel: "công cụ",
      toolText: "read src/retry.ts",
      workingText: "Đang làm…",
      hintText: "ctrl+x huỷ   esc về   ctrl+o đổi phiên",
    },
    delegate: {
      titlePrefix: "Đã giao cho ",
      summary:
        "Agent giao tác vụ cho Devin hoặc Antigravity trong một phiên con OpenCode thật. Chạy tiền cảnh thì chờ kết quả; chạy nền thì kết quả tự về agent khi xong.",
      agentLabel: "agent",
      childLabel: "phiên con",
      childText: "ses_4f9c… đang chạy",
      resultLabel: "kết quả",
      resultText: "Đã gửi về agent của bạn",
    },
    setup: {
      title: "/hivemind-setup",
      summary:
        "Agent hỏi bạn vài câu bằng công cụ question của OpenCode, lưu câu trả lời, và không hỏi lại cho tới khi có gì thay đổi.",
      questionLabel: "agent",
      questionText: "Giao việc cho harness nào?",
      optionsText: "Devin   Antigravity   Hỏi mỗi lần",
      savedLabel: "đã lưu",
      savedText: "config/delegate",
    },
    keyLabel: "phím",
    keySummaries: {
      "ctrl+o":
        "Mở lại danh sách phiên ngay trong phiên đang chạy. Phiên đang bận sẽ chờ làm xong.",
      "ctrl+m": "Chọn model.",
      "ctrl+e": "Chọn chế độ phiên.",
      "ctrl+t": "Chọn mức suy nghĩ (Devin).",
      "ctrl+x": "Huỷ lệnh đang chạy.",
      esc: "Về màn hình chính. Phiên vẫn chạy nền và quay lại nguyên vẹn.",
      "@": "Gõ @ để gợi ý file. @đường-dẫn thành file agent đọc được.",
      "/": "Trong phiên, / liệt kê các lệnh riêng của agent đó.",
      "devin-children": "Liệt kê các phiên con của phiên hiện tại.",
      "hivemind-doctor":
        "Kiểm tra một harness. Chỉ cài hoặc đăng nhập khi bạn đồng ý.",
    },
    unknown: {
      title: "Không phải lệnh của plugin",
      summary: "Thử /devin, /antigravity hoặc hivemind-delegate.",
    },
    emptyTitle: "Gõ một lệnh",
  },
};
