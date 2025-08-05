// types/env.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    GEMINI_API_KEY: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    NEXT_PUBLIC_STREAM_VIDEO_API_KEY: string;
    STREAM_VIDEO_SECRET_KEY: string;
    DATABASE_URL: string;
  }
}
