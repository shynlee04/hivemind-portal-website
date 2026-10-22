# hivemind-portal-website

The bilingual (English / Tiếng Việt) site for **Hivemind**, two plugins for OpenCode V2:

- **Steward** ([`hmoc-steward-acp`](https://www.npmjs.com/package/hmoc-steward-acp)): Devin, Antigravity and Freebuff inside OpenCode, as hosted sessions or delegates.
- **Substrate** ([`hivemind-substrate`](https://www.npmjs.com/package/hivemind-substrate)): an exact, local memory of every session, delegation and code change.

Live: [hivemind-portal.vercel.app](https://hivemind-portal.vercel.app)

## Develop

```sh
bun install
bun run dev        # http://localhost:3000/en
bun test
bun run typecheck
bun run build
```

Copy lives in `src/modules/locale-dictionary/{en,vi}.json`; versions and links in `src/modules/ecosystem/index.ts`. Photographs are open-licence pictures credited in the site footer.
