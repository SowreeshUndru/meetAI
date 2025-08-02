// lib/stream-video.ts
import "server-only";
import { StreamClient } from "@stream-io/node-sdk";

export const streamVideo = new StreamClient(
  "hqcmvyajp2g4",
  "hkbega2fu3wqbsf5gwdrj52pypr674bcfu4wp4cfddj6fher3s7nazs59tg9jajs",
  {
    timeout: 10000, // ⬅️ Set 10s timeout to avoid default 3s aborts
  }
);
