declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      FRONTEND_URL: string;
      JWT_TOKEN_EXPIRES_IN: string;
      JWT_REFRESH_TOKEN_EXPIRES_IN: string;
      DATABASE_URL: string;
      SHADOW_DATABASE_URL: string;
      MYSQL_ROOT_PASSWORD: string;
    }
  }
}

export {};
