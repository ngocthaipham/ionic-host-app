# My Ionic App (Demo Consumer)

Thin demo app — installs `@your-org/core` from `ionic-mfe-turbo` and customizes via `CoreProvider` + config.

## Quick start

**Full guide:** [docs/LOCAL_SETUP.md](./docs/LOCAL_SETUP.md)

```bash
pnpm bootstrap   # build sibling monorepo + install
pnpm dev         # http://localhost:3000
```

Sibling layout:

```
../ionic-mfe-turbo/   ← packages/ + apps/ (source)
my-ionic-app/         ← you are here (demo consumer)
```

## Customize

- **Props / labels / tabs / products** — `src/config/mfe-config.ts` → `CoreProvider`
- **Brand theme** — `src/theme/brand.css` or `CoreProvider theme`
- **Platform source** — `../ionic-mfe-turbo/apps/` and `packages/`

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm bootstrap` | Install + build + publish monorepo, then install demo deps from Verdaccio |
| `pnpm sync` | Re-publish monorepo + reinstall demo deps (after editing `@your-org/*`) |
| `pnpm dev` | Start demo app on port 3000 |
| `pnpm build` | Production build |
