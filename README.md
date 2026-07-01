# My Ionic App (Host)

Consumer app that installs MFE packages from `ionic-mfe-turbo` and customizes them via config + theme.

## Quick start

**Full guide:** [docs/LOCAL_SETUP.md](./docs/LOCAL_SETUP.md)

```bash
# First time (builds sibling MFE packages + installs deps)
pnpm bootstrap

# Run host app → http://localhost:3000
pnpm dev
```

Both repos must sit side by side:

```
../ionic-mfe-turbo/
my-ionic-app/   ← you are here
```

## Customize

- **Props / labels** — `src/config/mfe-config.ts`
- **Brand theme** — `src/theme/brand.css`
- **MFE components** — edit source in `../ionic-mfe-turbo/packages/`

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm bootstrap` | Install + build MFE packages, then install host deps |
| `pnpm dev` | Start host app on port 3000 |
| `pnpm build` | Production build |
