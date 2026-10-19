/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_SUBMISSION_ENDPOINT?: string;
  readonly VITE_MOCK_SUCCESS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
