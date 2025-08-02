import { inferRouterOutputs } from "@trpc/server";
import  type {AppRouter} from "@/trpc/routers/_app"



export type AgentGetone=inferRouterOutputs<AppRouter>["agents"]["getOne"];



export interface CallTranscriptType {
    speaker_id: string;
    type: "speech" | "noise" | "silence" | string; // extend if needed
    text: string;
    start_ts: number; // start timestamp in ms
    stop_ts: number;  // stop timestamp in ms
  }
  