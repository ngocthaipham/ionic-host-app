import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const turboRoot = resolve(root, '../ionic-mfe-turbo');
const packageJsonPath = resolve(root, 'package.json');
const corePkgPath = resolve(turboRoot, 'apps/core/package.json');

const WORKSPACE_PATHS = {
  '@your-org/core': '../ionic-mfe-turbo/apps/core',
  '@your-org/home': '../ionic-mfe-turbo/apps/home',
  '@your-org/products': '../ionic-mfe-turbo/apps/products',
  '@your-org/ui': '../ionic-mfe-turbo/packages/ui',
  '@your-org/types': '../ionic-mfe-turbo/packages/types',
};

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function readCoreVersion() {
  try {
    return readJson(corePkgPath).version;
  } catch {
    console.error(`Could not read ${corePkgPath}`);
    console.error('Ensure ionic-mfe-turbo sits next to my-ionic-app.');
    process.exit(1);
  }
}

function currentMode(pkg) {
  const core = pkg.dependencies?.['@your-org/core'] ?? '';
  return typeof core === 'string' && core.startsWith('file:')
    ? 'workspace'
    : 'registry';
}

function applyRegistry(pkg) {
  const version = readCoreVersion();
  pkg.dependencies['@your-org/core'] = `^${version}`;
  delete pkg.pnpm;
  return { pkg, version };
}

function applyWorkspace(pkg) {
  pkg.dependencies['@your-org/core'] = `file:${WORKSPACE_PATHS['@your-org/core']}`;
  pkg.pnpm = {
    overrides: Object.fromEntries(
      Object.entries(WORKSPACE_PATHS).map(([name, rel]) => [
        name,
        `file:${rel}`,
      ]),
    ),
  };
  return { pkg };
}

function printStatus(pkg) {
  const mode = currentMode(pkg);
  const core = pkg.dependencies['@your-org/core'];
  console.log(`Mode: ${mode}`);
  console.log(`@your-org/core → ${core}`);
  if (mode === 'workspace') {
    console.log('pnpm.overrides: all @your-org/* → sibling ionic-mfe-turbo paths');
    console.log('Tip: run `cd ../ionic-mfe-turbo && pnpm build` after source changes.');
  } else {
    console.log('Install source: Verdaccio / npm (.npmrc @your-org scope)');
    console.log('Tip: run `pnpm sync` after publish:local.');
  }
}

const mode = process.argv[2];

if (!mode || !['registry', 'workspace', 'status'].includes(mode)) {
  console.log('Usage: node scripts/deps-mode.mjs <registry|workspace|status>');
  process.exit(mode ? 1 : 0);
}

const pkg = readJson(packageJsonPath);

if (mode === 'status') {
  printStatus(pkg);
  process.exit(0);
}

if (currentMode(pkg) === mode) {
  console.log(`Already in "${mode}" mode.`);
  printStatus(pkg);
  process.exit(0);
}

if (mode === 'registry') {
  const { version } = applyRegistry(pkg);
  writeJson(packageJsonPath, pkg);
  console.log(`Switched to registry mode (@your-org/core ^${version}).`);
  console.log('Run: pnpm install');
} else {
  applyWorkspace(pkg);
  writeJson(packageJsonPath, pkg);
  console.log('Switched to workspace mode (file: ../ionic-mfe-turbo/...).');
  console.log('Run: cd ../ionic-mfe-turbo && pnpm build && cd ../my-ionic-app && pnpm install');
}
