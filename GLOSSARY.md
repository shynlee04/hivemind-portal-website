# GLOSSARY: Hivemind portal

Use these names in code, copy and tests. Product terms come from the plugin repositories; do not invent new ones.

## Products

- **Hivemind:** the umbrella name for the two plugins below.
- **Steward (`hmoc-steward-acp`):** OpenCode V2 plugin that runs foreign agents inside OpenCode.
- **Substrate (`hivemind-substrate`):** OpenCode V2 plugin that archives, indexes and prunes session context.

## Steward terms

- **Harness / agent:** a foreign coding agent Steward bridges: Devin, Antigravity, Freebuff. Site copy says "agent"; code says `Harness`.
- **Hosted session:** a real foreign session opened in the TUI (`/devin`, `/antigravity`, `/freebuff`).
- **Delegation:** a task handed to a harness in a genuine OpenCode child session (`hivemind-delegate`, `delegate-devin`, `/devin_delegate`). Foreground waits; background reports later.
- **Setup:** `/hivemind-setup` (choose), `/hivemind-setup health` (static read: ready / action-required / blocked), `hivemind-doctor` (engine checks under consent).

## Substrate terms

- **The Spine:** `.session-archive/` JSONL transcripts plus `blobs/<sha256>.txt`.
- **The Honeycomb:** `.session-archive/index.sqlite`: sessions, delegations, file touches, receipts, AST skeletons, PageRank repo map, git co-change.
- **Valve:** `substrate.valve`: replaces old tool output with blob breadcrumbs; manifest states `FRESH | SLICE | STALE`.
- **Trace:** `substrate.viewport({ action: "trace" })`: call 1 returns the change-set package, call 2 a leaf (`<change>:<branch>` handle).

## Portal terms

- **Install plan:** ordered `InstallStep`s from `buildInstallPlan(plugins, scope)`.
- **Fragment:** an HTML rendering of a TUI moment, root marked `data-ui`.
- **Hex motif:** the pointy-top honeycomb cell used for every mask, button and bullet.
- **Art id:** `agent | honeycomb | yield | build | orbit | diagram` — generated SVG scenes rendered by `HexArt`, with per-locale alt text under `common.images`.
