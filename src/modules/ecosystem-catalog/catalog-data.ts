import type {
  GreenfieldWalkthroughView,
  HorizonSummaryView,
  HorizonTier,
  Locale,
  PluginGroup,
  ReactorNodeId,
  ShowcaseCardView,
  ShowcaseId,
  ThreeLayerXRay,
} from "@/types/portal";

interface LocalizedText {
  readonly en: string;
  readonly vi: string;
}

interface RawShowcaseRecord {
  readonly id: ShowcaseId;
  readonly plugin: PluginGroup;
  readonly horizon: HorizonTier;
  readonly harnessNode: ReactorNodeId;
  readonly durationLabel: string;
  readonly sourceGrounding: string;
  readonly highlightsFreebuffReferral: boolean;
  readonly title: LocalizedText;
  readonly subtitle: LocalizedText;
  readonly summary: LocalizedText;
  readonly xray: {
    readonly humanPrompt: string;
    readonly orchestratorTool: string;
    readonly engineExecution: string;
  };
  readonly proNotBroLesson: LocalizedText;
}

export const HORIZON_BADGES: Record<HorizonTier, LocalizedText> = {
  shipped: {
    en: "SHIPPED NOW · v0.1",
    vi: "ĐÃ PHÁT HÀNH · v0.1",
  },
  "next-release": {
    en: "NEXT RELEASE · v0.2",
    vi: "BẢN KẾ TIẾP · v0.2",
  },
  roadmap: {
    en: "ROADMAP LAB · SUBSTRATE",
    vi: "PHÒNG LAB LỘ TRÌNH · SUBSTRATE",
  },
};

export const RAW_SHOWCASES: ReadonlyArray<RawShowcaseRecord> = [
  {
    id: "S1",
    plugin: "steward",
    horizon: "shipped",
    harnessNode: "devin",
    durationLabel: "01:12",
    sourceGrounding: "bin/hivemind-steward-oc-devin.mjs",
    highlightsFreebuffReferral: false,
    title: {
      en: "Zero-Ceremony Installer (npx hmoc-steward-acp)",
      vi: "Trình Cài Đặt Không Rườm Rà (npx hmoc-steward-acp)",
    },
    subtitle: {
      en: "Comment-Preserving JSONC Wiring & Cross-OS Binary Verification",
      vi: "Ghi Cấu Hình JSONC Giữ Nguyên Chú Thích & Kiểm Chứng Binary Đa Hệ Điều Hành",
    },
    summary: {
      en: "Wires hivemind-steward-acp into project or global opencode.json without stripping developer comments, verifying Devin CLI identity and cross-OS path invariants in one pass.",
      vi: "Tự động đấu nối hivemind-steward-acp vào opencode.json cấp dự án hoặc toàn cục mà không làm mất comment của dev, đồng thời xác thực binary Devin CLI trên cả 4 nền tảng OS.",
    },
    xray: {
      humanPrompt: "$ npx hmoc-steward-acp --scope project",
      orchestratorTool:
        "cross-os-platform.mjs: probeExecutable('devin') + patchJsoncPreservingComments('opencode.json')",
      engineExecution:
        "Verified devin acp binary (darwin-arm64, sha256:8f2e...91a4) and appended plugin entry & sentinel provider devin-native without mutating existing JSONC comments.",
    },
    proNotBroLesson: {
      en: "Never nuke a developer's hand-commented opencode.json with JSON.stringify. Parse and patch AST spans at the boundary and fail closed on unknown OS tuples.",
      vi: "Tuyệt đối không dùng JSON.stringify đè mất comment tâm huyết trong opencode.json của anh em. Hãy vá trực tiếp trên span cú pháp và khóa chặt kiểm tra OS ngay tại biên.",
    },
  },
  {
    id: "S2",
    plugin: "steward",
    horizon: "shipped",
    harnessNode: "devin",
    durationLabel: "01:38",
    sourceGrounding: "src/hosted/lane.ts / src/hosted/view.tsx",
    highlightsFreebuffReferral: false,
    title: {
      en: "Live /devin Hosted View in OpenCode TUI",
      vi: "Buồng Lái Hosted View /devin Trực Tiếp Trong OpenCode TUI",
    },
    subtitle: {
      en: "Remount-Safe ACP Stdio Streaming & Tag-Filtered Entry Log",
      vi: "Luồng ACP Stdio Bền Vững Khi Chuyển Khung Hình & Bộ Lọc Nhãn Nhật Ký",
    },
    summary: {
      en: "Mount a live Devin ACP session right inside the OpenCode TUI with a dedicated sidebar, real-time thought/tool Entry Log, and remount-safe sink buffers keyed by (Harness, cwd).",
      vi: "Mở trực tiếp phiên Devin ACP ngay trong giao diện OpenCode TUI với thanh bên chuyên biệt, nhật ký suy luận/tool thời gian thực và bộ đệm chống mất trạng thái khi chuyển tab.",
    },
    xray: {
      humanPrompt: "/devin Audit src/acp.ts for Framing & Backpressure Leaks",
      orchestratorTool:
        'jsonrpc: "2.0", method: "session/prompt", params: { sessionId: "devin_7a91c", prompt: [{ type: "text", text: "Audit src/acp.ts..." }] }',
      engineExecution:
        "subprocess(devin acp) | AcpClient ndjson stream | hostedLaneFor('devin', cwd) | remount-safe sink | Solid TUI frame render.",
    },
    proNotBroLesson: {
      en: "Never bind a subprocess stdio callback directly to a UI component signal. Route events through a headless Lane state machine so TUI tab remounts never drop a frame.",
      vi: "Đừng bao giờ nối thẳng callback stdio của tiến trình con vào signal giao diện. Hãy đi qua cỗ máy trạng thái Lane độc lập để việc ẩn/hiện tab TUI không làm rơi một khung dữ liệu nào.",
    },
  },
  {
    id: "S3",
    plugin: "steward",
    horizon: "shipped",
    harnessNode: "devin",
    durationLabel: "01:46",
    sourceGrounding: "src/delegation/native-delegation.ts / src/delegation/delegate-tool.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "Native Child Delegation (delegate-devin ses_*)",
      vi: "Ủy Quyền Subagent Native (delegate-devin ses_*)",
    },
    subtitle: {
      en: "First-Class OpenCode Child Sessions Bound to Foreign ACP Sessions",
      vi: "Phiên Con OpenCode Chính Quy Liên Kết Chặt Với Phiên Ngoại Lai ACP",
    },
    summary: {
      en: "Spawns an inspectable OpenCode child session (ses_*) backed by a real foreign Devin ACP session, translating foreign tool calls and checkpoints into native OpenCode timeline events.",
      vi: "Khởi tạo phiên con OpenCode chuẩn chỉnh (ses_*) được hậu thuẫn bởi phiên Devin ACP thật, dịch mọi lệnh gọi tool và điểm chốt sang dòng sự kiện bản địa của OpenCode.",
    },
    xray: {
      humanPrompt: "@delegate-devin Implement deterministic Zod boundary parser for showcase queries",
      orchestratorTool:
        'tool: "delegate-devin", args: { prompt: "Implement deterministic Zod boundary parser...", mode: "coding", effort: "high" }',
      engineExecution:
        "host.session.create() | ses_01J9X8A2 | AcpClient.sessionNew(cwd) | foreignSessionId: dev_9921 | native-checkpoint binding persisted.",
    },
    proNotBroLesson: {
      en: "Subagents should not be opaque black-box promises. Bind every foreign ACP session to a native OpenCode ses_* child so the operator can inspect every step in the session tree.",
      vi: "Subagent không được phép là chiếc hộp đen mù mờ. Hãy gắn chặt mỗi phiên ACP ngoại lai vào một phiên con ses_* của OpenCode để người vận hành soi được từng bước trong cây phiên.",
    },
  },
  {
    id: "S4",
    plugin: "steward",
    horizon: "shipped",
    harnessNode: "devin",
    durationLabel: "01:29",
    sourceGrounding: "src/delegation/native-checkpoint.ts / src/delegation/native-delegation.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "Crash Recovery & Idempotent Session Reconcile",
      vi: "Khôi Phục Sau Sự Cố & Đối Soát Phiên Bất Biến",
    },
    subtitle: {
      en: "Zero Orphaned Subprocesses & Deterministic Checkpoint Resume",
      vi: "Không Bỏ Rơi Tiến Trình Con & Khôi Phục Điểm Chốt Định Đạt",
    },
    summary: {
      en: "When a TUI restarts or a connection drops mid-turn, Native Delegation reconciles the persisted checkpoint ledger against foreign session/load state without duplicating work or adopting unowned children.",
      vi: "Khi khởi động lại TUI hoặc đứt kết nối giữa chừng, cơ chế Native Delegation đối soát sổ cái điểm chốt với trạng thái session/load để nối lại đúng mạch mà không chạy lặp hay nhận nhầm phiên.",
    },
    xray: {
      humanPrompt: "/devin:resume ses_01J9X8A2 --reconcile",
      orchestratorTool:
        'reconcileNativeCheckpoint({ childSessionId: "ses_01J9X8A2", foreignSessionId: "dev_9921" }) | jsonrpc: "session/load"',
      engineExecution:
        "Verified ownership stamp, replayed missed ACP notifications from offset #42, and restored child status to READY without re-running completed tool calls.",
    },
    proNotBroLesson: {
      en: "Lifecycle loops must be idempotent. Stamp ownership at creation time and reconcile partial state on recovery instead of spawning duplicate blind retries.",
      vi: "Vòng đời phiên bắt buộc phải có tính bất biến (idempotent). Đóng dấu quyền sở hữu ngay lúc tạo và đối soát trạng thái dở dang khi khôi phục thay vì thử lại mù quáng.",
    },
  },
  {
    id: "S5",
    plugin: "steward",
    horizon: "shipped",
    harnessNode: "devin",
    durationLabel: "01:18",
    sourceGrounding: "src/hosted/lane.ts / src/delegation/native-delegation.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "Interactive ACP Permission Mediation",
      vi: "Duyệt Quyền Thực Thi ACP Tương Tác",
    },
    subtitle: {
      en: "Explicit Operator Gate for Shell, File Write & Network Requests",
      vi: "Cổng Kiểm Duyệt Rõ Ràng Cho Lệnh Shell, Ghi File & Truy Cập Mạng",
    },
    summary: {
      en: "Intercepts foreign session/request_permission RPC frames from Devin ACP and surfaces structured Allow Once, Allow Session, or Reject controls in both Hosted View and Native Delegation.",
      vi: "Chặn bắt các khung yêu cầu quyền session/request_permission từ Devin ACP và hiển thị bảng duyệt Cho Phép 1 Lần, Cho Phép Cả Phiên hoặc Từ Chối ngay trong TUI.",
    },
    xray: {
      humanPrompt: "[Permission Prompt] devin wants to run: bun test test/phase-v1-seams.test.ts [Allow Once]",
      orchestratorTool:
        'jsonrpc: "2.0", id: 19, result: { outcome: { outcome: "selected", optionId: "allow_once" } }',
      engineExecution:
        "Pending permission promise resolved in Lane, ACP response frame flushed over stdio, and foreign tool execution unlocked.",
    },
    proNotBroLesson: {
      en: "Autonomy without explicit permission boundaries is a liability. Mediate every foreign tool capability request through a typed RPC gate before touching the host filesystem.",
      vi: "Tự hành mà thiếu ranh giới cấp quyền rõ ràng là một rủi ro lớn. Hãy kiểm duyệt mọi yêu cầu công cụ từ harness ngoại lai qua cổng RPC định kiểu trước khi chạm vào hệ thống tệp.",
    },
  },
  {
    id: "S6",
    plugin: "steward",
    horizon: "next-release",
    harnessNode: "antigravity",
    durationLabel: "01:24",
    sourceGrounding: "src/hosted/mentions.ts / src/hosted/mention-overlay.tsx",
    highlightsFreebuffReferral: false,
    title: {
      en: "Origin-Labelled / & @ Mentions Autocomplete",
      vi: "Gợi Ý Lệnh / & @ Có Gắn Nhãn Nguồn Gốc",
    },
    subtitle: {
      en: "Unified Command & Resource Overlay Across Devin and Antigravity",
      vi: "Bảng Gợi Ý Lệnh & Tài Nguyên Hợp Nhất Giữa Devin Và Antigravity",
    },
    summary: {
      en: "Merges advertised ACP slash commands and @resource_link file/symbol targets into a single keyboard-navigable overlay where every item displays its exact harness and scope origin badge.",
      vi: "Hợp nhất các lệnh gạch chéo ACP và liên kết tài nguyên @resource_link vào một khung gợi ý điều khiển bằng bàn phím, nơi mỗi mục đều hiển thị rõ nhãn nguồn gốc harness.",
    },
    xray: {
      humanPrompt: "/antigravity /plan @src/modules/wok-reactor-stage/index.tsx",
      orchestratorTool:
        'resolveMentions({ query: "plan", harness: "antigravity" }) | [{ trigger: "/plan", origin: "antigravity:acp-catalog", resource: "file:///.../index.tsx" }]',
      engineExecution:
        "acp-session-core catalog lookup attached structured resource_link content block to session/prompt payload.",
    },
    proNotBroLesson: {
      en: "When multiple harnesses advertise slash commands, unlabelled autocomplete causes operator misfires. Stamp every suggestion with its canonical origin seam.",
      vi: "Khi nhiều harness cùng cung cấp lệnh gạch chéo, gợi ý không nhãn rất dễ làm dev bấm nhầm. Hãy đóng dấu nguồn gốc chuẩn xác lên từng mục gợi ý.",
    },
  },
  {
    id: "S7",
    plugin: "steward",
    horizon: "next-release",
    harnessNode: "antigravity",
    durationLabel: "01:33",
    sourceGrounding: "src/targeted-request-broker.ts / src/acp-session-core.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "Fenced Live Option Switching (ctrl+m / ctrl+e / ctrl+t)",
      vi: "Đổi Cấu Hình Sống Có Rào Chắn (ctrl+m / ctrl+e / ctrl+t)",
    },
    subtitle: {
      en: "Confirmed ACP Config Writes via Targeted Request Broker",
      vi: "Ghi Cấu Hình ACP Có Xác Nhận Qua Bộ Điều Phối Yêu Cầu Đích Danh",
    },
    summary: {
      en: "Cycle model, reasoning effort, or mode mid-session using ctrl+m, ctrl+e, and ctrl+t. Writes are fenced through targeted-request-broker.ts and only update UI badges after the foreign engine confirms the catalog state.",
      vi: "Chuyển đổi model, mức độ suy luận hoặc chế độ chạy ngay giữa phiên bằng phím tắt ctrl+m, ctrl+e, ctrl+t. Mọi thay đổi đều đi qua hàng rào xác nhận từ engine trước khi cập nhật nhãn giao diện.",
    },
    xray: {
      humanPrompt: "[Keypress: ctrl+e] Switch Antigravity effort from medium to max",
      orchestratorTool:
        'targetedRequestBroker.enqueue({ method: "session/set_config_option", params: { sessionId: "agy_402", configId: "reasoning_effort", value: "max" } })',
      engineExecution:
        "Serialized in-flight config mutation, awaited ACP configOptions echo, confirmed 'max' in acp-session-core, and updated UI badge.",
    },
    proNotBroLesson: {
      en: "Optimistic UI lies when an engine rejects a model or effort transition. Fence concurrent config writes and render only engine-confirmed catalog values.",
      vi: "Giao diện cập nhật lạc quan sẽ đánh lừa người dùng nếu engine từ chối đổi model. Hãy rào chắn các lệnh ghi cấu hình và chỉ hiển thị giá trị đã được engine xác nhận.",
    },
  },
  {
    id: "S8",
    plugin: "steward",
    horizon: "next-release",
    harnessNode: "freebuff",
    durationLabel: "01:52",
    sourceGrounding: "src/model-slots.ts / src/delegation/delegate-tool.ts",
    highlightsFreebuffReferral: true,
    title: {
      en: "Rank-Routed Parallel Swarm (3-Slot ModelSlotChain)",
      vi: "Bầy Đàn Song Song Định Tuyến Theo Hạng (ModelSlotChain 3-Slot)",
    },
    subtitle: {
      en: "Freebuff Recon + Devin TDD Implementation + Antigravity Adversarial Review",
      vi: "Trinh Sát Freebuff + Thực Thi TDD Devin + Phản Biện Kiến Trúc Antigravity",
    },
    summary: {
      en: "Fan out work across a 3-slot ModelSlotChain via hivemind-delegate: Slot 1 routes fast repo recon to Freebuff (deepseek-4.1-flash / glm-5.3-flash), Slot 2 assigns deep TDD slices to Devin (swe-2-max), and Slot 3 runs visual/spec verification on Antigravity (argon-4-high).",
      vi: "Phân bổ tác vụ song song qua chuỗi 3-slot ModelSlotChain: Slot 1 giao việc dò tìm tốc độ cao cho Freebuff, Slot 2 giao viết code TDD cho Devin, và Slot 3 chạy kiểm định chéo trên Antigravity.",
    },
    xray: {
      humanPrompt:
        "@hivemind-delegate --chain recon:freebuff,impl:devin,review:antigravity Build & verify PartnerConversionModule",
      orchestratorTool:
        'resolveModelSlotChain({ slot1: "freebuff/deepseek-4.1-flash", slot2: "devin/swe-2-max", slot3: "antigravity/argon-4-high" })',
      engineExecution:
        "Spawned 3 isolated worktree lanes (.worktree/recon, .worktree/impl, .worktree/review) and merged a verified green diff with 68% lower frontier token burn.",
    },
    proNotBroLesson: {
      en: "Burning frontier reasoning quota on file-tree recon is amateur hour. Route by cognitive rank across specialized harnesses and isolate writers in linked git worktrees.",
      vi: "Đốt quota model đắt tiền chỉ để đọc dạo cây thư mục là cách làm lãng phí. Hãy phân tầng theo độ khó nhận thức qua chuỗi slot và cô lập mỗi luồng ghi trong một git worktree riêng.",
    },
  },
  {
    id: "S9",
    plugin: "steward",
    horizon: "next-release",
    harnessNode: "freebuff",
    durationLabel: "01:41",
    sourceGrounding: "src/freebuff-session-lease.ts / .agents/skills/stack-freebuff/SKILL.md",
    highlightsFreebuffReferral: true,
    title: {
      en: "Freebuff Rotated fbm1.... Handle Recovery on HTTP 409",
      vi: "Tự Khôi Phục Mã Model Xoay Vòng fbm1.... Khi Gặp HTTP 409",
    },
    subtitle: {
      en: "Ed25519 Device Signing & Live Catalog Re-Pinning Without Turn Loss",
      vi: "Ký Thiết Bị Ed25519 & Cập Nhật Lại Danh Mục Sống Không Làm Đứt Lượt",
    },
    summary: {
      en: "Freebuff rotates opaque fbm1.... model handles periodically. When an in-flight turn hits HTTP 409 Conflict, freebuff-session-lease.ts re-queries /api/v1/freebuff/models with Ed25519 signing, swaps in the fresh handle for glm-5.3-flash, and resumes transparently.",
      vi: "Freebuff định kỳ xoay vòng mã định danh fbm1.... Khi lượt gọi gặp lỗi HTTP 409, module quản lý phiên tự động tải lại danh mục qua chữ ký Ed25519, ánh xạ mã mới cho glm-5.3-flash và tiếp tục mượt mà.",
    },
    xray: {
      humanPrompt: "@delegate-freebuff Generate bilingual JSON fixtures for 20 showcase slices",
      orchestratorTool:
        'POST /api/v1/freebuff/session (Ed25519-Signature: 0x94b1...) | HTTP 409 StaleHandle(fbm1_old88a) | refreshFreebuffCatalog()',
      engineExecution:
        "GET /api/v1/freebuff/models mapped 'glm-5.3-flash' to fbm1_7c39d2e1 and re-dispatched turn with zero prompt loss.",
    },
    proNotBroLesson: {
      en: "Never hardcode ephemeral vendor wire handles into domain config. Bind configuration to semantic model slugs and let the transport adapter resolve rotated handles on 409.",
      vi: "Đừng bao giờ gắn cứng mã định danh tạm thời của nhà cung cấp vào cấu hình nghiệp vụ. Hãy neo theo tên model ngữ nghĩa và để tầng adapter tự xử lý xoay vòng mã khi gặp lỗi 409.",
    },
  },
  {
    id: "S10",
    plugin: "steward",
    horizon: "next-release",
    harnessNode: "freebuff",
    durationLabel: "01:27",
    sourceGrounding: "src/freebuff-session-lease.ts / src/admission-ledger.ts",
    highlightsFreebuffReferral: true,
    title: {
      en: "keepSlotForResume Lease & Pause Continuity",
      vi: "Duy Trì Phiên Tạm Dừng Với Cơ Chế keepSlotForResume",
    },
    subtitle: {
      en: "Deterministic Admission Lease Retention Across Multi-Turn Handoffs",
      vi: "Giữ Vững Quyền Thuê Slot Qua Các Nhịp Chuyển Giao Đa Lượt",
    },
    summary: {
      en: "Keeps the active Freebuff admission slot warm during human review or cross-harness verification pauses via keepSlotForResume, avoiding waiting-room re-queue delays between iterative TDD rounds.",
      vi: "Giữ nóng slot kết nối Freebuff trong lúc chờ người dùng duyệt hoặc chờ harness khác kiểm tra chéo thông qua cờ keepSlotForResume, giúp vòng lặp TDD tiếp theo chạy tức thì không phải xếp hàng lại.",
    },
    xray: {
      humanPrompt: "/freebuff:pause --keep-slot-for-resume 300s",
      orchestratorTool:
        'transitionFreebuffLease({ leaseId: "fbl_092a", keepSlotForResume: true, ttlSeconds: 300 })',
      engineExecution:
        "Admission ledger locked slot state = PAUSED_RETAINED, heartbeat keepalive acked, and resumed in 0ms on follow-up prompt.",
    },
    proNotBroLesson: {
      en: "Dropping an admission lease on every pause destroys interactive TDD cadence. Model lease states explicitly so pause-and-resume is a first-class transition.",
      vi: "Hủy quyền thuê kết nối mỗi khi tạm dừng sẽ phá hỏng nhịp độ TDD tương tác. Hãy mô hình hóa rõ trạng thái giữ slot để việc tạm dừng và chạy tiếp diễn ra tức thời.",
    },
  },
  {
    id: "M1",
    plugin: "substrate",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:22",
    sourceGrounding: "hivemind-substrate/src/spine/blob-store.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "The Spine Lossless Content-Addressed Blob Archive",
      vi: "Kho Lưu Trữ Băm Không Suy Hao The Spine",
    },
    subtitle: {
      en: "Immutable .session-archive/blobs/<sha256>.txt Transcript Vault",
      vi: "Hầm Lưu Trữ Lịch Sử Phiên Bất Biến .session-archive/blobs/<sha256>.txt",
    },
    summary: {
      en: "Captures every raw tool stdout, diff payload, and subagent transcript into content-addressed SHA-256 blobs on disk before any context window compaction or pruning touches the active prompt.",
      vi: "Lưu giữ nguyên bản mọi kết quả trả về của tool, bản diff và hội thoại subagent vào các tệp định danh SHA-256 trên ổ đĩa trước khi bất kỳ bước nén hay cắt tỉa ngữ cảnh nào can thiệp.",
    },
    xray: {
      humanPrompt: "/substrate:spine inspect sha256:4b825dc642cb6eb9a060e54bf8d69288fbee4904",
      orchestratorTool:
        'spineBlobStore.writeBlob(rawToolOutput) | ".session-archive/blobs/4b825dc6...4904.txt" (38,412 bytes)',
      engineExecution:
        "Atomic write-then-rename completed in 0.42ms and deduplicated identical tool output across 3 subagent turns.",
    },
    proNotBroLesson: {
      en: "Context pruning is only safe when backed by a lossless archive. Content-address every raw artifact into The Spine first so pruned turns remain 100% recoverable.",
      vi: "Việc tỉa gọn ngữ cảnh chỉ thực sự an toàn khi có kho lưu trữ gốc không suy hao đứng sau. Hãy băm và cất mọi dữ liệu thô vào The Spine trước để luôn khôi phục được 100% khi cần.",
    },
  },
  {
    id: "M2",
    plugin: "substrate",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:36",
    sourceGrounding: "hivemind-substrate/src/spine/shadow-git.ts", // taste-skill-ignore
    highlightsFreebuffReferral: false,
    title: {
      en: "Shadow Git Working-Tree Draft Checkpoints", // taste-skill-ignore
      vi: "Điểm Chốt Cây Thư Mục Bằng Nhánh Nháp Shadow Git", // taste-skill-ignore
    },
    subtitle: {
      en: "Zero-Pollution Snapshot Refs Linked to Every Agent Turn",
      vi: "Tham Chiếu Ảnh Chụp Nháp Không Làm Bẩn Lịch Sử Git Chính",
    },
    summary: {
      en: "Records uncommitted working-tree state into an isolated shadow Git object namespace before and after every delegated tool execution without polluting the developer's main branch history or index.", // taste-skill-ignore
      vi: "Ghi nhận trạng thái cây thư mục chưa commit vào không gian đối tượng Git nháp tách biệt trước và sau mỗi lệnh thực thi của agent mà không làm nhiễu lịch sử nhánh chính.",
    },
    xray: {
      humanPrompt: "/substrate:checkpoint diff turn_14..turn_18",
      orchestratorTool:
        'shadowGit.captureWorkingTree({ sessionId: "ses_01J9X8A2", turnIndex: 18 }) | refs/hivemind/shadow/ses_01J9X8A2/18', // taste-skill-ignore
      engineExecution:
        "GIT_INDEX_FILE=.session-archive/shadow.index git write-tree recorded tree 9c11f0... in 1.1ms without touching .git/index.", // taste-skill-ignore
    },
    proNotBroLesson: {
      en: "Never run git stash or dirty commits on the user's active index to save agent checkpoints. Use a dedicated GIT_INDEX_FILE and custom ref namespace.",
      vi: "Đừng bao giờ tự ý chạy git stash hay tạo commit rác lên nhánh làm việc của người dùng. Hãy tách riêng GIT_INDEX_FILE và vùng tham chiếu độc lập.",
    },
  },
  {
    id: "M3",
    plugin: "substrate",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:48",
    sourceGrounding: "hivemind-substrate/src/honeycomb/sqlite-index.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "The Honeycomb Hybrid SQLite Index (index.sqlite)",
      vi: "Chỉ Mục Lai SQLite The Honeycomb (index.sqlite)",
    },
    subtitle: {
      en: "FTS5 BM25 + Vector Embeddings + Typed Graph Edges in One Local DB",
      vi: "Kết Hợp FTS5 BM25 + Vector Ngữ Nghĩa + Cạnh Đồ Thị Trong Một Tệp SQLite",
    },
    summary: {
      en: "Indexes SemanticSessionDigest, IntentPivot, and DelegationTurn records inside a single WAL-mode index.sqlite database, fusing lexical BM25 exact-symbol recall with semantic vector proximity and graph traversal.",
      vi: "Đánh chỉ mục SemanticSessionDigest, IntentPivot và DelegationTurn ngay trong một tệp index.sqlite chế độ WAL, kết hợp tìm kiếm từ khóa chính xác BM25 với độ gần vector và duyệt đồ thị.",
    },
    xray: {
      humanPrompt: "@substrate_recall Why did we fence session/set_config_option behind targeted-request-broker?",
      orchestratorTool:
        'honeycomb.queryHybrid({ text: "set_config_option targeted-request-broker", k: 5, weights: { bm25: 0.45, vector: 0.35, graph: 0.20 } })',
      engineExecution:
        "SQLite FTS5 + cosine vector join + 1-hop IntentPivot edge scan returned ADR-006 & turn_31 digest in 4.8ms.",
    },
    proNotBroLesson: {
      en: "Vector search alone hallucinates on exact identifier names, and grep alone misses conceptual pivots. Fuse BM25, vectors, and relational edges inside one local SQLite file.",
      vi: "Chỉ dùng vector sẽ trượt tên biến chính xác, còn chỉ dùng grep sẽ bỏ sót mạch ý tưởng. Hãy hợp nhất BM25, vector và cạnh quan hệ ngay trong một cơ sở dữ liệu SQLite nội bộ.",
    },
  },
  {
    id: "M4",
    plugin: "substrate",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:39",
    sourceGrounding: "hivemind-substrate/src/honeycomb/repomap-pagerank.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "AST Symbol Skeletons & PageRank RepoMap",
      vi: "Khung Xương Ký Hiệu AST & Bản Đồ RepoMap PageRank",
    },
    subtitle: {
      en: "High-Signal Public Seam Signatures Ranked by Call-Graph Centrality",
      vi: "Chữ Ký Giao Diện Công Khai Được Xếp Hạng Theo Độ Trọng Tâm Đồ Thị Gọi",
    },
    summary: {
      en: "Extracts exported TypeScript/TSX type and function signatures without implementation bodies and ranks them via Personalized PageRank seeded by the active task's touched files.",
      vi: "Trích xuất chữ ký hàm và kiểu dữ liệu xuất công khai mà bỏ qua phần thân chi tiết, sau đó xếp hạng bằng thuật toán Personalized PageRank dựa trên các tệp đang thao tác.",
    },
    xray: {
      humanPrompt: "/substrate:repomap --focus src/modules/ecosystem-catalog/index.ts --budget 900",
      orchestratorTool:
        'buildPageRankRepoMap({ seedFiles: ["src/modules/ecosystem-catalog/index.ts"], maxTokens: 900 })',
      engineExecution:
        "Traversed 142 symbol nodes & 318 import edges and emitted an 812-token ranked skeleton covering all 5 module seams.",
    },
    proNotBroLesson: {
      en: "Dumping full 800-line files into a subagent prompt drowns the model in implementation noise. Feed it PageRank-ordered public seam skeletons first.",
      vi: "Nhồi nguyên tệp 800 dòng vào prompt chỉ làm loãng sự chú ý của model. Hãy cấp cho nó khung xương giao diện công khai đã được xếp hạng PageRank trước tiên.",
    },
  },
  {
    id: "M5",
    plugin: "substrate",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:19",
    sourceGrounding: "hivemind-substrate/src/valve/working-set-valve.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "Working-Set Valve (< 2 ms Pre-Turn Bloat Pruning)",
      vi: "Van Tỉa Ngữ Cảnh Working-Set Valve (< 2 ms Trước Mỗi Lượt)",
    },
    subtitle: {
      en: "Surgical Replacement of Superseded Tool Dumps with Spine Pointers",
      vi: "Thay Thế Phẫu Thuật Các Khối Log Cũ Kỹ Bằng Con Trỏ The Spine",
    },
    summary: {
      en: "Runs as a sub-2-millisecond pre-turn middleware that detects superseded file reads and verbose test logs, replacing their in-window payload with a compact 1-line Spine SHA-256 reference and summary.",
      vi: "Hoạt động như lớp trung gian chạy dưới 2 mili-giây trước mỗi lượt suy luận, tự động phát hiện các lần đọc tệp đã cũ hoặc log test dài dòng để thay bằng con trỏ SHA-256 gọn nhẹ.",
    },
    xray: {
      humanPrompt: "[Pre-Turn Hook] Turn #27 entering LLM context window (raw: 94,200 tokens)",
      orchestratorTool:
        'workingSetValve.pruneTurnWindow({ sessionId: "ses_01J9X8A2", maxWorkingTokens: 28000 })',
      engineExecution:
        "Replaced 11 stale tool outputs with [spine://sha256:...] pointers in 1.34ms, reducing active prompt from 94,200 to 21,840 tokens.",
    },
    proNotBroLesson: {
      en: "Waiting until the context window hits 95% to run a slow LLM summarization pass is too late. Prune superseded tool bloat deterministically in under 2 milliseconds on every turn.",
      vi: "Đợi đến khi đầy 95% cửa sổ ngữ cảnh mới gọi LLM tóm tắt vừa chậm vừa mất chi tiết. Hãy tỉa các khối log cũ một cách định đạt trong dưới 2 mili-giây ở ngay mỗi lượt.",
    },
  },
  {
    id: "M6",
    plugin: "substrate",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:31",
    sourceGrounding: "hivemind-substrate/src/valve/compaction-packet.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "< 1,200-Token CompactionContinuationPacket",
      vi: "Gói Bàn Giao Ngữ Cảnh CompactionContinuationPacket < 1.200 Token",
    },
    subtitle: {
      en: "Zero-Amnesia Session Handoffs Across Compactions and Subagents",
      vi: "Chuyển Giao Phiên Không Mất Trí Nhớ Giữa Các Đợt Nén Và Subagent",
    },
    summary: {
      en: "Synthesizes settled architectural invariants, active write leases, failing test assertions, and Spine blob URIs into a deterministic < 1,200-token packet so resumed sessions never re-litigate closed decisions.",
      vi: "Tổng hợp các bất biến kiến trúc đã chốt, phạm vi quyền ghi, lỗi test đang mở và đường dẫn The Spine vào một gói dữ liệu dưới 1.200 token để phiên mới bắt nhịp ngay lập tức.",
    },
    xray: {
      humanPrompt: "/substrate:handoff --max-tokens 1200",
      orchestratorTool:
        'emitCompactionContinuationPacket({ sessionId: "ses_01J9X8A2", budgetTokens: 1200 })',
      engineExecution:
        "Packed 6 settled ADR constraints + 8 write-scope paths + 4 Spine SHA-256 handles into 1,048 tokens (validated against ContinuationPacketSchema).",
    },
    proNotBroLesson: {
      en: "Free-form prose summaries lose file paths and invariants during compaction. Emit a schema-validated ContinuationPacket with exact write leases and Spine pointers.",
      vi: "Tóm tắt văn xuôi tự do rất dễ làm rơi đường dẫn tệp và quy tắc bất biến khi nén phiên. Hãy xuất gói ContinuationPacket chuẩn lược đồ với danh sách tệp và con trỏ rõ ràng.",
    },
  },
  {
    id: "M7",
    plugin: "substrate",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:28",
    sourceGrounding: "hivemind-substrate/src/honeycomb/provenance-chain.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "ProvenanceChain Commit-to-Session Forensics",
      vi: "Truy Vết Nguồn Cơn Commit-Tới-Phiên Với ProvenanceChain",
    },
    subtitle: {
      en: "Trace Any Line of Code Back to the Exact Agent Turn & Prompt",
      vi: "Truy Ngược Bất Kỳ Dòng Code Nào Về Đúng Lượt Suy Luận & Câu Lệnh Gốc",
    },
    summary: {
      en: "Links Git commit trailers and AST symbol ranges directly to the originating parent session, delegated child ses_*, and Spine transcript blob so maintainers always know why a line exists.",
      vi: "Liên kết nhãn đuôi Git commit và vùng ký hiệu AST thẳng tới phiên cha khởi phát, phiên con ses_* và tệp lưu trữ The Spine để luôn biết chính xác vì sao một dòng code ra đời.",
    },
    xray: {
      humanPrompt: "/substrate:why src/modules/partner-conversion/index.ts:42",
      orchestratorTool:
        'provenanceChain.traceSymbol({ file: "src/modules/partner-conversion/index.ts", line: 42 })',
      engineExecution:
        "Resolved commit 7d91e2a | session ses_01J9X8A2 | delegate-devin turn #9 | Spine blob sha256:9f01a... (US-11 Referral Vault spec).",
    },
    proNotBroLesson: {
      en: "Git blame shows who touched a line, not the failed hypotheses or spec constraints behind it. Bind commits to their ProvenanceChain so architectural intent never evaporates.",
      vi: "Lệnh git blame chỉ cho biết ai sửa dòng code, chứ không cho biết các giả thuyết đã loại bỏ hay ràng buộc đặc tả đằng sau. Hãy gắn commit vào ProvenanceChain để giữ trọn ý đồ thiết kế.",
    },
  },
  {
    id: "M8",
    plugin: "substrate",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:35",
    sourceGrounding: "hivemind-substrate/src/honeycomb/git-cochange.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "git_cochange Temporal Coupling Radar",
      vi: "Radar Phát Hiện Phụ Thuộc Ngầm git_cochange",
    },
    subtitle: {
      en: "Catch Hidden Cross-File Drift Before Assigning Write Leases",
      vi: "Phát Hiện Các Tệp Thường Xuyên Biến Động Cùng Nhau Trước Khi Giao Quyền Ghi",
    },
    summary: {
      en: "Mines historical commit co-occurrence matrices into the git_cochange SQLite table, warning the orchestrator when two files change together 85% of the time despite having no direct import edge.",
      vi: "Khai phá lịch sử commit để lập ma trận biến động cùng nhau trong bảng git_cochange, cảnh báo ngay khi hai tệp thường xuyên phải sửa chung dù không hề có lệnh import trực tiếp.",
    },
    xray: {
      humanPrompt: "/substrate:cochange src/types/portal.ts",
      orchestratorTool:
        'honeycomb.queryCochange({ file: "src/types/portal.ts", minConfidence: 0.75 })',
      engineExecution:
        "Detected high temporal coupling: src/modules/locale-dictionary/en.json (0.94) & vi.json (0.94), adding both to the delegate write-lease checklist.",
    },
    proNotBroLesson: {
      en: "Static import graphs miss implicit schema coupling across JSON dictionaries and fixtures. Combine AST edges with git_cochange history when sizing subagent write scopes.",
      vi: "Đồ thị import tĩnh thường bỏ sót sự ràng buộc ngầm giữa lược đồ code và các tệp từ điển JSON. Hãy kết hợp phân tích AST với lịch sử git_cochange khi khoanh vùng quyền ghi cho subagent.",
    },
  },
  {
    id: "M9",
    plugin: "substrate",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:44",
    sourceGrounding: "hivemind-substrate/src/valve/mudball-advisor.ts",
    highlightsFreebuffReferral: false,
    title: {
      en: "/substrate Mudball Advisor & Seam Deepening",
      vi: "Cố Vấn Kiến Trúc /substrate Mudball Advisor",
    },
    subtitle: {
      en: "Automated Detection of Shallow Pass-Throughs & God Files",
      vi: "Tự Động Chỉ Điểm Các Tệp Ôm Đồm Và Lớp Vỏ Trung Gian Nông Cạn",
    },
    summary: {
      en: "Audits module boundary depth by comparing exported surface area against internal cyclomatic complexity and co-change churn, proposing concrete seam consolidations before feature work starts.",
      vi: "Kiểm toán độ sâu của module bằng cách đối chiếu diện tích bề mặt hàm xuất ra với độ phức tạp nội tại và tần suất sửa đổi, từ đó đề xuất gộp gọn ranh giới trước khi thêm tính năng mới.",
    },
    xray: {
      humanPrompt: "/substrate:mudball --threshold 0.70",
      orchestratorTool:
        'mudballAdvisor.auditRepo({ root: "src/", maxFileLoc: 1000, maxPassThroughRatio: 0.30 })',
      engineExecution:
        "Verified 5 deep modules under src/modules/* (avg depth score: 0.89, 0 files > 1,000 LOC, 0 leaky pass-through wrappers).",
    },
    proNotBroLesson: {
      en: "Adding features on top of a shallow mudball multiplies regressions. Measure interface-to-implementation depth and collapse pass-through layers structurally first.",
      vi: "Cố chồng thêm tính năng lên một khối code rối rắm chỉ làm nhân bội lỗi phát sinh. Hãy đo tỷ lệ độ sâu giao diện/thực thi và dẹp bỏ các lớp trung gian thừa thãi trước.",
    },
  },
  {
    id: "C1",
    plugin: "cross-plugin",
    horizon: "roadmap",
    harnessNode: "substrate",
    durationLabel: "01:56",
    sourceGrounding: "hivemind-steward-acp + hivemind-substrate closed-loop bridge",
    highlightsFreebuffReferral: false,
    title: {
      en: "Steward + Substrate Closed-Loop Multi-Harness Handoff",
      vi: "Vòng Khép Kín Steward + Substrate Giữa Đa Harness",
    },
    subtitle: {
      en: "Every Delegated Turn Indexed in The Honeycomb & Pruned via Working-Set Valve",
      vi: "Mọi Lượt Ủy Quyền Đều Được Đánh Chỉ Mục Vào Honeycomb & Tỉa Gọn Qua Van Ngữ Cảnh",
    },
    summary: {
      en: "Demonstrates the complete Hivemind-* flywheel: hivemind-steward-acp dispatches a 3-harness task across Freebuff, Devin, and Antigravity while hivemind-substrate archives raw wire traces into The Spine, indexes DelegationTurn edges in The Honeycomb, and feeds a < 1,200-token continuation packet to the next harness.",
      vi: "Trình diễn vòng quay khép kín của hệ sinh thái Hivemind-*: Steward điều phối 3 harness (Freebuff, Devin, Antigravity) trong khi Substrate lưu vết thô vào The Spine, đánh chỉ mục DelegationTurn vào The Honeycomb và cấp gói bàn giao dưới 1.200 token cho harness kế tiếp.",
    },
    xray: {
      humanPrompt:
        "@hivemind-delegate --with-substrate Ship & verify bilingual 20-clip X-Ray catalog across Freebuff, Devin, and Antigravity",
      orchestratorTool:
        'steward.dispatchChain() |> substrate.recordDelegationTurn() |> workingSetValve.emitContinuationPacket({ maxTokens: 1200 })',
      engineExecution:
        "Freebuff recon blob archived (sha256:3a19...), Honeycomb indexed 20 ShowcaseId nodes, Devin received 980-token packet, and Antigravity verified zero drift.",
    },
    proNotBroLesson: {
      en: "Multi-agent swarms collapse under their own transcript weight unless paired with a surgical memory engine. Orchestration (Steward) and memory (Substrate) are two halves of one architecture.",
      vi: "Một bầy subagent sẽ tự sập vì ngập trong lịch sử hội thoại của chính nó nếu thiếu một động cơ bộ nhớ phẫu thuật. Điều phối (Steward) và bộ nhớ (Substrate) là hai nửa không thể tách rời.",
    },
  },
];

interface RawGreenfieldStep {
  readonly stepNumber: number;
  readonly phaseCode: "V1" | "V2" | "V3" | "V4" | "V5";
  readonly harnessId: ReactorNodeId;
  readonly modelSlot: string;
  readonly title: LocalizedText;
  readonly actionSummary: LocalizedText;
  readonly xray: ThreeLayerXRay;
  readonly verificationGate: string;
}

const RAW_GREENFIELD_STEPS: ReadonlyArray<RawGreenfieldStep> = [
  {
    stepNumber: 1,
    phaseCode: "V1",
    harnessId: "freebuff",
    modelSlot: "Slot 1 / $0 Daily-Credit Recon & Mid-Session Swap (deepseek-4.1-flash / glm-5.3-flash)",
    title: {
      en: "$0 Daily-Credit R3F Recon & Live Swap to glm-5.3-flash",
      vi: "Trinh Sát 0 Đồng Với Freebuff & Đổi Não Giữa Phiên Sang glm-5.3-flash",
    },
    actionSummary: {
      en: "From an empty folder, Freebuff (deepseek-4.1-flash) scans React Three Fiber docs and drafts the spec for $0 using daily free credits, then switches live mid-session to glm-5.3-flash for high-speed API docs without starting a new session.",
      vi: "Khởi đầu từ thư mục trống, Freebuff (deepseek-4.1-flash) càn quét tài liệu React Three Fiber và dựng khung đặc tả với chi phí 0 đồng nhờ gói credit miễn phí mỗi ngày, rồi đổi não trực tiếp ngay giữa phiên sang glm-5.3-flash mà không mất phiên.",
    },
    xray: {
      humanPrompt:
        "@hivemind-delegate --parallel 2 freebuff:deepseek-4.1-flash,antigravity:argon-4-high",
      orchestratorTool:
        'tool: "hivemind-delegate", modelSlot: "deepseek-4.1-flash -> glm-5.3-flash", lease: "keepSlotForResume"',
      engineExecution:
        "Spawned background ses_* child on $0 daily Freebuff credits, swapped live to glm-5.3-flash mid-session without dropping instanceId.",
    },
    verificationGate: "bun test test/phase-v1-seams.test.ts (103/103 EN/VI leaf keys matched)",
  },
  {
    stepNumber: 2,
    phaseCode: "V2",
    harnessId: "antigravity",
    modelSlot: "Slot 3 / Parallel 3D Three.js Spatial Design & Shaders (argon-4-high)",
    title: {
      en: "Parallel 3D Three.js Spatial Design & Bi-Directional Sync",
      vi: "Thiết Kế Không Gian 3D Three.js Song Song Trên Antigravity (argon-4-high)",
    },
    actionSummary: {
      en: "Running in parallel as a shared ses_* background child, Antigravity (argon-4-high) architects the 3D Three.js orbital command stage, studio lighting, and deterministic SVG schematic while synced bi-directionally with the host harness.",
      vi: "Chạy song song dưới dạng phiên con ses_* dùng chung, Antigravity (argon-4-high) thiết kế không gian 3D Three.js, hiệu ứng ánh sáng và sơ đồ SVG tất định, đồng bộ hai chiều với cả nền tảng gốc.",
    },
    xray: {
      humanPrompt:
        "/antigravity Architect 3D Three.js orbital command core and deterministic SVG fallback",
      orchestratorTool:
        'jsonrpc: "session/prompt", harness: "antigravity", model: "argon-4-high", sync: "bi-directional"',
      engineExecution:
        "Rendered 4 ReactorNodeDescriptor rings + renderDeterministicFallbackSvg() synced across OpenCode TUI and Antigravity host.",
    },
    verificationGate: "bun test test/phase-v2-wok-reactor.test.ts (4 nodes + SVG fallback verified)",
  },
  {
    stepNumber: 3,
    phaseCode: "V3",
    harnessId: "devin",
    modelSlot: "Slot 2 / Heavy-Lifter Multi-Page Next.js & Backend (swe-2-max)",
    title: {
      en: "Devin (swe-2-max) Multi-Page Next.js App Router & Backend Tickets",
      vi: "Tung Chủ Lực Devin (swe-2-max) Dựng Khung Đa Trang Next.js & API Backend",
    },
    actionSummary: {
      en: "Once the 3D blueprint and spec lock, Orchestrator dispatches all multi-page Next.js App Router and backend API tickets to Devin (swe-2-max) via shared ses_* child sessions that you can inspect and reuse in Devin's UI to squeeze $20 promos.",
      vi: "Khi bản vẽ 3D và đặc tả đã chốt, Orchestrator giao toàn bộ ticket dựng khung đa trang Next.js và API backend cho siêu não Devin (swe-2-max) qua phiên con ses_* dùng chung, giúp tái sử dụng ngữ cảnh và vắt kiệt gói promo $20.",
    },
    xray: {
      humanPrompt:
        "@delegate-devin Implement multi-page Next.js App Router and PartnerConversionModule seams",
      orchestratorTool:
        'tool: "delegate-devin", sessionId: "ses_01J9X9B4", model: "swe-2-max", sharedHostSession: true',
      engineExecution:
        "Bound shared ses_01J9X9B4 child session surfaced in both OpenCode and Devin host UI, passing all seam and conversion checks.",
    },
    verificationGate: "bun test test/phase-v1-seams.test.ts (PARTNER_URLS & conversion verified)",
  },
  {
    stepNumber: 4,
    phaseCode: "V4",
    harnessId: "devin",
    modelSlot: "Slot 1+2 / Pause, Ed25519 Signing & fbm1.... / keepSlotForResume (swe-2-max)",
    title: {
      en: "Mid-Run Pause, Rotated fbm1.... Recovery & keepSlotForResume Lease",
      vi: "Tạm Dừng Giữa Chừng (Pause), Bắt Sóng Mã fbm1.... & Giữ Quyền Thuê keepSlotForResume",
    },
    actionSummary: {
      en: "Hit Pause mid-run to inspect child sessions and swap models: Freebuff signs packets with hardware Ed25519 keys, auto-recovers from HTTP 409 rotated fbm1.... anti-spam handles, and holds instanceId + RunState via keepSlotForResume without calling DELETE.",
      vi: "Bấm Pause giữa chừng để kiểm tra phiên con và đổi model: Freebuff ký gói tin bằng khóa Ed25519, tự động bắt sóng khi server xoay vòng mã fbm1.... (HTTP 409) và giữ chặt phiên thuê qua keepSlotForResume mà không xóa phiên.",
    },
    xray: {
      humanPrompt:
        "Pause active run -> inspect harness-freebuff.ts, freebuff-acp-bridge.ts & freebuff-session-lease.ts",
      orchestratorTool:
        'freebuffSessionLease.pause({ keepSlotForResume: true, onHttp409: "refreshCatalogFbm1" })',
      engineExecution:
        "Preserved instanceId + remainingMs + RunState across Pause and remapped rotated fbm1.... handle automatically without session loss.",
    },
    verificationGate: "bun test test/phase-v4-v5-showroom.test.ts + bun run typecheck",
  },
  {
    stepNumber: 5,
    phaseCode: "V5",
    harnessId: "substrate",
    modelSlot: "Substrate + 3-Harness Resume / 60fps 3D Production & < 2ms Valve",
    title: {
      en: "Resume to 60fps localhost:3000 & Stage 3 Substrate Compaction",
      vi: "Chạy Tiếp Tới Web 3D 60fps & Nén Bộ Nhớ Hivemind-Substrate Dưới 2ms",
    },
    actionSummary: {
      en: "Hit Resume: Devin (swe-2-max), Antigravity (argon-4-high), and Freebuff (glm-5.3-flash) finish the 60fps 3D app on localhost:3000 while Hivemind-Substrate verifies child outcomes in The Honeycomb and prunes raw logs to 1,140 tokens in under 2ms.",
      vi: "Bấm Resume: Devin (swe-2-max), Antigravity (argon-4-high) và Freebuff (glm-5.3-flash) hoàn thiện web 3D 60fps trên localhost:3000 trong khi Hivemind-Substrate xác thực kết quả Verified vào The Honeycomb và tỉa gọn ngữ cảnh còn 1.140 token dưới 2ms.",
    },
    xray: {
      humanPrompt:
        "Resume 3-Harness run && bun test && bun run typecheck && bun run build",
      orchestratorTool:
        'substrate.emitContinuationPacket({ maxTokens: 1200, freshnessManifest: "FRESH_DO_NOT_REREAD" })',
      engineExecution:
        "60fps 3D web app live on localhost:3000, 24/24 tests green, and working-set pruned from 48,000 to 1,140 tokens in 1.4ms.",
    },
    verificationGate: "bun test && bun run typecheck && bun run build (ALL GREEN)",
  },
];

const RAW_HORIZON_SUMMARIES: ReadonlyArray<{
  readonly horizon: HorizonTier;
  readonly badge: LocalizedText;
  readonly canonicalScope: LocalizedText;
  readonly description: LocalizedText;
  readonly sourceGrounding: string;
  readonly primaryNode: ReactorNodeId;
}> = [
  {
    horizon: "shipped",
    badge: HORIZON_BADGES.shipped,
    canonicalScope: {
      en: "Devin ACP Steward MVP (hivemind-steward-acp v0.1)",
      vi: "Devin ACP Steward MVP (hivemind-steward-acp v0.1)",
    },
    description: {
      en: "Native /devin Hosted View on OpenCode's main menu, shared delegate-devin child sessions (ses_*) surfaced in Devin's host UI, crash-safe checkpoint reconcile, interactive ACP permission mediation, and npx hmoc-steward-acp.",
      vi: "Giao diện /devin nguyên bản ngay trên menu chính OpenCode, phiên con dùng chung delegate-devin (ses_*) hiển thị cả trên Devin gốc, đối soát điểm chốt sau sự cố, duyệt quyền ACP và bộ cài npx hmoc-steward-acp.",
    },
    sourceGrounding: "hivemind-steward-oc-devin-dev/README.md / src/hosted/lane.ts",
    primaryNode: "devin",
  },
  {
    horizon: "next-release",
    badge: HORIZON_BADGES["next-release"],
    canonicalScope: {
      en: "Tri-Harness Bridge & Freebuff Daily Free AI (v0.2)",
      vi: "Cầu Nối 3 Harness & AI Miễn Phí Mỗi Ngày Freebuff (v0.2)",
    },
    description: {
      en: "Break harness lock-in across Devin, Antigravity, and Freebuff: run foreign models as native OpenCode main agents delegating across 127+ providers, switch models live mid-session (ctrl+m/ctrl+e/ctrl+t), and squeeze $0 daily Freebuff credits with fbm1.... recovery and keepSlotForResume.",
      vi: "Phá khóa độc quyền Harness giữa Devin, Antigravity và Freebuff: dùng model ngoại làm agent chính điều phối cả 127+ provider OpenCode, đổi model ngay giữa phiên (ctrl+m/ctrl+e/ctrl+t) và tận dụng credit miễn phí mỗi ngày từ Freebuff với khôi phục mã fbm1.... cùng keepSlotForResume.",
    },
    sourceGrounding: "src/acp-session-core.ts / src/hosted/mentions.ts / src/targeted-request-broker.ts",
    primaryNode: "antigravity",
  },
  {
    horizon: "roadmap",
    badge: HORIZON_BADGES.roadmap,
    canonicalScope: {
      en: "Hivemind Substrate 3-Layer Memory Engine (hivemind-substrate)",
      vi: "Động Cơ Bộ Nhớ 3 Tầng Hivemind Substrate (hivemind-substrate)",
    },
    description: {
      en: "Layer 1 The Spine (.session-archive/blobs/<sha256>.txt & shadow Git drafts), Layer 2 The Honeycomb (Reported vs Verified outcome classifier & 0.21ms 4-tier AST graph in index.sqlite), and Layer 3 Working-Set Valve (< 2ms FRESH — DO NOT REREAD breadcrumbs & < 1,200-token compaction packet).", // taste-skill-ignore
      vi: "Tầng 1 The Spine (.session-archive/blobs/<sha256>.txt & nhánh nháp shadow Git), Tầng 2 The Honeycomb (phân loại Reported vs Verified & bản đồ AST 4 tầng 0.21ms trong index.sqlite) và Tầng 3 Working-Set Valve (nhãn FRESH — DO NOT REREAD dưới 2ms & gói bàn giao nén < 1.200 token).", // taste-skill-ignore
    },
    sourceGrounding: "hivemind-substrate/AGENTS.md / GLOSSARY.md",
    primaryNode: "substrate",
  },
];

export function localizeShowcaseCard(
  record: RawShowcaseRecord,
  locale: Locale,
): ShowcaseCardView {
  return {
    id: record.id,
    plugin: record.plugin,
    horizon: record.horizon,
    horizonBadge: HORIZON_BADGES[record.horizon][locale],
    harnessNode: record.harnessNode,
    durationLabel: record.durationLabel,
    title: record.title[locale],
    subtitle: record.subtitle[locale],
    summary: record.summary[locale],
    sourceGrounding: record.sourceGrounding,
    xray: record.xray,
    proNotBroLesson: record.proNotBroLesson[locale],
    highlightsFreebuffReferral: record.highlightsFreebuffReferral,
  };
}

export function buildGreenfieldWalkthrough(
  locale: Locale,
): GreenfieldWalkthroughView {
  return {
    id: "GREENFIELD-5MIN",
    title:
      locale === "en"
        ? "5-Minute 3-Harness Greenfield Build: Forging hivemind-portal"
        : "Màn Dựng Greenfield 5 Phút Với 3 Harness: Rèn Giũa hivemind-portal",
    subtitle:
      locale === "en"
        ? "Freebuff (deepseek-4.1-flash / glm-5.3-flash) + Devin (swe-2-max) + Antigravity (argon-4-high) under OpenCode V2 & Substrate Memory"
        : "Freebuff (deepseek-4.1-flash / glm-5.3-flash) + Devin (swe-2-max) + Antigravity (argon-4-high) dưới sự điều phối của OpenCode V2 & Bộ nhớ Substrate",
    durationLabel: "05:00",
    overview:
      locale === "en"
        ? "Instead of burning frontier tokens on every chore, the operator dispatches a 5-stage vertical pipeline across three specialized harnesses while Hivemind Substrate preserves lossless continuity between turns."
        : "Thay vì đốt token model đắt đỏ cho mọi việc lặt vặt, người vận hành phân bổ đường ống 5 bước dọc qua 3 harness chuyên biệt trong khi Hivemind Substrate giữ mạch ngữ cảnh không suy hao giữa các lượt.",
    proNotBroLesson:
      locale === "en"
        ? "Multi-harness orchestration wins when each engine owns a strict module seam and verifies its slice through an executable test gate before handoff."
        : "Điều phối đa harness chỉ thực sự phát huy sức mạnh khi mỗi engine làm chủ một ranh giới module rõ ràng và tự chứng minh bằng cổng test xanh trước khi bàn giao.",
    steps: RAW_GREENFIELD_STEPS.map((step) => ({
      stepNumber: step.stepNumber,
      phaseCode: step.phaseCode,
      harnessId: step.harnessId,
      modelSlot: step.modelSlot,
      title: step.title[locale],
      actionSummary: step.actionSummary[locale],
      xray: step.xray,
      verificationGate: step.verificationGate,
    })),
  };
}

export function buildHorizonSummaries(
  locale: Locale,
): ReadonlyArray<HorizonSummaryView> {
  return RAW_HORIZON_SUMMARIES.map((item) => ({
    horizon: item.horizon,
    badge: item.badge[locale],
    canonicalScope: item.canonicalScope[locale],
    description: item.description[locale],
    sourceGrounding: item.sourceGrounding,
    primaryNode: item.primaryNode,
  }));
}
