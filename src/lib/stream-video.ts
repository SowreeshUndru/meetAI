// lib/stream-video.ts
import "server-only";
import { StreamClient } from "@stream-io/node-sdk";

export const streamVideo = new StreamClient(
  process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
  process.env.STREAM_VIDEO_SECRET_KEY!,
  {
    timeout: 10000, // ⬅️ Set 10s timeout to avoid default 3s aborts
  }
);
