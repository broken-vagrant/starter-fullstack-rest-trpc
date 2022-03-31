declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APOLLO_KEY: string;
      APOLLO_GRAPH_REF: string;
      APOLLO_SCHEMA_REPORTING: string;
      VITE_BACKEND_URL: string;
    }
  }
}

export {};
