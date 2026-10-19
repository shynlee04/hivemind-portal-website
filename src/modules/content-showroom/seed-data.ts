import type {
  ArticleDetail,
  EpisodeDetail,
  Locale,
} from "@/types/portal";

export const SEED_EPISODES: Readonly<Record<Locale, ReadonlyArray<EpisodeDetail>>> = {
  en: [
    {
      slug: "ep-01-what-if-opencode-used-every-agent",
      episodeNumber: 1,
      locale: "en",
      horizon: "shipped",
      duration: "04:12",
      title: "Bro, What If OpenCode Could Use Every AI Coding Agent?",
      subtitle:
        "From Horizon 1 Devin ACP MVP to Horizon 2 Tri-Harness orchestration inside a single OpenCode V2 terminal.",
      summary:
        "We launch a real Devin ACP session inside OpenCode V2 via npx hmoc-steward-acp, spawn a native child session (ses_*), and preview the Horizon 2 bridge into Antigravity and Freebuff.",
      publishedAt: "2026-10-15",
      featuredShowcases: ["S1", "S2", "S3", "S6"],
      youtubeTeaserTitle:
        "Bro, What If OpenCode Could Use Every AI Coding Agent? (Devin + Antigravity + Freebuff ACP)",
      architectureTakeaway:
        "One neutral ACP JSON-RPC stdio seam (acp-session-core.ts) lets OpenCode host interactive lanes and native child sessions without coupling UI state to subprocess lifecycles.",
      transcriptTurns: [
        {
          timestamp: "00:00",
          speaker: "Host (Steward Operator)",
          harness: "devin",
          text: "Everyone keeps tab-switching between four terminal windows. Watch what happens when we wire Devin ACP directly into OpenCode V2 with one command.",
          tuiCommand: "npx hmoc-steward-acp --scope project",
          tuiOutput:
            "[hmoc-steward-acp] Patched opencode.json (comments preserved) · Registered /devin & delegate-devin",
        },
        {
          timestamp: "01:14",
          speaker: "Devin ACP (swe-2-max)",
          harness: "devin",
          text: "Hosted lane /devin attaches over JSON-RPC stdio and learns the full session catalog on first handshake.",
          tuiCommand: "/devin Audit src/acp-session-core.ts for catalog merge invariants",
          tuiOutput:
            '{"jsonrpc":"2.0","method":"session/prompt","params":{"sessionId":"ses_01J9DEVINACP","model":"swe-2-max"}}',
        },
        {
          timestamp: "02:38",
          speaker: "Antigravity ACP (argon-4-high)",
          harness: "antigravity",
          text: "Now we cross into Horizon 2: origin-labelled @ mentions and /antigravity join the exact same ACP catalog core.",
          tuiCommand:
            "@hivemind-delegate --harness antigravity --model argon-4-high Verify 3D Cyber-Wok shader seams",
          tuiOutput:
            "[acp-session-core] Bound child ses_01J9AGYHIGH -> foreign acp_agy_8821 (mode: native, status: running)",
        },
      ],
    },
    {
      slug: "ep-02-tri-harness-greenfield-wok",
      episodeNumber: 2,
      locale: "en",
      horizon: "next-release",
      duration: "05:00",
      title: "The 5-Minute 3-Harness Greenfield Wok Build",
      subtitle:
        "Watching Freebuff (deepseek-4.1-flash / glm-5.3-flash), Devin (swe-2-max), and Antigravity (argon-4-high) ship a verified slice together.",
      summary:
        "Step-by-step replay of the flagship 5-minute Greenfield build using fenced live option switching (ctrl+m/ctrl+e/ctrl+t), rotated fbm1 handle recovery, and 3-slot ModelSlotChain routing.",
      publishedAt: "2026-10-17",
      featuredShowcases: ["S7", "S8", "S9", "S10"],
      youtubeTeaserTitle:
        "3 AI Harnesses, 1 Terminal: 5-Minute Greenfield Build with Freebuff, Devin & Antigravity",
      architectureTakeaway:
        "Rank-routed parallel delegation offloads high-velocity recon to Freebuff (deepseek-4.1-flash / glm-5.3-flash) while reserving Devin swe-2-max and Antigravity argon-4-high for deep seams and adversarial verification.",
      transcriptTurns: [
        {
          timestamp: "00:00",
          speaker: "Freebuff Scout (deepseek-4.1-flash)",
          harness: "freebuff",
          text: "Stage V1 starts on Freebuff with Ed25519 device-signed admission leases to map repository seams at zero frontier token burn.",
          tuiCommand:
            "hivemind-delegate --slot scout --model deepseek-4.1-flash Map public module seams",
          tuiOutput:
            "[freebuff-native] Lease active · handle fbm1.9a4c2e10 · Ed25519 signature verified · 5 module seams indexed",
        },
        {
          timestamp: "01:40",
          speaker: "Freebuff Builder (glm-5.3-flash)",
          harness: "freebuff",
          text: "When the catalog rotates fbm1 handles mid-turn (HTTP 409), freebuff-native re-fetches /api/v1/freebuff/models and replays transparently with keepSlotForResume.",
          tuiCommand:
            "session/set_config_option { configId: 'model', value: 'glm-5.3-flash', keepSlotForResume: true }",
          tuiOutput:
            "[targeted-request-broker] Fence acquired · Rotated fbm1.9a4c2e10 -> fbm1.c7710b44 · Confirmed config write",
        },
        {
          timestamp: "03:10",
          speaker: "Devin & Antigravity Duo (swe-2-max + argon-4-high)",
          harness: "antigravity",
          text: "Devin implements the boundary-validated domain module while Antigravity synthesizes the deterministic WebGL/SVG stage and runs cross-axis review.",
          tuiCommand: "bun test && bun run typecheck",
          tuiOutput:
            "[verify-gate] 100% pass across EN/VI parity, 3-Layer X-Ray contracts, and deterministic SVG fallback",
        },
      ],
    },
    {
      slug: "ep-03-substrate-spine-honeycomb-valve",
      episodeNumber: 3,
      locale: "en",
      horizon: "roadmap",
      duration: "06:18",
      title: "Inside Hivemind Substrate: The Spine, The Honeycomb & The < 2 ms Valve",
      subtitle:
        "How 3-layer memory eliminates context rot across 100-turn multi-harness coding marathons.",
      summary:
        "An architectural walkthrough of .session-archive/blobs/<sha256>.txt, index.sqlite hybrid BM25+vector+PageRank graphs, and the Working-Set Valve that prunes stale tool bloat in under 2 milliseconds.",
      publishedAt: "2026-10-19",
      featuredShowcases: ["M1", "M3", "M5", "M6", "M9", "C1"],
      youtubeTeaserTitle:
        "Zero Context Rot: How Hivemind Substrate Prunes Stale Agent Bloat in < 2 ms",
      architectureTakeaway:
        "Separating lossless content-addressed storage (The Spine) from hybrid graph indexing (The Honeycomb) lets the pre-turn Working-Set Valve prune 68%+ of stale tool tokens in under 2 ms with zero information loss.",
      transcriptTurns: [
        {
          timestamp: "00:00",
          speaker: "Substrate Archivist (The Spine)",
          harness: "substrate",
          text: "Every raw tool output and shadow Git working-tree draft is written to a content-addressed SHA-256 blob before any compaction occurs.", // taste-skill-ignore
          tuiCommand: "substrate archive inspect --latest",
          tuiOutput:
            "[The Spine] Stored .session-archive/blobs/8f91c4e2a7b0...txt (48.2 KB) + shadow git tree refs/substrate/drafts/ses_01J9", // taste-skill-ignore
        },
        {
          timestamp: "02:15",
          speaker: "Substrate Indexer (The Honeycomb)",
          harness: "substrate",
          text: "index.sqlite links SemanticSessionDigest, IntentPivot, DelegationTurn, and ProvenanceChain nodes with AST symbol skeletons and git_cochange coupling weights.",
          tuiCommand: "substrate query --pivot 'catalog-evidence' --graph-depth 2",
          tuiOutput:
            "[The Honeycomb] SQLite BM25+PageRank hit in 1.4 ms · Matched src/acp-session-core.ts (cochange: 0.91)",
        },
        {
          timestamp: "04:30",
          speaker: "Working-Set Valve (Layer 3)",
          harness: "substrate",
          text: "Before the next prompt fires, the Valve swaps stale 40 KB logs for compact blob pointers and emits a < 1,200-token CompactionContinuationPacket.",
          tuiCommand: "/substrate valve --budget-tokens 1200",
          tuiOutput:
            "[Working-Set Valve] Pruned 38,400 stale tokens in 1.62 ms · Emitted CompactionContinuationPacket (940 tokens)",
        },
      ],
    },
  ],
  vi: [
    {
      slug: "ep-01-what-if-opencode-used-every-agent",
      episodeNumber: 1,
      locale: "vi",
      horizon: "shipped",
      duration: "04:12",
      title: "Bro, Điều Gì Xảy Ra Nếu OpenCode Dùng Được Mọi AI Coding Agent?",
      subtitle:
        "Từ bản MVP Devin ACP ở Chân Trời 1 đến điều phối Tam-Harness ở Chân Trời 2 ngay trong một terminal OpenCode V2 duy nhất.",
      summary:
        "Chúng ta khởi chạy phiên Devin ACP thực tế trong OpenCode V2 qua npx hmoc-steward-acp, gọi tiến trình con nguyên bản (ses_*), và mở khóa cầu nối sang Antigravity cùng Freebuff.",
      publishedAt: "2026-10-15",
      featuredShowcases: ["S1", "S2", "S3", "S6"],
      youtubeTeaserTitle:
        "Bro, Điều Gì Xảy Ra Nếu OpenCode Điều Phối Mọi AI Coding Agent? (Devin + Antigravity + Freebuff ACP)",
      architectureTakeaway:
        "Một đường nối ACP JSON-RPC stdio trung lập duy nhất (acp-session-core.ts) giúp OpenCode vận hành cả khung TUI trực tiếp lẫn phiên con nguyên bản mà không làm rò rỉ trạng thái giao diện.",
      transcriptTurns: [
        {
          timestamp: "00:00",
          speaker: "Host (Steward Operator)",
          harness: "devin",
          text: "Anh em thường phải bật bốn cửa sổ terminal khác nhau. Hãy xem chuyện gì xảy ra khi gắn trực tiếp Devin ACP vào OpenCode V2 chỉ bằng một câu lệnh.",
          tuiCommand: "npx hmoc-steward-acp --scope project",
          tuiOutput:
            "[hmoc-steward-acp] Đã cập nhật opencode.json (bảo toàn chú thích) · Đã đăng ký /devin & delegate-devin",
        },
        {
          timestamp: "01:14",
          speaker: "Devin ACP (swe-2-max)",
          harness: "devin",
          text: "Làn /devin kết nối qua JSON-RPC stdio và tự động đồng bộ toàn bộ danh mục cấu hình ngay trong lần bắt tay đầu tiên.",
          tuiCommand: "/devin Kiểm tra các bất biến hợp nhất catalog trong src/acp-session-core.ts",
          tuiOutput:
            '{"jsonrpc":"2.0","method":"session/prompt","params":{"sessionId":"ses_01J9DEVINACP","model":"swe-2-max"}}',
        },
        {
          timestamp: "02:38",
          speaker: "Antigravity ACP (argon-4-high)",
          harness: "antigravity",
          text: "Bây giờ chúng ta bước sang Chân Trời 2: gợi ý @ gắn nhãn nguồn gốc và /antigravity cùng chạy trên một lõi ACP thống nhất.",
          tuiCommand:
            "@hivemind-delegate --harness antigravity --model argon-4-high Kiểm증 đường nối shader 3D Cyber-Wok",
          tuiOutput:
            "[acp-session-core] Đã gắn phiên con ses_01J9AGYHIGH -> acp_agy_8821 (chế độ: native, trạng thái: running)",
        },
      ],
    },
    {
      slug: "ep-02-tri-harness-greenfield-wok",
      episodeNumber: 2,
      locale: "vi",
      horizon: "next-release",
      duration: "05:00",
      title: "5 Phút Xây Mới Toàn Diện Với Lò Phản Ứng 3-Harness",
      subtitle:
        "Theo dõi Freebuff (deepseek-4.1-flash / glm-5.3-flash), Devin (swe-2-max) và Antigravity (argon-4-high) phối hợp xuất xưởng tính năng chuẩn chỉnh.",
      summary:
        "Tua lại từng bước quy trình 5 phút xây mới dự án bằng chuyển đổi cấu hình có rào chắn (ctrl+m/ctrl+e/ctrl+t), tự động khôi phục mã fbm1 xoay vòng, và chuỗi định tuyến 3 khe ModelSlotChain.",
      publishedAt: "2026-10-17",
      featuredShowcases: ["S7", "S8", "S9", "S10"],
      youtubeTeaserTitle:
        "3 AI Harness, 1 Terminal: 5 Phút Xây Mới Dự Án Với Freebuff, Devin & Antigravity",
      architectureTakeaway:
        "Điều phối song song theo cấp bậc giúp chuyển các tác vụ dò đường tốc độ cao sang Freebuff (deepseek-4.1-flash / glm-5.3-flash), dành trọn ngân sách Devin swe-2-max và Antigravity argon-4-high cho kiến trúc lõi và kiểm thử đối kháng.",
      transcriptTurns: [
        {
          timestamp: "00:00",
          speaker: "Freebuff Scout (deepseek-4.1-flash)",
          harness: "freebuff",
          text: "Giai đoạn V1 khởi đầu trên Freebuff với phiên ký thiết bị Ed25519 để lập bản đồ ranh giới mô-đun mà không tốn quota mô hình lớn.",
          tuiCommand:
            "hivemind-delegate --slot scout --model deepseek-4.1-flash Lập bản đồ các đường nối mô-đun",
          tuiOutput:
            "[freebuff-native] Phiên hoạt động · mã fbm1.9a4c2e10 · Chữ ký Ed25519 hợp lệ · Đã lập chỉ mục 5 mô-đun",
        },
        {
          timestamp: "01:40",
          speaker: "Freebuff Builder (glm-5.3-flash)",
          harness: "freebuff",
          text: "Khi máy chủ xoay vòng mã fbm1 giữa lượt chạy (HTTP 409), freebuff-native tự động tải lại /api/v1/freebuff/models và tiếp tục qua keepSlotForResume.",
          tuiCommand:
            "session/set_config_option { configId: 'model', value: 'glm-5.3-flash', keepSlotForResume: true }",
          tuiOutput:
            "[targeted-request-broker] Đã khóa hàng rào · Xoay mã fbm1.9a4c2e10 -> fbm1.c7710b44 · Xác nhận ghi cấu hình",
        },
        {
          timestamp: "03:10",
          speaker: "Bộ Đôi Devin & Antigravity (swe-2-max + argon-4-high)",
          harness: "antigravity",
          text: "Devin hoàn thiện mô-đun miền với kiểm chứng biên nghiêm ngặt trong khi Antigravity dựng sân khấu WebGL/SVG tất định và chạy kiểm duyệt chéo.",
          tuiCommand: "bun test && bun run typecheck",
          tuiOutput:
            "[verify-gate] Đạt 100% đồng bộ song ngữ EN/VI, hợp đồng X-Ray 3 tầng và SVG dự phòng tất định",
        },
      ],
    },
    {
      slug: "ep-03-substrate-spine-honeycomb-valve",
      episodeNumber: 3,
      locale: "vi",
      horizon: "roadmap",
      duration: "06:18",
      title: "Bên Trong Hivemind Substrate: The Spine, The Honeycomb & Van Lọc < 2 ms",
      subtitle:
        "Cách bộ nhớ 3 tầng xóa sổ hiện tượng thối rữa ngữ cảnh trong các phiên lập trình đa-harness kéo dài hàng trăm lượt.",
      summary:
        "Khám phá kiến trúc .session-archive/blobs/<sha256>.txt, đồ thị lai BM25+vector+PageRank trong index.sqlite, và Van Lọc Tập Làm Việc cắt gọn đầu ra công cụ cũ dưới 2 mili-giây.",
      publishedAt: "2026-10-19",
      featuredShowcases: ["M1", "M3", "M5", "M6", "M9", "C1"],
      youtubeTeaserTitle:
        "Không Còn Tràn Ngữ Cảnh: Cách Hivemind Substrate Cắt Gọn Rác Công Cụ Trong < 2 ms",
      architectureTakeaway:
        "Tách biệt kho lưu trữ nguyên vẹn theo địa chỉ nội dung (The Spine) khỏi chỉ mục đồ thị lai (The Honeycomb) giúp Van Lọc Tập Làm Việc cắt giảm hơn 68% token thừa dưới 2 ms mà không mất mát dữ liệu.",
      transcriptTurns: [
        {
          timestamp: "00:00",
          speaker: "Substrate Archivist (The Spine)",
          harness: "substrate",
          text: "Mọi kết quả công cụ thô và bản nháp cây làm việc Git ẩn đều được ghi vào blob SHA-256 bất biến trước khi bất kỳ bước nén nào diễn ra.",
          tuiCommand: "substrate archive inspect --latest",
          tuiOutput:
            "[The Spine] Đã lưu .session-archive/blobs/8f91c4e2a7b0...txt (48.2 KB) + nhánh nháp refs/substrate/drafts/ses_01J9",
        },
        {
          timestamp: "02:15",
          speaker: "Substrate Indexer (The Honeycomb)",
          harness: "substrate",
          text: "index.sqlite liên kết các nút SemanticSessionDigest, IntentPivot, DelegationTurn và ProvenanceChain cùng bộ khung AST và trọng số đồng thay đổi git_cochange.",
          tuiCommand: "substrate query --pivot 'catalog-evidence' --graph-depth 2",
          tuiOutput:
            "[The Honeycomb] Truy vấn SQLite BM25+PageRank trong 1.4 ms · Khớp src/acp-session-core.ts (cochange: 0.91)",
        },
        {
          timestamp: "04:30",
          speaker: "Working-Set Valve (Tầng 3)",
          harness: "substrate",
          text: "Trước lượt nhắc tiếp theo, Van Lọc thay thế các bản log 40 KB cũ bằng con trỏ blob gọn nhẹ và xuất gói CompactionContinuationPacket dưới 1.200 token.",
          tuiCommand: "/substrate valve --budget-tokens 1200",
          tuiOutput:
            "[Working-Set Valve] Đã cắt gọn 38.400 token cũ trong 1.62 ms · Xuất CompactionContinuationPacket (940 token)",
        },
      ],
    },
  ],
};

export const SEED_ARTICLES: Readonly<Record<Locale, ReadonlyArray<ArticleDetail>>> = {
  en: [
    {
      slug: "three-horizon-ecosystem-architecture",
      locale: "en",
      horizon: "shipped",
      readingTime: "6 min read",
      title: "The 3-Horizon Hivemind Architecture: Honest Engineering Without Vaporware",
      subtitle:
        "Why we stamp every capability as Shipped v0.1, Next Release v0.2, or Roadmap Lab Substrate, and back each claim with a 3-Layer X-Ray.",
      excerpt:
        "Most AI devtool portals blur shipped code with aspirational slides. Here is how Hivemind separates Shipped Devin ACP, Next-Release Tri-Harness Steward, and Roadmap Substrate memory.",
      publishedAt: "2026-10-14",
      authorRole: "Principal Systems Architect · Hivemind Core",
      tags: ["architecture", "acp", "opencode", "steward"],
      proNotBroTakeaway:
        "Pro, Not Bro means never faking runtime capabilities: every UI badge maps to an explicit repository contract, wire frame, and deterministic test gate.",
      sections: [
        {
          heading: "1. Why Three Explicit Maturity Horizons?",
          bodyParagraphs: [
            "Developer trust evaporates when a landing page markets roadmap concepts as already installed CLI flags. In the Hivemind ecosystem, every showcase slice, reactor node, and episode carries a strict HorizonTier badge.",
            "Horizon 1 (shipped) covers the production Devin ACP Steward MVP. Horizon 2 (next-release) covers the multi-harness branch uniting Devin, Antigravity, and Freebuff behind acp-session-core.ts. Horizon 3 (roadmap) covers the 3-layer Hivemind Substrate memory engine.",
          ],
          codeSnippet: {
            caption: "Shared ACP catalog learn & confirmed write seam (src/acp-session-core.ts)",
            code: `export interface ConfirmedConfigWrite {
  readonly sessionId: string;
  readonly configId: "mode" | "model" | "thought_level";
  readonly requestedValue: string;
  readonly confirmedValue: string;
  readonly stampedAtIso: string;
}`,
          },
        },
        {
          heading: "2. The 3-Layer X-Ray Verification Standard",
          bodyParagraphs: [
            "Every claim on the portal opens into a ThreeLayerXRay drawer: Layer 1 shows the exact operator prompt in OpenCode TUI; Layer 2 shows the structured orchestrator tool call or JSON-RPC payload; Layer 3 exposes the engine execution trace.",
            "By binding product copy directly to real session identifiers (ses_*), rotated Freebuff handles (fbm1....), and SHA-256 blob paths, engineers can audit how the system behaves before running a single command.",
          ],
        },
      ],
    },
    {
      slug: "fenced-live-switching-and-freebuff-leases",
      locale: "en",
      horizon: "next-release",
      readingTime: "8 min read",
      title: "Fenced Live Option Switching & Freebuff Lease Continuity Under Load",
      subtitle:
        "How TargetedRequestBroker and freebuff-native prevent race conditions during live model switches and HTTP 409 handle rotations.",
      excerpt:
        "Switching models or reasoning effort mid-session is notorious for corrupting optimistic UI state. Dive into our fenced JSON-RPC broker and Ed25519 Freebuff lease recovery.",
      publishedAt: "2026-10-16",
      authorRole: "Staff Protocol Engineer · Multi-Harness Steward",
      tags: ["freebuff", "json-rpc", "concurrency", "ed25519"],
      proNotBroTakeaway:
        "Never mutate session state optimistically on keystroke; serialize config writes through a per-session fence and commit only when the foreign harness echoes confirmation.",
      sections: [
        {
          heading: "1. Serializing ctrl+m / ctrl+e / ctrl+t with TargetedRequestBroker",
          bodyParagraphs: [
            "When an operator cycles model slots (ctrl+m) or thought levels (ctrl+e) inside the TUI, concurrent session/set_config_option frames can interleave with active prompt streams.",
            "TargetedRequestBroker enforces a single in-flight mutation fence per foreign session ID, queuing subsequent changes and rolling back cleanly if the foreign ACP server rejects a transition.",
          ],
          codeSnippet: {
            caption: "Fenced config mutation wire frame over ACP stdio",
            code: `{"jsonrpc":"2.0","id":42,"method":"session/set_config_option","params":{"sessionId":"ses_01J9STEWARD","configId":"model","value":"glm-5.3-flash"}}`,
          },
        },
        {
          heading: "2. Ed25519 Device Signing & Rotated fbm1 Handle Recovery",
          bodyParagraphs: [
            "The 3rd-Harness candidate freebuff-native pairs high-speed models (deepseek-4.1-flash and glm-5.3-flash) with cryptographic request signing and admission leases.",
            "When the upstream catalog rotates opaque fbm1.... model handles and returns HTTP 409, the adapter refreshes /api/v1/freebuff/models, resolves the updated handle, and preserves the active slot via keepSlotForResume without dropping the parent OpenCode turn.",
          ],
        },
      ],
    },
    {
      slug: "inside-hivemind-substrate-memory-engine",
      locale: "en",
      horizon: "roadmap",
      readingTime: "9 min read",
      title: "Inside Hivemind Substrate: The Spine, The Honeycomb, and < 2 ms Context Pruning",
      subtitle:
        "Designing a 3-layer architectural memory engine that keeps multi-agent working sets lean without losing a single byte of provenance.",
      excerpt:
        "Long-running agent sessions fail when raw grep outputs and stale file dumps crowd out reasoning capacity. Here is how Hivemind Substrate solves context bloat.",
      publishedAt: "2026-10-18",
      authorRole: "Lead Storage & Graph Engineer · Hivemind Substrate",
      tags: ["substrate", "sqlite", "pagerank", "context-valve"],
      proNotBroTakeaway:
        "Context windows are working memory, not cold storage. Keep immutable blobs in The Spine, index relationships in The Honeycomb, and prune working sets in under 2 ms.",
      sections: [
        {
          heading: "1. Layer 1 (The Spine) & Layer 2 (The Honeycomb)",
          bodyParagraphs: [
            "The Spine writes every raw transcript turn and tool payload to .session-archive/blobs/<sha256>.txt alongside shadow Git checkpoints so zero forensic evidence is ever discarded.", // taste-skill-ignore
            "The Honeycomb indexes those turns into index.sqlite, combining BM25 full-text search, vector embeddings, AST symbol skeletons, PageRank RepoMap scores, and git_cochange coupling matrices.",
          ],
          codeSnippet: {
            caption: "CompactionContinuationPacket schema emitted by the Working-Set Valve",
            code: `export interface CompactionContinuationPacket {
  readonly sessionId: string;
  readonly tokenCount: number; // strictly < 1200 tokens
  readonly activeIntentPivot: string;
  readonly spineBlobRefs: ReadonlyArray<string>;
  readonly cochangeHotspots: ReadonlyArray<string>;
}`,
          },
        },
        {
          heading: "2. Layer 3: Viewports & The < 2 ms Working-Set Valve",
          bodyParagraphs: [
            "Before each model invocation, the Working-Set Valve inspects the active turn window, replaces superseded tool outputs with lightweight Spine pointers, and guarantees a < 1,200-token CompactionContinuationPacket across session compactions.",
            "Paired with the /substrate Mudball Advisor, engineers get real-time warnings whenever git_cochange coupling spikes across module boundaries.",
          ],
        },
      ],
    },
  ],
  vi: [
    {
      slug: "three-horizon-ecosystem-architecture",
      locale: "vi",
      horizon: "shipped",
      readingTime: "6 phút đọc",
      title: "Kiến Trúc Hệ Sinh Thái 3 Chân Trời: Kỹ Thuật Thực Chiến, Không Bán Bánh Vẽ",
      subtitle:
        "Vì sao chúng tôi gắn nhãn rõ ràng Đã Phát Hành v0.1, Bản Kế Tiếp v0.2 và Phòng Lab Lộ Trình Substrate, kèm giải phẫu X-Ray 3 tầng cho từng tính năng.",
      excerpt:
        "Nhiều cổng thông tin công cụ AI đánh tráo giữa tính năng đã chạy thật và ý tưởng trên giấy. Đây là cách Hivemind phân tách minh bạch 3 chân trời trưởng thành.",
      publishedAt: "2026-10-14",
      authorRole: "Kiến Trúc Sư Hệ Thống Chính · Hivemind Core",
      tags: ["architecture", "acp", "opencode", "steward"],
      proNotBroTakeaway:
        "Pro, Not Bro nghĩa là không bao giờ làm màu về khả năng vận hành: mỗi huy hiệu trên giao diện đều ánh xạ tới hợp đồng mã nguồn, gói tin thực tế và cổng kiểm thử tất định.",
      sections: [
        {
          heading: "1. Vì Sao Cần Ba Chân Trời Trưởng Thành Rõ Ràng?",
          bodyParagraphs: [
            "Niềm tin của lập trình viên sẽ biến mất khi trang giới thiệu quảng cáo các ý tương lai như thể câu lệnh CLI đã có sẵn. Trong hệ sinh thái Hivemind, mọi thẻ trình diễn, nút lò phản ứng và tập phát sóng đều mang huy hiệu HorizonTier minh bạch.",
            "Chân Trời 1 (shipped) bao gồm bản MVP Devin ACP Steward đã xuất xưởng. Chân Trời 2 (next-release) mở rộng sang nhánh đa-harness hợp nhất Devin, Antigravity và Freebuff qua acp-session-core.ts. Chân Trời 3 (roadmap) trình bày bộ nhớ 3 tầng Hivemind Substrate.",
          ],
          codeSnippet: {
            caption: "Đường nối xác nhận ghi cấu hình ACP dùng chung (src/acp-session-core.ts)",
            code: `export interface ConfirmedConfigWrite {
  readonly sessionId: string;
  readonly configId: "mode" | "model" | "thought_level";
  readonly requestedValue: string;
  readonly confirmedValue: string;
  readonly stampedAtIso: string;
}`,
          },
        },
        {
          heading: "2. Tiêu Chuẩn Kiểm Chứng Giải Phẫu X-Ray 3 Tầng",
          bodyParagraphs: [
            "Mọi tuyên bố kỹ thuật trên cổng thông tin đều đi kèm ngăn kéo ThreeLayerXRay: Tầng 1 hiển thị câu lệnh thực tế trong OpenCode TUI; Tầng 2 hiển thị khung gọi công cụ hoặc JSON-RPC; Tầng 3 phơi bày dấu vết thực thi từ bộ máy bên dưới.",
            "Nhờ gắn kết nội dung trình diễn với mã phiên thực (ses_*), mã mô hình Freebuff xoay vòng (fbm1....) và đường dẫn blob SHA-256, kỹ sư có thể kiểm chứng hệ thống ngay lập tức.",
          ],
        },
      ],
    },
    {
      slug: "fenced-live-switching-and-freebuff-leases",
      locale: "vi",
      horizon: "next-release",
      readingTime: "8 phút đọc",
      title: "Chuyển Đổi Cấu Hình Có Rào Chắn & Duy Trì Phiên Freebuff Dưới Tải Cao",
      subtitle:
        "Cách TargetedRequestBroker và freebuff-native ngăn chặn xung đột trạng thái khi đổi mô hình trực tiếp và tự phục hồi khi mã fbm1 xoay vòng (HTTP 409).",
      excerpt:
        "Đổi mô hình hoặc mức suy luận giữa phiên chạy rất dễ làm lệch trạng thái giao diện. Cùng mổ xẻ bộ điều phối JSON-RPC có rào chắn và cơ chế chữ ký Ed25519 của Freebuff.",
      publishedAt: "2026-10-16",
      authorRole: "Kỹ Sư Giao Thức Cấp Cao · Multi-Harness Steward",
      tags: ["freebuff", "json-rpc", "concurrency", "ed25519"],
      proNotBroTakeaway:
        "Không bao giờ cập nhật trạng thái phiên một cách lạc quan ngay khi bấm phím; hãy tuần tự hóa lệnh ghi qua rào chắn từng phiên và chỉ chốt khi harness phản hồi xác nhận.",
      sections: [
        {
          heading: "1. Tuần Tự Hóa Phím Tắt ctrl+m / ctrl+e / ctrl+t Với TargetedRequestBroker",
          bodyParagraphs: [
            "Khi người vận hành chuyển đổi khe mô hình (ctrl+m) hoặc mức độ suy luận (ctrl+e) trong TUI, các gói tin session/set_config_option đồng thời có thể xen ngang luồng phản hồi đang chạy.",
            "TargetedRequestBroker thiết lập rào chắn một lệnh đột biến duy nhất trên mỗi mã phiên ngoại biên, xếp hàng các thay đổi tiếp theo và khôi phục an toàn nếu máy chủ ACP từ chối.",
          ],
          codeSnippet: {
            caption: "Khung JSON-RPC đột biến cấu hình có rào chắn qua ACP stdio",
            code: `{"jsonrpc":"2.0","id":42,"method":"session/set_config_option","params":{"sessionId":"ses_01J9STEWARD","configId":"model","value":"glm-5.3-flash"}}`,
          },
        },
        {
          heading: "2. Chữ Ký Thiết Bị Ed25519 & Khôi Phục Mã Mô Hình fbm1 Xoay Vòng",
          bodyParagraphs: [
            "Ứng viên Harness thứ 3 freebuff-native kết hợp các mô hình tốc độ cao (deepseek-4.1-flash và glm-5.3-flash) với chữ ký mật mã Ed25519 và hợp đồng thuê phiên.",
            "Khi danh mục máy chủ xoay vòng mã fbm1.... và trả về HTTP 409, bộ chuyển đổi tự động làm mới /api/v1/freebuff/models, ánh xạ mã mới và giữ nguyên khe chạy qua keepSlotForResume mà không làm đứt lượt hội thoại OpenCode.",
          ],
        },
      ],
    },
    {
      slug: "inside-hivemind-substrate-memory-engine",
      locale: "vi",
      horizon: "roadmap",
      readingTime: "9 phút đọc",
      title: "Bên Trong Hivemind Substrate: The Spine, The Honeycomb & Van Lọc Ngữ Cảnh < 2 ms",
      subtitle:
        "Thiết kế bộ máy bộ nhớ kiến trúc 3 tầng giúp tập làm việc đa tác tử luôn gọn nhẹ mà không đánh rơi một byte lịch sử nguồn gốc nào.",
      excerpt:
        "Các phiên chạy tác tử dài hơi thường sụp đổ khi kết quả tìm kiếm thô và nội dung tệp cũ lấp đầy cửa sổ ngữ cảnh. Đây là lời giải của Hivemind Substrate.",
      publishedAt: "2026-10-18",
      authorRole: "Kỹ Sư Trưởng Lưu Trữ & Đồ Thị · Hivemind Substrate",
      tags: ["substrate", "sqlite", "pagerank", "context-valve"],
      proNotBroTakeaway:
        "Cửa sổ ngữ cảnh là bộ nhớ làm việc, không phải kho chứa lạnh. Hãy lưu blob bất biến ở The Spine, lập chỉ mục quan hệ ở The Honeycomb và lọc gọn tập làm việc dưới 2 ms.",
      sections: [
        {
          heading: "1. Tầng 1 (The Spine) & Tầng 2 (The Honeycomb)",
          bodyParagraphs: [
            "The Spine ghi lại toàn bộ lượt hội thoại thô và kết quả công cụ vào .session-archive/blobs/<sha256>.txt cùng các điểm chốt Git ẩn để bảo toàn 100% bằng chứng pháp y.",
            "The Honeycomb lập chỉ mục các lượt chạy đó vào index.sqlite, kết hợp tìm kiếm toàn văn BM25, vector ngữ nghĩa, bộ khung ký hiệu AST, điểm PageRank RepoMap và ma trận đồng thay đổi git_cochange.",
          ],
          codeSnippet: {
            caption: "Cấu trúc gói CompactionContinuationPacket được xuất bởi Van Lọc Tập Làm Việc",
            code: `export interface CompactionContinuationPacket {
  readonly sessionId: string;
  readonly tokenCount: number; // luôn < 1200 tokens
  readonly activeIntentPivot: string;
  readonly spineBlobRefs: ReadonlyArray<string>;
  readonly cochangeHotspots: ReadonlyArray<string>;
}`,
          },
        },
        {
          heading: "2. Tầng 3: Viewports & Van Lọc Tập Làm Việc < 2 ms",
          bodyParagraphs: [
            "Trước mỗi lần gọi mô hình, Van Lọc Tập Làm Việc kiểm tra cửa sổ lượt chạy hiện hành, thay thế các đầu ra công cụ đã lỗi thời bằng con trỏ Spine siêu nhẹ, và đảm bảo gói CompactionContinuationPacket luôn dưới 1.200 token.",
            "Kết hợp cùng cố vấn /substrate Mudball Advisor, kỹ sư nhận được cảnh báo tức thời mỗi khi độ kết dính git_cochange vượt ngưỡng an toàn giữa các mô-đun.",
          ],
        },
      ],
    },
  ],
};
