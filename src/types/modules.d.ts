declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      API_SECRET: string;
    }
  }
}

export {};
