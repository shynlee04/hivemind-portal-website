# CODING_STANDARDS.md

## 1. Deep Modules & Narrow Seams (`CS-ARCH`, `CS-SEAM`)
- Every domain capability lives behind one of the five deep modules under `src/modules/<module-name>/index.ts(x)`.
- Route files under `src/app/[locale]/**` are thin composition shells that call module seams and pass typed props to UI views.
- Never scatter raw translation strings, partner referral URLs, or showcase fixtures across page components.

## 2. Boundary Validation & Total Types (`CS-TYPE`, `CS-SEC`)
- Validate locale inputs (`"en" | "vi"`), dictionary payloads, and query filters at module boundaries using Zod schemas.
- Enforce `noUncheckedIndexedAccess: true` and strict TypeScript checks (`bun run typecheck`).
- External links (`target="_blank"`) must include `rel="noopener noreferrer"`.

## 3. Observable Behavioral Tests (`CS-TEST`)
- Tests in `test/*.test.ts` exercise only the public module seams and rendered HTML/SVG outputs.
- No phase-narrating comments or tautological mock assertions.

## 4. Visual & Accessibility Discipline (`{CHINGCHONGCHINGVIBECODING}`)
- Follow `design-system/hivemind-portal/MASTER.md` tokens (`--bg-wok-iron`, `--bg-smoked-basalt`, `--border-forge-brass`, `--text-parchment`, `--accent-wok-gold`, `--accent-jade-wire`, `--accent-dragon-ember`).
- Preserve `line-height >= 1.18` on headings for Vietnamese stacked diacritics.
- Provide `DeterministicCanvasFallbackAdapter` whenever `reducedMotion` is active or WebGL is unavailable.
