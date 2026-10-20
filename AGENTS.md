# AGENTS.md — `hivemind-portal-website`

## Purpose & Scope
Bilingual (`en` and `vi`) product portal, 3D Cyber-Wok Reactor Stage, 20-slice 3-Layer X-Ray Explorer, Partner Conversion Hub, Payload 3.0 localized content collections, and interactive Component Showroom for the **Hivemind-\*** OpenCode V2 ecosystem (`hivemind-steward-acp` + `hivemind-substrate`).

Read [`GLOSSARY.md`](GLOSSARY.md), [`.planning/SPEC.md`](.planning/SPEC.md), [`design-system/hivemind-portal/MASTER.md`](design-system/hivemind-portal/MASTER.md), and [`CODING_STANDARDS.md`](CODING_STANDARDS.md) before modifying code.

## Commands
```sh
bun test                # Run all seam unit and integration tests
bun run typecheck       # tsc --noEmit
bun run build           # Next.js production build verification
```

## Five Deep Modules (One Seam Per Module)

| Module | Public Entry Seam | Responsibility |
| :--- | :--- | :--- |
| `LocaleDictionaryModule` | `src/modules/locale-dictionary/index.ts` | Bilingual (`en` / `vi`) dictionary lookup + Zod 100% key parity verification. |
| `WokReactorStageModule` | `src/modules/wok-reactor-stage/index.tsx` | Three.js 3D Cyber-Wok Reactor (`devin`, `antigravity`, `freebuff`, `substrate`) + `DeterministicCanvasFallbackAdapter` for SSR and `prefers-reduced-motion`. |
| `EcosystemCatalogModule` | `src/modules/ecosystem-catalog/index.ts` | Queries all 20 `< 2-min` clips (`S1`–`S10`, `M1`–`M9`, `C1`) + `5-min` 3-Harness Greenfield build with 3-Layer X-Rays and `"Pro, Not Bro"` lessons. |
| `PartnerConversionModule` | `src/modules/partner-conversion/index.ts` | Resolves verified referral links (`Freebuff`, `Zap GLM`), supporter vaults (`Ko-fi`, `Buy Me a Coffee`), B2B sponsor tiers, and quota savings. |
| `ContentShowroomModule` | `src/modules/content-showroom/index.ts` | Bridges localized Payload 3.0 collections (`episodes`, `articles`, `showcase-slices`, `sponsors`), bilingual blog/episode queries, and `<ShowcaseHarness />`. |
| `CommandConsoleModule` | `src/modules/command-console/index.ts` | Homepage "try a command" answers and the commands/keys table for the real `hmoc-steward-acp` 0.2.0 surface (EN/VI). |

Homepage (`src/components/home/`, styles in `src/app/[locale]/home.css`) claims only what the plugin README/ROADMAP ship; see `.planning/SPEC.md` §3.0.

## Non-Negotiable Rules
- Atomic git commits per logical unit (`docs`, `feat`, `test`). Never leave an uncommitted dirty tree.
- Zero unnecessary comments. Only document non-obvious rationale.
- Keep every file well under 1,000 LOC.
- Test external behavior at the 5 module seams (`test/*.test.ts`).
