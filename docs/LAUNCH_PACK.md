# Stage 1 Social & Community Launch Pack (`Hivemind-Steward` & `Hivemind-Substrate`)

## 1. Core Positioning (Why `Hivemind-Steward` Exists on Top of OpenCode V2)
- **What OpenCode Already Does:** OpenCode natively connects **127+ AI API providers** and supports built-in **multi-account switching** per provider.
- **What OpenCode Cannot Do Alone (The True Pain):** Frontier labs and coding-pass providers (**Devin**, **Antigravity**, **Freebuff**, and upcoming **Cursor**, **Claude Code**, **Codex**) lock their exclusive models (`swe-2-max`, `argon-4-high`, Freebuff daily free AI) and their best promo tiers (like a `$20` Devin `swe-2` promo package) inside their own proprietary harness/CLI/IDE.
- **How `Hivemind-Steward` (`npx hmoc-steward-acp`) Solves It With Zero UX Compromise:**
  1. **Native Hosted TUI Surface (`/devin`, `/antigravity`):** Control the foreign harness right from OpenCode's main menu with the exact same OpenCode look-and-feel, `/` and `@` autocomplete, permission prompts, and live option switching (`ctrl+m` / `ctrl+e` / `ctrl+t`).
  2. **Foreign Harness Model as Native OpenCode Main Agent:** Run any model from `Devin`, `Antigravity`, or `Freebuff` as your native OpenCode main-session agent, delegating subagents across **other foreign harnesses AND OpenCode's 127+ official API providers**, with **bi-directional main-session synchronization** so you can resume in either OpenCode or the host harness.
  3. **Shared Native Child Sessions (`ses_*`) for Token & Promo Squeezing:** When `Antigravity`, `Devin`, or `Freebuff` run as subagents, Steward binds them as real shared child sessions surfaced as main sessions in the foreign harness UI so humans can reuse warm repo context and squeeze every drop from `$20` Devin `swe-2` promos or **Freebuff** daily free AI credits (`keepSlotForResume` + automatic `fbm1....` rotated handle recovery).
- **Stage 3 Roadmap (`Hivemind-Substrate` — https://youtu.be/tgTFweV7bLo):**
  - **The Spine (`E1.1`):** Saves every prompt, full untruncated tool/shell output (`.session-archive/blobs/<sha256>.txt`), foreign `ses_*` bindings, and shadow Git drafts before OpenCode's 7-day GC wipes them.
  - **The Honeycomb (`E1.2`):** Separates `Reported` vs `Verified` child outcomes (catching 100% of fake `"succeeded"` runs) and indexes a 4-tier AST graph in `index.sqlite` in `0.21 ms` (`< 1,000`-token PageRank RepoMap, Depth-2 closure-factory AST skeletons cutting 89% tokens, and Git co-change alerts).
  - **Working-Set Valve (`E1.3`):** Swaps stale tool dumps mid-turn for `blob:<sha12>` `"FRESH — DO NOT REREAD"` breadcrumbs in `< 2 ms` and builds a `< 1,200`-token continuation packet on compaction.

---

## 2. Ready-to-Paste YouTube Description & Pinned Comment (EN + VI)

### `{CHINGCHONGCHINGVIBECODING}` — The 3-Harness Wok Brigade (`Devin` + `Antigravity` + `Freebuff` Candidate)
Watch how a **Pro (Not Bro) Vibecoder** builds a complete Greenfield Next.js + Three.js 3D Multi-Page & Backend App inside OpenCode V2 using `npx hmoc-steward-acp` across 3 Harnesses:
- **Antigravity (`argon-4-high`)**: 3D Three.js spatial design & shader architecture
- **Devin (`swe-2-max`)**: Multi-page App Router implementation & backend tickets via shared `ses_*` child sessions
- **Freebuff (`deepseek-4.1-flash` & `glm-5.3-flash`)**: `$0` daily-credit swarm research & live mid-session model swap (`keepSlotForResume` + `fbm1....` handle recovery)
- **Roadmap Stage 3 (`Hivemind-Substrate`)**: https://youtu.be/tgTFweV7bLo

### Grab Your Free Credits & Coding Plans (Referral Links / Link Đăng Ký Nhận Ưu Đãi):
- **Freebuff (100% Free Coding Agent + Daily Credits)**: https://freebuff.com/?ref=ref-6c980d54-a29a-4270-a160-35f13e62a2ff
- **Zap GLM (High-Speed GLM Coding Subscription)**: https://z.ai/subscribe?ic=LTWUT4H2RS

### Fuel the Hivemind Build (Ủng Hộ Tác Giả):
- **Ko-fi**: https://ko-fi.com/shynlee04
- **Buy Me a Coffee**: https://buymeacoffee.com/shynlee04l

---

## 3. Ready-to-Post Reddit / Discord / GitHub Announcement (EN + VI)

**Available now on npm (https://www.npmjs.com/package/hmoc-steward-acp) — install in one command:**
```sh
npx hmoc-steward-acp
```

- **EN:** OpenCode already connects 127+ API providers — `Hivemind-Steward` breaks **harness-locked models & coding passes** (`Devin`, `Antigravity`, `Freebuff`). Mount `/devin` and `/antigravity` directly on OpenCode's main menu, run foreign harness models as native OpenCode main agents delegating across 127+ providers, and reuse shared `ses_*` child sessions in the host harness to squeeze `$20` `swe-2` promos and Freebuff's free daily AI credits.
- **VI:** OpenCode đã nối sẵn 127+ API provider — `Hivemind-Steward` mở khóa các **model và gói cước bị khóa cứng theo từng Harness** (`Devin`, `Antigravity`, `Freebuff`). Điều khiển `/devin` và `/antigravity` ngay trên menu chính OpenCode, dùng model ngoại làm agent chính điều phối cả 127+ provider, tái sử dụng phiên con `ses_*` dùng chung để vắt kiệt gói promo `$20` Devin `swe-2` và nhận credit AI miễn phí mỗi ngày từ Freebuff!
