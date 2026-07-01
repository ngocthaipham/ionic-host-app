# Local Setup Guide

Run the **host app** (`my-ionic-app`) and **MFE packages** (`ionic-mfe-turbo`) on any machine — no Verdaccio required.

## Folder layout

Both repos must be **siblings** in the same parent folder:

```
~/projects/
├── ionic-mfe-turbo/   ← MFE packages (mini apps)
└── my-ionic-app/      ← Host app (this repo)
```

If your folders are elsewhere, keep the same sibling relationship or update the `file:../ionic-mfe-turbo/...` paths in `package.json`.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 or newer |
| pnpm | 9.x |

```bash
node -v          # >= 20
corepack enable
corepack prepare pnpm@9.15.9 --activate
pnpm -v
```

---

## First-time setup (one command)

From `my-ionic-app`:

```bash
pnpm bootstrap
```

> Note: we use `bootstrap` (not `setup`) because `pnpm setup` is a built-in pnpm command.

This will:

1. Install dependencies in `ionic-mfe-turbo`
2. Build all `@your-org/*` packages
3. Install dependencies in `my-ionic-app` (linked to local packages)

---

## Run the app

### Option 1 — Host only (after setup)

If you only changed config/theme in the host app:

```bash
cd my-ionic-app
pnpm dev
```

Open **http://localhost:3000**

### Option 2 — Host + live MFE rebuild (recommended when editing packages)

**Terminal 1** — watch & rebuild MFE packages:

```bash
cd ionic-mfe-turbo
pnpm dev
```

**Terminal 2** — host app:

```bash
cd my-ionic-app
pnpm dev
```

Or run both in two terminals (see [LOCAL_SETUP.md](./LOCAL_SETUP.md)).

---

## Copy to another device

1. Copy both folders (`ionic-mfe-turbo` + `my-ionic-app`) as siblings.
2. **Do not copy** `node_modules`, `dist`, `.turbo`, or `.verdaccio`.
3. On the new machine, run:

```bash
cd my-ionic-app
pnpm bootstrap
pnpm dev
```

---

## Customize

| What | Where |
|------|-------|
| Labels, data, callbacks | `my-ionic-app/src/config/mfe-config.ts` |
| Brand colors | `my-ionic-app/src/theme/brand.css` |
| MFE UI / layout | `ionic-mfe-turbo/packages/mfe-home/src/` or `mfe-products/src/` |

After editing MFE source, run `pnpm dev` in `ionic-mfe-turbo` (or `pnpm build` once), then refresh the host app.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Cannot find module '@your-org/mfe-home'` | Run `pnpm bootstrap` from `my-ionic-app` |
| `ENOENT` on `file:../ionic-mfe-turbo/...` | Put both repos as sibling folders |
| Stale UI after editing MFE | Run `pnpm dev` or `pnpm build` in `ionic-mfe-turbo` |
| Port 3000 in use | Stop the other process or change port in `vite.config.ts` |

---

## Advanced: Verdaccio (optional)

To test the real **publish → install** workflow (like production), see `ionic-mfe-turbo/docs/PUBLISHING.md`.

For daily local development, the `file:` links in `package.json` are simpler and do not need Verdaccio.
