# Design System Master: `hivemind-portal` (`{CHINGCHONGCHINGVIBECODING}`)

## 1. Aesthetic Direction: Cyber-Wok Forge & Silk Scroll Ledger
- **Archetype:** High-Craft Dark UI + Kinetic Typography & Neo-Brutalist Swiss Grids + Interactive 3D WebGL Shader Stage + Tactile Terminal Cockpit.
- **Anti-Slop Guardrails:**
  - **NO** centered generic SaaS hero or stock robot illustrations.
  - **NO** purple/indigo gradients (`#6366F1`, `#8B5CF6` banned).
  - **NO** rounded pill cards (`border-radius > 4px` banned on structural containers; use `2px` chamfered corner cuts and `1px solid` forge-brass borders).
  - **NO** tracked-out all-caps eyebrows above headings; use bracketed monospace tags (`[SHIPPED · v0.1]`, `[NEXT · v0.2]`, `[ROADMAP · SUBSTRATE]`).

## 2. Color Tokens (WCAG AA/AAA Verified)

| CSS Custom Property | Hex | Role & Contrast Ratio |
| :--- | :--- | :--- |
| `--bg-wok-iron` | `#080B10` | Primary viewport canvas (Seasoned Cast-Iron Wok) |
| `--bg-smoked-basalt` | `#111622` | Elevated card & X-Ray drawer surface |
| `--bg-scroll-lacquer` | `#171F2E` | Interactive hover & active TUI command pane |
| `--border-forge-brass` | `#3A2E1E` | Structural hairlines & `2px` chamfered card frames |
| `--text-parchment` | `#F4EFE6` | Primary display & body copy (`18.4:1` on `#080B10`, AAA) |
| `--text-ash-slate` | `#94A3B8` | Secondary metadata & inactive tabs (`5.6:1` on `#111622`, AA) |
| `--accent-wok-gold` | `#F5A623` | Primary CTA, active Harness ring & `SHIPPED NOW` badge (`9.8:1` on `#080B10`, AAA) |
| `--accent-jade-wire` | `#22D3EE` | ACP JSON-RPC wire trace, Honeycomb edges & `NEXT RELEASE` badge (`11.2:1`, AAA) |
| `--accent-dragon-ember` | `#EF4444` | `#max` effort flame core, adversarial review alert & `ROADMAP LAB` accent (`5.4:1`, AA) |
| `--accent-bamboo-green` | `#10B981` | Verified test gate, token savings & `keepSlotForResume` status (`8.1:1`, AAA) |

## 3. Bilingual Typography Scale (Vietnamese Diacritic Safe)

- **Display / Headings & Body (`--font-sans`):** `'Be Vietnam Pro', system-ui, sans-serif`
  - Hero Headline: `clamp(2.25rem, 4vw + 1rem, 3.75rem)`, `font-weight: 700`, `line-height: 1.18` (prevents clipping stacked Vietnamese diacritics like `ể`, `ự`, `ẫ`, `ộ`).
  - Section Title: `clamp(1.65rem, 2.5vw + 0.5rem, 2.5rem)`, `font-weight: 700`, `line-height: 1.24`.
  - Body Copy: `1.0625rem` (`17px`), `line-height: 1.65`, `max-width: 66ch`.
- **Numeric & English Accent (`--font-display`):** `'Space Grotesk', sans-serif` (`font-variant-numeric: tabular-nums`).
- **TUI & Wire Trace Monospace (`--font-mono`):** `'JetBrains Mono', monospace`
  - Used for `/devin`, `/antigravity`, `hivemind-delegate`, `@resource_link`, `ses_*`, `fbm1....`, and JSON-RPC frames.

## 4. Layout, Touch Targets & Accessibility Checklist
- **Asymmetric Split Cockpit Hero:** Desktop `grid-template-columns: 5fr 6fr` (`gap: 2.5rem`, `max-width: 1440px`). Left 45%: Horizon filter + Silk Scroll command ledger; Right 55%: 3D Cyber-Wok stage (`min-height: 520px; aspect-ratio: 16 / 10`, `CLS < 0.1`).
- **Hit Targets:** Every interactive button, locale switch, horizon tab, and reactor node control is at least `44px × 44px`.
- **Keyboard Focus:** `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]`.
- **Motion Safety:** Respects `prefers-reduced-motion: reduce` by swapping the WebGL loop for `DeterministicCanvasFallbackAdapter` (`renderDeterministicFallbackSvg`).
