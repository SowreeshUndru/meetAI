import axios from "axios";
import JSONL from "jsonl-parse-stringify";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

interface TranscriptLine {
  speaker_id: string;
  type: string;
  text: string;
  start_ts: number;
  stop_ts: number;
}

export default async function processTranscript(url: string|null|undefined) {
  try {
  
    if(url===null||url===undefined) return null;
    const res = await axios.get(url, { responseType: "text" });
    const raw = res.data;

    
    const transcript: TranscriptLine[] = JSONL.parse(raw);

 
    const speakerIds = [...new Set(transcript.map((line) => line.speaker_id))];

   
    const users = await prisma.user.findMany({
      where: { id: { in: speakerIds } },
      select: { id: true, name: true,email:true },
    });


    const enriched = transcript.map((line) => {
      const user = users.find((u) => u.id === line.speaker_id);
      return {
        ...line,
        speaker: user?.email ?? "Unknown",
      };
    });


    console.log(JSON.stringify(enriched, null, 2));
    return enriched;

  } catch (err) {
    console.error("Error fetching or processing transcript:", err);
  } finally {
    await prisma.$disconnect();
  }
}


