/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CORE_APPS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
