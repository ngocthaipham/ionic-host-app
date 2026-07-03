# Local Setup Guide

Run the **demo consumer** (`my-ionic-app`) against **`ionic-mfe-turbo`** (shared `packages/` + publishable `apps/`).

## Folder layout

Both repos must be **siblings**:

```
~/projects/
├── ionic-mfe-turbo/   ← monorepo (packages/ + apps/)
│   ├── packages/      ← config, types, ui
│   └── apps/          ← core (host), home, products
└── my-ionic-app/      ← demo consumer (this repo)
```

If your folders are elsewhere, keep the same sibling relationship. Consumer deps use semver (`@your-org/core`) from Verdaccio — run `pnpm bootstrap` first.

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

## First-time setup

**Terminal 1** — start local registry (keep running):

```bash
cd ionic-mfe-turbo
pnpm registry
# → http://localhost:4873
```

**Terminal 2** — bootstrap consumer:

```bash
cd my-ionic-app
pnpm bootstrap
```

> `bootstrap` runs `publish:local`, which **requires Verdaccio** on port 4873.  
> If you see `ECONNREFUSED`, start `pnpm registry` first (Terminal 1).

`bootstrap` will:

1. Install dependencies in `ionic-mfe-turbo`
2. Build and publish all `@your-org/*` packages to Verdaccio
3. Install dependencies in `my-ionic-app` from Verdaccio (`^0.1.x`)

---

## Run the app

### Option 1 — Host only (after setup)

If you only changed config/theme in the host app:

```bash
cd my-ionic-app
pnpm dev
```

Vite always prints the server root (`http://localhost:3000/`). Routes like `/home` are client-side — `dev:home` opens `/home` in the browser automatically.

### Option 2 — Host + live MFE rebuild (recommended when editing packages)

**Terminal 1** — watch & rebuild apps (`core`, `home`, `products`):

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

### Option 3 — Host + one mini app only

Requires `@your-org/core@0.1.1+` from Verdaccio (run `pnpm bootstrap` once if you have not).

**Terminal 1** — watch only `core` + chosen mini app, then sync to Verdaccio when core changes:

```bash
cd ionic-mfe-turbo
pnpm dev:home        # or: pnpm dev:products
# after editing core → in another tab:
pnpm publish:local   # Verdaccio must be running (pnpm registry)
```

**Terminal 2** — demo consumer:

```bash
cd my-ionic-app
pnpm sync            # pull latest @your-org/* from Verdaccio (after publish)
pnpm dev:home        # or: pnpm dev:products
```

Or set `apps` in config (no env var):

```ts
// mfe-config.ts
export const mfeConfig: CoreConfig = {
  apps: ['products'],
  // ...
};
```

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
| Labels, data, callbacks, tabs | `my-ionic-app/src/config/mfe-config.ts` → `CoreProvider` |
| Brand colors | `my-ionic-app/src/theme/brand.css` or `CoreProvider theme` |
| Host shell (tabs, routing) | `ionic-mfe-turbo/apps/core/src/` |
| Mini app UI (e.g. Products) | `ionic-mfe-turbo/apps/products/src/` |
| ESLint / TS conventions | `ionic-mfe-turbo/packages/config/` |

After editing MFE source, run `pnpm dev` in `ionic-mfe-turbo` (or `pnpm build` once), then refresh the host app.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `pnpm publish:local` / `pnpm sync` fails with `ECONNREFUSED` | Start Verdaccio first: `cd ionic-mfe-turbo && pnpm registry` |
| `ENOENT` on `file:../ionic-mfe-turbo/...` | Put both repos as sibling folders |
| Stale UI after editing MFE | Run `pnpm dev` or `pnpm build` in `ionic-mfe-turbo` |
| Still see blank page with `dev:home` | Run `pnpm sync`, **restart** dev server (Ctrl+C), ensure `@your-org/core@0.1.4+` |
| Port 3000 in use | Stop the other process or change port in `vite.config.ts` |

---

## Advanced: Verdaccio (optional)

To test the real **publish → install** workflow (like production), see `ionic-mfe-turbo/docs/PUBLISHING.md`.

For daily local development, run `pnpm bootstrap` once so Verdaccio has `@your-org/core@^0.1.0`. After that, `pnpm install` resolves from `http://localhost:4873` (see `.npmrc`).
