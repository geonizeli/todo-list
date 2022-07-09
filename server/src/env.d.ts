declare namespace NodeJS {
  interface ProcessEnv {
    DB_NAME?: string;
    NODE_ENV?: 'test' | 'development' | 'production';
  }
}