# SPEC: Hivemind-* Ecosystem Portal & Multi-Harness Showroom (`hivemind-portal`)

> **Status:** `active`
> **Stage 1 Target:** Next.js 15 App Router + Three.js 3D Cyber-Wok + Bilingual (`en` / `vi`) Static/JSON Dictionary + 20-Clip 3-Layer X-Ray Explorer + 3-Audience Conversion Hub
> **Stage 2 Target:** Payload CMS 3.0 Local API + Localized Blog/Episode Collections + Interactive Component Showroom (`ShowcaseHarness` + Storybook 8)

---

## 1. Overview & Product Vision

`hivemind-portal` is the bilingual (`en` and `vi`), interactive product portal, 3-Layer X-Ray technical showroom, and sustainable monetization funnel for the **Hivemind-\*** OpenCode V2 ecosystem:
1. **`hivemind-steward-acp`**: Multi-Harness ACP cockpit and native delegation plugin (`Devin`, `Antigravity`, and `Freebuff` 3rd-Harness candidate).
2. **`hivemind-substrate`**: Lossless session archive (`The Spine`), hybrid SQLite + AST + PageRank memory index (`The Honeycomb`), and surgical context pruning (`Viewports & Working-Set Valve`).

The portal embodies the **`{CHINGCHONGCHINGVIBECODING}` ("Pro, Not Bro")** philosophy: high-craft Asian Tech-Punk / Cyber-Wok aesthetic paired with verifiable systems engineering where every visual claim is backed by an interactive 3-Layer X-Ray (`Human Prompt -> Orchestrator Tool -> Engine Execution`).

---

## 2. Reconciled 3-Horizon Domain Model

Every feature, showcase card, and interactive node on the portal carries an explicit **Horizon Badge** so visitors distinguish shipped capabilities from the upcoming multi-harness release and roadmap substrate architecture:

| Horizon ID | Badge Label (`en` / `vi`) | Canonical Scope | Source Grounding |
| :--- | :--- | :--- | :--- |
| `shipped` | `SHIPPED NOW · v0.1` / `ĐÃ PHÁT HÀNH · v0.1` | Devin ACP Steward MVP: Live `/devin` Hosted View, `delegate-devin` Native children (`ses_*`), comment-preserving `npx hmoc-steward-acp` installer, and `devin_run` / `devin_session`. | `hivemind-steward-oc-devin-dev/README.md` |
| `next-release` | `NEXT RELEASE · v0.2` / `BẢN KẾ TIẾP · v0.2` | Tri-Harness Steward: Shared ACP catalog core, `/devin` & `/antigravity` Hosted Views, `S6` origin-labelled `/` & `@` autocomplete, `S7` fenced live option switching (`ctrl+m`/`ctrl+e`/`ctrl+t`), `S8` rank-routed parallel delegation (`hivemind-delegate`) with 3-slot `ModelSlotChain`, plus `freebuff-native` (`deepseek-4.1-flash` & `glm-5.3-flash`, OAuth browser login, Ed25519 device signing, rotated `fbm1....` handle recovery, and `keepSlotForResume` pause continuity). | `mentions.ts`, `targeted-request-broker.ts`, `freebuff-session-lease.ts` |
| `roadmap` | `ROADMAP LAB · SUBSTRATE` / `PHÒNG LAB LỘ TRÌNH · SUBSTRATE` | Hivemind Substrate (`hivemind-substrate`) 3-layer memory engine: **The Spine** (`.session-archive/blobs/<sha256>.txt` & shadow Git drafts), **The Honeycomb** (`index.sqlite` indexing `SemanticSessionDigest`, `IntentPivot`, `DelegationTurn`, `ProvenanceChain`, AST skeletons, PageRank `RepoMap`, and `git_cochange`), and **Viewports & Working-Set Valve** (`< 2 ms` bloat pruning + `< 1,200`-token `CompactionContinuationPacket` + `/substrate` Mudball Advisor). | `hivemind-substrate/AGENTS.md`, `GLOSSARY.md` |

---

## 3. User Stories & Acceptance Criteria

### 3.1 Hero, 3D Cyber-Wok Stage & Bilingual Navigation
- **US-01 (Asymmetric Split Cockpit Hero):** As a developer landing on `/en` or `/vi`, I see a 45%/55% split cockpit hero: left column displays the 3-Horizon maturity strip, primary value proposition, and copyable `npx hmoc-steward-acp` Silk Scroll command ledger; right column hosts the interactive 3D Cyber-Wok Reactor Stage with reserved layout dimensions (`min-height: 520px; aspect-ratio: 16 / 10`, `CLS < 0.1`).
- **US-02 (Interactive 3D Cyber-Wok Reactor):** As a visitor, I can click or keyboard-focus 4 nodes in the Cyber-Wok Reactor (`devin`, `antigravity`, `freebuff`, `substrate`) to inspect real model IDs (`swe-2-max`, `argon-4-high`, `glm-5.3-flash` / `deepseek-4.1-flash`), ACP wire telemetry, and horizon tier.
- **US-03 (Deterministic Reduced-Motion & SSR Fallback):** As a visitor with `prefers-reduced-motion: reduce` or without WebGL, I automatically receive a deterministic high-contrast SVG schematic (`DeterministicCanvasFallbackAdapter`) with identical interactive node controls and zero animation loops.
- **US-04 (Zero-Reload EN/VI Locale Parity):** As a Vietnamese or English reader, I can toggle between `/en` and `/vi` preserving my active horizon filter and selected showcase slice; every dictionary key is validated at build and test time for 100% schema parity.

### 3.2 20-Clip Ecosystem Catalog & 3-Layer X-Ray Explorer
- **US-05 (Horizon & Plugin Filtering):** As an evaluator, I can filter showcases by plugin (`all`, `steward`, `substrate`, `cross-plugin`) and maturity horizon (`all`, `shipped`, `next-release`, `roadmap`).
- **US-06 (Steward S1–S10 Showcases):** As an OpenCode user, I can inspect all 10 Steward clips (`S1` Zero-Ceremony Setup, `S2` Hosted Pair-Programming, `S3` Native Subagent Delegation, `S4` Crash Recovery & Reconcile, `S5` Permission Mediation, `S6` Origin-Labelled `/` & `@` Mentions, `S7` Fenced Live Option Switching, `S8` Rank-Routed Parallel Swarm, `S9` Freebuff Rotated Handle Recovery, `S10` KeepSlotForResume Pause Continuity).
- **US-07 (Substrate M1–M9 & C1 Showcases):** As a systems engineer, I can inspect all 9 Substrate clips (`M1` The Spine Blob Archive, `M2` Shadow Git Checkpoints, `M3` The Honeycomb Hybrid Index, `M4` AST Skeleton & PageRank RepoMap, `M5` Working-Set Valve <2ms Pruning, `M6` CompactionContinuationPacket <1200 Tokens, `M7` ProvenanceChain Forensics, `M8` Git Co-Change Coupling Radar, `M9` `/substrate` Mudball Advisor) plus `C1` Cross-Plugin Steward+Substrate Synergy.
- **US-08 (3-Layer X-Ray Drawer):** Every showcase card opens or displays a 3-Layer X-Ray:
  1. `Layer 1 · Human Prompt`: Exact operator command/prompt in the OpenCode TUI.
  2. `Layer 2 · Orchestrator Tool`: Structured JSON-RPC / tool payload (`delegate-devin`, `hivemind-delegate`, `session/set_config_option`, `substrate_prune`).
  3. `Layer 3 · Engine Execution`: Real engine wire trace (`ses_*`, `fbm1....`, `.session-archive/blobs/<sha256>.txt`, SQLite query plan).
- **US-09 ("Pro, Not Bro" Pass-Down Lesson):** Every showcase card includes a concise bilingual architectural lesson explaining why deep seams, boundary validation, and deterministic recovery beat superficial prompt hacking.
- **US-10 (5-Minute 3-Harness Greenfield Build Walkthrough):** As a viewer of the flagship demo, I can step through the 5-stage greenfield build timeline where `Freebuff` (`deepseek-4.1-flash` -> `glm-5.3-flash`), `Devin` (`swe-2-max`), and `Antigravity` (`argon-4-high`) collaborate under OpenCode V2 orchestration.

### 3.3 Partner Conversion Hub, Referral Vault & Quota Estimator
- **US-11 (3-Audience Conversion Hub):** As a visitor, I can switch between 3 tailored conversion tracks:
  1. `builders` (Vibecoders & Indie Devs): Freebuff referral (`https://freebuff.com/?ref=ref-6c980d54-a29a-4270-a160-35f13e62a2ff`) and Zap GLM Coding Plan (`https://z.ai/subscribe?ic=LTWUT4H2RS`).
  2. `supporters` (Community Backers): Ko-fi (`https://ko-fi.com/shynlee04`) and Buy Me a Coffee (`https://buymeacoffee.com/shynlee04l`).
  3. `sponsors` (B2B AI Harnesses, Inference Providers & DevTools): Wok Burner Tier, Honeycomb Tier, and Ecosystem Title Sponsor packages.
- **US-12 (Contextual Slice CTAs):** Selecting a Freebuff showcase (`S8`, `S9`, `S10`) highlights the Freebuff + Zap GLM referral CTAs with transparent disclosure badges.
- **US-13 (Interactive Quota-Savings Estimator):** As a heavy AI coder, I can adjust weekly coding hours (`5`–`80` hrs/wk) and see deterministic monthly token/subscription savings achieved by routing research and boilerplate to Freebuff (`deepseek-4.1-flash` / `glm-5.3-flash`) + Substrate Working-Set Valve pruning before invoking frontier reasoning slots.

### 3.4 Stage 2 · Payload CMS 3.0 Bilingual Blog, Episode Hub & Component Showroom
- **US-14 (Payload CMS 3.0 Localized Collections):** The repository defines strongly typed Payload 3.0 collection configs (`episodes`, `articles`, `showcase-slices`, `sponsors`) with `en` and `vi` localization and provides a seamless `PayloadLocalApiAdapter` + `InMemoryContentAdapter` behind `ContentShowroomModule`.
- **US-15 (Bilingual Blog & Architecture Deep-Dives):** Visitors can browse `/[locale]/blog` and read `/[locale]/blog/[slug]` articles covering the 3-Horizon architecture, Tri-Harness orchestration, and the 3-Layer Substrate memory engine.
- **US-16 (Episode Hub with Side-by-Side Transcript & TUI Replay):** Visitors can open `/[locale]/episodes/[slug]` to view synchronized bilingual episode transcripts alongside an interactive OpenCode TUI replay trace.
- **US-17 (Interactive Component Showroom & Storybook 8):** Developers and sponsors can visit `/[locale]/showroom` (and inspect `.storybook/` stories) to test `WokReactorStage`, `XRayExplorerCard`, `QuotaSavingsCalculator`, and `ConversionHub` in isolation with live `en`/`vi` locale and `reducedMotion` toggles.
- **US-18 (Social Launch Pack & Showroom Guide):** Maintainers have ready-to-post bilingual launch copy (`docs/LAUNCH_PACK.md`) for YouTube, GitHub, Reddit, and Discord plus contributor documentation (`docs/SHOWROOM.md`).

---

## 4. Five Deep Modules & Public Seams

| Deep Module | Public Seam File | Exported Contract |
| :--- | :--- | :--- |
| `LocaleDictionaryModule` | `src/modules/locale-dictionary/index.ts` | `getPortalDictionary(locale)`, `verifyDictionaryParity()`, `SUPPORTED_LOCALES`, `PortalDictionarySchema` |
| `WokReactorStageModule` | `src/modules/wok-reactor-stage/index.tsx` | `<WokReactorStage />`, `renderDeterministicFallbackSvg(props)`, `getReactorNodeMetadata(id, locale)`, `REACTOR_NODES` |
| `EcosystemCatalogModule` | `src/modules/ecosystem-catalog/index.ts` | `queryShowcases(query)`, `getShowcaseById(id, locale)`, `getGreenfieldWalkthrough(locale)`, `getHorizonSummaries(locale)` |
| `PartnerConversionModule` | `src/modules/partner-conversion/index.ts` | `resolveConversionCtas(query)`, `calculateQuotaSavings(hoursPerWeek)`, `PARTNER_URLS` |
| `ContentShowroomModule` | `src/modules/content-showroom/index.ts` | `listEpisodes(locale)`, `getEpisodeBySlug(slug, locale)`, `listArticles(query)`, `getArticleBySlug(slug, locale)`, `payloadCollections`, `<ShowcaseHarness />` |

---

## 5. Verification Gate

The engineering gate is `bun test` + `bun run typecheck` + `bun run build` from the repository root:
1. 100% key parity between `en.json` and `vi.json` enforced by `PortalDictionarySchema`.
2. All 20 `< 2-minute` showcase slices (`S1`–`S10`, `M1`–`M9`, `C1`) and the 5-stage Greenfield walkthrough verified with non-empty 3-Layer X-Ray traces and bilingual `"Pro, Not Bro"` lessons.
3. Exact partner referral and donation URLs verified against `PARTNER_URLS`.
4. `WokReactorStage` deterministic fallback SVG and node metadata verified for all 4 reactor nodes (`devin`, `antigravity`, `freebuff`, `substrate`) in both `en` and `vi`.
5. `ContentShowroomModule` localized queries, Payload 3.0 collection schemas, and `ShowcaseHarness` verified in both `en` and `vi`.
