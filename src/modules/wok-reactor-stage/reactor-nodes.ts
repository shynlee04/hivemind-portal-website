import type {
  Locale,
  ReactorNodeDescriptor,
  ReactorNodeId,
} from "../../types/portal";

export const REACTOR_NODE_IDS: ReadonlyArray<ReactorNodeId> = [
  "devin",
  "antigravity",
  "freebuff",
  "substrate",
] as const;

const REACTOR_NODE_TABLE: Readonly<
  Record<Locale, Readonly<Record<ReactorNodeId, ReactorNodeDescriptor>>>
> = {
  en: {
    devin: {
      id: "devin",
      label: "Devin ACP Steward",
      roleBadge: "HARNESS 01 / AUTONOMOUS SWE",
      modelIds: ["swe-2-max"],
      horizon: "shipped",
      horizonBadge: "[SHIPPED / v0.1]",
      accentHex: "#F5A623",
      wireProtocol: "ACP JSON-RPC 2.0 over stdio (ndjson)",
      description:
        "Live /devin Hosted View and native delegate-devin child sessions (ses_*) with deterministic crash reconcile and fenced permission mediation.",
      sampleCommand: "/devin / delegate-devin --model swe-2-max",
      telemetryMetrics: [
        { label: "Session Handle", value: "ses_* (Owned Child Ledger)" },
        { label: "Primary Engine", value: "swe-2-max (#max effort)" },
        { label: "Wire Seam", value: "JSON-RPC 2.0 stdio ndjson" },
      ],
    },
    antigravity: {
      id: "antigravity",
      label: "Antigravity ACP Bridge",
      roleBadge: "HARNESS 02 / DEEP ARCHITECT",
      modelIds: ["argon-4-high"],
      horizon: "next-release",
      horizonBadge: "[NEXT / v0.2]",
      accentHex: "#22D3EE",
      wireProtocol: "ACP Server Bridge + Origin-Labelled @Mentions",
      description:
        "Independent Agy ACP server identity with S6 origin-labelled / & @ autocomplete and S7 fenced live option switching (ctrl+m / ctrl+e / ctrl+t).",
      sampleCommand: "/antigravity / hivemind-delegate --slot architect",
      telemetryMetrics: [
        { label: "Primary Engine", value: "argon-4-high" },
        { label: "Live Controls", value: "ctrl+m / ctrl+e / ctrl+t" },
        { label: "Review Posture", value: "2-Axis Spec & Standards" },
      ],
    },
    freebuff: {
      id: "freebuff",
      label: "Freebuff 3rd-Harness",
      roleBadge: "HARNESS 03 / HIGH-THROUGHPUT RECON",
      modelIds: ["glm-5.3-flash", "deepseek-4.1-flash"],
      horizon: "next-release",
      horizonBadge: "[NEXT / v0.2]",
      accentHex: "#10B981",
      wireProtocol: "Ed25519 Signed Admission Lease + Rotated fbm1 Handle",
      description:
        "Zero-bloat recon and fast TDD loops powered by glm-5.3-flash and deepseek-4.1-flash with automatic rotated fbm1.... handle recovery and keepSlotForResume.",
      sampleCommand: "hivemind-delegate --harness freebuff --keep-slot",
      telemetryMetrics: [
        { label: "Model Pair", value: "glm-5.3-flash / deepseek-4.1-flash" },
        { label: "Handle Recovery", value: "Rotated fbm1.... Rebind" },
        { label: "Pause Lease", value: "keepSlotForResume Active" },
      ],
    },
    substrate: {
      id: "substrate",
      label: "Hivemind Substrate Core",
      roleBadge: "MEMORY ENGINE / 3-LAYER HONEYCOMB",
      modelIds: ["The Spine", "The Honeycomb", "Working-Set Valve"],
      horizon: "roadmap",
      horizonBadge: "[ROADMAP / SUBSTRATE]",
      accentHex: "#EF4444",
      wireProtocol: "SQLite WAL + Tree-sitter AST + PageRank RepoMap",
      description:
        "Lossless .session-archive/blobs/<sha256>.txt Spine, hybrid SQLite + AST + PageRank Honeycomb index, and < 2 ms Working-Set Valve context pruning.",
      sampleCommand: "/substrate / substrate_prune --budget 1200",
      telemetryMetrics: [
        { label: "Valve Latency", value: "< 2 ms Surgical Prune" },
        { label: "Continuation Packet", value: "< 1,200 Tokens" },
        { label: "Blob Archive", value: ".session-archive/blobs/<sha256>.txt" },
      ],
    },
  },
  vi: {
    devin: {
      id: "devin",
      label: "Điều phối viên Devin ACP",
      roleBadge: "HARNESS 01 / KỸ SƯ TỰ HÀNH",
      modelIds: ["swe-2-max"],
      horizon: "shipped",
      horizonBadge: "[ĐÃ PHÁT HÀNH / v0.1]",
      accentHex: "#F5A623",
      wireProtocol: "ACP JSON-RPC 2.0 qua stdio (ndjson)",
      description:
        "Khung nhìn Hosted /devin trực tiếp và phiên con delegate-devin (ses_*) với khả năng phục hồi sự cố tất định và kiểm duyệt quyền hạn có rào chắn.",
      sampleCommand: "/devin / delegate-devin --model swe-2-max",
      telemetryMetrics: [
        { label: "Định danh phiên", value: "ses_* (Sổ cái phiên con)" },
        { label: "Mô hình chính", value: "swe-2-max (nỗ lực #max)" },
        { label: "Đường truyền", value: "JSON-RPC 2.0 stdio ndjson" },
      ],
    },
    antigravity: {
      id: "antigravity",
      label: "Cầu nối Antigravity ACP",
      roleBadge: "HARNESS 02 / KIẾN TRÚC SƯ SÂU",
      modelIds: ["argon-4-high"],
      horizon: "next-release",
      horizonBadge: "[BẢN KẾ TIẾP / v0.2]",
      accentHex: "#22D3EE",
      wireProtocol: "Cầu nối máy chủ ACP + Gợi ý @Mentions gắn nhãn nguồn",
      description:
        "Định danh máy chủ Agy ACP độc lập với tự động hoàn thành / & @ gắn nhãn nguồn (S6) và chuyển đổi cấu hình trực tiếp có rào chắn (S7: ctrl+m / ctrl+e / ctrl+t).",
      sampleCommand: "/antigravity / hivemind-delegate --slot architect",
      telemetryMetrics: [
        { label: "Mô hình chính", value: "argon-4-high" },
        { label: "Phím tắt trực tiếp", value: "ctrl+m / ctrl+e / ctrl+t" },
        { label: "Tư thế kiểm duyệt", value: "2 trục Spec & Standards" },
      ],
    },
    freebuff: {
      id: "freebuff",
      label: "Harness thứ 3 Freebuff",
      roleBadge: "HARNESS 03 / TRINH SÁT TỐC ĐỘ CAO",
      modelIds: ["glm-5.3-flash", "deepseek-4.1-flash"],
      horizon: "next-release",
      horizonBadge: "[BẢN KẾ TIẾP / v0.2]",
      accentHex: "#10B981",
      wireProtocol: "Thuê bao ký số Ed25519 + Xoay vòng định danh fbm1",
      description:
        "Trinh sát không rác ngữ cảnh và vòng lặp TDD tốc độ cao cùng glm-5.3-flash và deepseek-4.1-flash, tự động khôi phục thẻ fbm1.... xoay vòng và keepSlotForResume.",
      sampleCommand: "hivemind-delegate --harness freebuff --keep-slot",
      telemetryMetrics: [
        { label: "Cặp mô hình", value: "glm-5.3-flash / deepseek-4.1-flash" },
        { label: "Khôi phục thẻ", value: "Tự động nối lại fbm1...." },
        { label: "Giữ chỗ tạm dừng", value: "keepSlotForResume Bật" },
      ],
    },
    substrate: {
      id: "substrate",
      label: "Lõi bộ nhớ Hivemind Substrate",
      roleBadge: "ĐỘNG CƠ BỘ NHỚ / TỔ ONG 3 TẦNG",
      modelIds: ["The Spine", "The Honeycomb", "Working-Set Valve"],
      horizon: "roadmap",
      horizonBadge: "[PHÒNG LAB LỘ TRÌNH / SUBSTRATE]",
      accentHex: "#EF4444",
      wireProtocol: "SQLite WAL + Cây cú pháp AST + PageRank RepoMap",
      description:
        "Kho lưu trữ nguyên vẹn .session-archive/blobs/<sha256>.txt (The Spine), chỉ mục lai SQLite + AST + PageRank (The Honeycomb) và van cắt tỉa ngữ cảnh < 2 ms (Working-Set Valve).",
      sampleCommand: "/substrate / substrate_prune --budget 1200",
      telemetryMetrics: [
        { label: "Độ trễ van", value: "< 2 ms cắt tỉa chính xác" },
        { label: "Gói tiếp nối", value: "< 1.200 Token" },
        { label: "Kho lưu trữ Blob", value: ".session-archive/blobs/<sha256>.txt" },
      ],
    },
  },
};

export const REACTOR_NODES: ReadonlyArray<ReactorNodeDescriptor> = [
  REACTOR_NODE_TABLE.en.devin,
  REACTOR_NODE_TABLE.en.antigravity,
  REACTOR_NODE_TABLE.en.freebuff,
  REACTOR_NODE_TABLE.en.substrate,
];

export function getReactorNodeMetadata(
  id: ReactorNodeId,
  locale: Locale = "en"
): ReactorNodeDescriptor {
  const tableForLocale = REACTOR_NODE_TABLE[locale] ?? REACTOR_NODE_TABLE.en;
  return tableForLocale[id] ?? REACTOR_NODE_TABLE.en.devin;
}
