import type { CoreConfig } from '@your-org/core';
import { mfeConfig } from './mfe-config';

type CoreMiniApp = 'home' | 'products';

function parseEnabledApps(): CoreMiniApp[] | undefined {
  const raw = import.meta.env.VITE_CORE_APPS;
  if (!raw) {
    return undefined;
  }

  const apps = raw
    .split(',')
    .map((value) => value.trim())
    .filter((value): value is CoreMiniApp => value === 'home' || value === 'products');

  return apps.length > 0 ? apps : undefined;
}

/** Merge static config with optional VITE_CORE_APPS from dev scripts. */
export function resolveCoreConfig(): CoreConfig {
  const apps = parseEnabledApps();
  if (!apps) {
    return mfeConfig;
  }

  return { ...mfeConfig, apps } as CoreConfig;
}
