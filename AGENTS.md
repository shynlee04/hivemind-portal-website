# AGENTS.md — `hivemind-portal-website`

## Purpose & Scope
Bilingual (`en` / `vi`) public site for the Hivemind OpenCode V2 plugins: ecosystem home `/[locale]`, `/[locale]/steward` (`hmoc-steward-acp`) and `/[locale]/substrate` (`hivemind-substrate`).

Read [`GLOSSARY.md`](GLOSSARY.md), [`.planning/SPEC.md`](.planning/SPEC.md) and [`CODING_STANDARDS.md`](CODING_STANDARDS.md) before modifying code. Claims come only from the plugin repos (README, CHANGELOG, source) or an explicit owner release decision recorded in the SPEC.

## Commands
```sh
bun test                # module seam tests
bun run typecheck       # tsc --noEmit
bun run build           # Next.js production build (static en/vi routes)
node ~/.config/devin/skills/design-taste-frontend/scripts/lint.mjs src
node ~/.config/devin/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:3000/en
```

## Modules (one seam each)

| Module | Public seam | Owns |
| :--- | :--- | :--- |
| `LocaleDictionaryModule` | `src/modules/locale-dictionary/index.ts` | `en`/`vi` copy, Zod schema (`schema.ts`), parity check. All page copy lives here. |
| `EcosystemModule` | `src/modules/ecosystem/index.ts` | `PRODUCTS` (packages, versions, URLs), `LINKS`, `buildInstallPlan`, `PHOTO_CREDITS`. Bump versions here only. |
| `CommandConsoleModule` | `src/modules/command-console/index.ts` | Steward "Try a command" answers and the commands/keys table. |
| `TraceExplorerModule` | `src/modules/trace-explorer/index.ts` | Substrate sample change-set package and leaves. |

UI lives in `src/components/` (shared) and `src/components/{home,steward,substrate}/`; routes in `src/app/[locale]/` are thin shells. Art direction: `.taste-skill/direction.json` (one-motif hexagon); house rules in `.planning/SPEC.md` §4.

## Non-Negotiable Rules
- Atomic git commits per logical unit (`docs`, `feat`, `test`, `chore`). Never leave an uncommitted dirty tree.
- Zero unnecessary comments.
- Keep every file well under 1,000 LOC.
- Test external behavior at the module seams (`test/*.test.ts`); `test/banned-claims.test.ts` guards against stale or invented claims.
