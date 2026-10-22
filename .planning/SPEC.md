# SPEC: Hivemind portal (`hivemind-portal-website`)

> **Status:** `active` · revamped 2026-10-22 (supersedes the Cyber-Wok / showroom spec; history in git)

## 1. Purpose

The public, bilingual (`en` / `vi`) site for the two Hivemind OpenCode V2 plugins:

| Product | npm package | Version advertised | Source of truth |
|---|---|---|---|
| Steward | `hmoc-steward-acp` | `0.4.0` (release in progress; owner decision 2026-10-22) | `hivemind-steward-oc-devin-dev` README, CHANGELOG, `release/production-cleanup-0.4` |
| Substrate | `hivemind-substrate` | `0.2.0-beta.1` (`beta`) | `hivemind-substrate` `src/plugin.ts`, `src/tui/commands.tsx`, `bin/install.mjs`, AGENTS.md |

The site claims only what those sources ship or what the owner has scoped into the advertised release. Proof is never invented: no customers, quotes, benchmarks or fabricated model IDs.

## 2. Routes

- `/` → `/en`. `/[locale]` home, `/[locale]/steward`, `/[locale]/substrate`; `en` and `vi` statically generated; unknown locale → 404.
- Per-page metadata from `meta.pages.<page>` with language alternates.

## 3. Requirements

- **HP-01 Home:** "A team and a memory for OpenCode": what the two plugins are, a tabbed Steward/Substrate showcase, three setup steps, a release ledger (Steward 0.4.0, Substrate beta, Claude Code next, Cursor after), and the install builder.
- **HP-02 Install builder (home live thing):** pick Steward / Substrate / Both and Every project / This project; `buildInstallPlan` returns the exact ordered steps (plugin install(s), restart OpenCode, `/hivemind-setup` when Steward is included). Server-rendered default (Both, Every project) works without JS.
- **ST-01 Steward:** Devin, Antigravity and Freebuff as hosted sessions (`/devin`, `/antigravity`, `/freebuff`) and delegates (`hivemind-delegate`), each agent's live model catalog, permission cards, crash recovery, setup (`/hivemind-setup`, `health`, `hivemind-doctor`), requirements, every command/key, roadmap close with Ko-fi.
- **ST-02 Try a command (Steward live thing):** `CommandConsoleModule.interpretCommand` answers plugin commands; the prefilled answer renders without JS.
- **SU-01 Substrate:** Spine / Honeycomb / Viewports layers, read-only host DB, in-memory per-step hook, co-change, compaction continuity, its TUI commands and agent tools, beta close with an issue link and the archive privacy warning.
- **SU-02 Trace demo (Substrate live thing):** `TraceExplorerModule` sample change-set: package rows open leaves (diff, actors, evidence). Labelled as sample data.
- **I18N-01:** one dictionary schema; `en` and `vi` keep 100% key and array-length parity.
- **CL-01:** a test bans stale claims (fabricated model IDs, Cyber-Wok/Payload vocabulary, `devin_run`, `devin_doctor`, old install versions, Freebuff "tools denied").
- **CR-01:** all imagery is generated inline SVG from `HexArt` (`ArtId` scenes — `agent`, `honeycomb`, `yield`, `build`, `orbit`, `diagram`), never raster stock; each scene carries localized alt text and honours `prefers-reduced-motion`.

## 4. Art direction

Taste-skill direction `one-motif` (seed 279398933, `.taste-skill/direction.json`): the honeycomb cell (pointy-top hexagon) is the only shape — generated `HexArt` scenes, buttons, bullets, the giant hero field and the footer tessellation. Orange `#ff7a1f` ground, ink `#050f16`, white rest fields; Albert Sans. House rules: two-line headlines, no eyebrows, no rules, no gradients, no shadows at rest, monospace only in code and `data-ui` fragments.

## 5. Verification gate

`bun test` + `bun run typecheck` + `bun run build`, plus the taste-skill `lint.mjs src` and `inspect.mjs` on `/en`, `/en/steward`, `/en/substrate`, `/vi` (0 FAIL). Owner review of the deployed site is the acceptance; publishing the site should wait until `hmoc-steward-acp@0.4.0` resolves on npm.
