/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EPIX_MAINTENANCE?: string;
  readonly VITE_CRM_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
