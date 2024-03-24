declare global {
  interface ImportMetaEnv {
    readonly REACT_APP_API_URL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
