# GLOSSARY: Hivemind-* Ecosystem Portal (`hivemind-portal`)

Read this glossary before naming types, routes, UI badges, or showcase items. Every term maps directly to the authoritative contracts in `hivemind-steward-acp`, `freebuff-native`, and `hivemind-substrate`.

---

## 1. Maturity Horizons (`HorizonTier`)

- **`shipped` (`SHIPPED NOW · v0.1` / `ĐÃ PHÁT HÀNH · v0.1`):** Capabilities shipped in `hivemind-steward-acp` v0.1.0: `/devin` Hosted View, `delegate-devin` Native children (`ses_*`), comment-preserving `npx hmoc-steward-acp` installer, and `devin_run` / `devin_session`.
- **`next-release` (`NEXT RELEASE · v0.2` / `BẢN KẾ TIẾP · v0.2`):** Multi-harness expansion on the active Steward branch: shared `acp-session-core.ts`, `/devin` and `/antigravity` Hosted Views, `S6` origin-labelled `/` & `@` autocomplete, `S7` fenced live option switching (`ctrl+m`/`ctrl+e`/`ctrl+t`), `S8` rank-routed parallel delegation (`hivemind-delegate`) with 3-slot `ModelSlotChain`, and the 3rd-Harness candidate `freebuff-native` (`deepseek-4.1-flash` & `glm-5.3-flash`, OAuth browser login, Ed25519 device signing, rotated `fbm1....` handle recovery, `keepSlotForResume` pause continuity).
- **`roadmap` (`ROADMAP LAB · SUBSTRATE` / `PHÒNG LAB LỘ TRÌNH · SUBSTRATE`):** The 3-layer memory and context engine in `hivemind-substrate`: **The Spine**, **The Honeycomb**, and **Viewports & Working-Set Valve**.

---

## 2. Harnesses & Reactor Nodes (`ReactorNodeId`)

- **`devin` (`Devin ACP · swe-2-max`):** Autonomous engineering harness connected over JSON-RPC stdio (`devin acp`), supporting Hosted View (`/devin`) and Native child delegation (`delegate-devin`).
- **`antigravity` (`Antigravity ACP · argon-4-high`):** Architectural, visual, and multi-modal coding harness connected over ACP stdio (`/antigravity`), paired with Devin for cross-axis code review and 3D/UI synthesis.
- **`freebuff` (`Freebuff Candidate · glm-5.3-flash / deepseek-4.1-flash`):** High-velocity zero-cost/low-cost 3rd-Harness candidate (`freebuff-native`) with Ed25519 device-signed requests, rotated `fbm1....` model handle recovery on HTTP 409, and `keepSlotForResume` lease continuity.
- **`substrate` (`Hivemind Substrate · 3-Layer Memory`):** Hexagonal Honeycomb base under the Cyber-Wok reactor representing **The Spine** (`.session-archive/blobs/`), **The Honeycomb** (`index.sqlite`), and **Viewports & Working-Set Valve**.

---

## 3. Hivemind Substrate 3-Layer Memory Terms

- **The Spine (Layer 1 — Lossless Archive):** Content-addressed transcript blob store (`.session-archive/blobs/<sha256>.txt`) plus shadow Git working-tree drafts that survive session compaction or crash.
- **The Honeycomb (Layer 2 — Hybrid Index):** SQLite index (`index.sqlite`) combining BM25 + vector + graph edges across `SemanticSessionDigest`, `IntentPivot`, `DelegationTurn`, `ProvenanceChain`, AST symbol skeletons, PageRank `RepoMap`, and `git_cochange` coupling matrices.
- **Viewports & Working-Set Valve (Layer 3 — Surgical Context Delivery):** Pre-turn middleware that prunes stale tool outputs in `< 2 ms`, emits `< 1,200`-token `CompactionContinuationPacket` handoffs, and surfaces the `/substrate` Mudball Advisor.

---

## 4. Portal Architecture & UX Terms

- **`{CHINGCHONGCHINGVIBECODING}` ("Pro, Not Bro"):** The portal's bilingual cultural voice and engineering standard: playful, zero-headache developer camaraderie (`bro` clarity) backed by uncompromising deep-module architecture, boundary validation, and deterministic tests (`pro` execution).
- **`ThreeLayerXRay`:** The 3-step forensic breakdown attached to every showcase card:
  1. `humanPrompt`: Operator input in the OpenCode TUI.
  2. `orchestratorTool`: Structured plugin tool call or JSON-RPC frame.
  3. `engineExecution`: Underlying harness/substrate execution artifact and wire evidence.
- **`PassDownLesson`:** The bilingual architectural takeaway on every showcase card explaining the engineering principle behind the feature.
- **`ConversionBundle`:** Context-aware set of verified referral links (`Freebuff`, `Zap GLM`), supporter vaults (`Ko-fi`, `Buy Me a Coffee`), and B2B sponsor tiers resolved by `PartnerConversionModule`.
