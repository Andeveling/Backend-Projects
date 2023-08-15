// NodeJS.ProcessEnv

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;

    // Auth JWT
    JWT_SECRET: string;
    HASH_SALT: string;
    // Database
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: string;
  }
}
