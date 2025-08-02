import { inngest } from "./client";
import JSONL from "jsonl-parse-stringify"
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();
import { CallTranscriptType } from "@/modules/agents/types";

export const helloWorld = inngest.createFunction(
    { id: "meetings/processing" },
    { event: "meetings/processing" },
    async ({ event, step }) => {
        const response = await step.fetch(event.data.transcriptUrl);
        const transcript = await step.run("parse-transcript", async () => {
            const text = await response.text();
            return JSONL.parse<CallTranscriptType>(text);
        })
        const transcriptWithSpeakers = await step.run("add-speakers", async () => {
            const speakersId = [... new Set(transcript.map((item) => item.speaker_id))];
            const useSpeakers = await prisma.user.findMany({
                where: {
                    id: {
                        in: speakersId,
                    },
                },
            });
            return transcript.map((item) => {
                const speaker = useSpeakers.find((speaker) => speaker.id === item.speaker_id);
                if (!speaker) return {
                    ...item, users: {
                        name: "Unknown",
                    }
                }
                return {...item,
                    user:{
                        name:speaker.name,
                    }
                }

            });
        });

    },
);