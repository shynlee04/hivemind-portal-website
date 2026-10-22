# CODING_STANDARDS.md

## 1. Deep Modules & Narrow Seams (`CS-ARCH`, `CS-SEAM`)
- Every domain capability lives behind a module seam under `src/modules/<module-name>/index.ts` (see `AGENTS.md`).
- Route files under `src/app/[locale]/**` are thin composition shells that call module seams and pass typed props to UI components.
- Never scatter copy strings, product versions, install commands or external URLs across components: copy comes from the dictionary, versions/URLs from `EcosystemModule`.

## 2. Boundary Validation & Total Types (`CS-TYPE`, `CS-SEC`)
- Validate locale inputs (`"en" | "vi"`) and dictionary payloads with Zod at module boundaries.
- Strict TypeScript (`bun run typecheck`); no `any`, `@ts-ignore` or `@ts-expect-error`.
- External links (`target="_blank"`) include `rel="noopener noreferrer"`.

## 3. Observable Behavioral Tests (`CS-TEST`)
- Tests in `test/*.test.ts` exercise public module seams with independently written expectations.
- No phase-narrating comments or tautological assertions.

## 4. Visual & Accessibility Discipline
- Follow the one-motif direction (`.planning/SPEC.md` §4): the hexagon is the only shape; no gradients, rules, shadows at rest, eyebrows or monospace outside code and `data-ui` fragments.
- Every headline fits two lines at 1440, 768 and 390px in both locales; heading line-height stays ≥ 1.0 with room for Vietnamese diacritics.
- Every interactive live element works without JavaScript from its server-rendered default and honours `prefers-reduced-motion`.
- All imagery is generated SVG via `HexArt` (`ArtId` scenes only — no raster photographs); every scene honours `prefers-reduced-motion` and carries localized alt text.
