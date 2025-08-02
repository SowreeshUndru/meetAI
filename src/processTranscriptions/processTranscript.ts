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
    // Step 1: Fetch the JSONL file using axios
    if(url===null||url===undefined) return null;
    const res = await axios.get(url, { responseType: "text" });
    const raw = res.data;

    // Step 2: Parse JSONL into a JS array
    const transcript: TranscriptLine[] = JSONL.parse(raw);

    // Step 3: Collect unique speaker IDs
    const speakerIds = [...new Set(transcript.map((line) => line.speaker_id))];

    // Step 4: Load speaker names from database
    const users = await prisma.user.findMany({
      where: { id: { in: speakerIds } },
      select: { id: true, name: true,email:true },
    });

    // Step 5: Replace speaker_id with speaker name
    const enriched = transcript.map((line) => {
      const user = users.find((u) => u.id === line.speaker_id);
      return {
        ...line,
        speaker: user?.email ?? "Unknown",
      };
    });

    // Step 6: Log or return the enriched data
    console.log(JSON.stringify(enriched, null, 2));
    return enriched;

  } catch (err) {
    console.error("Error fetching or processing transcript:", err);
  } finally {
    await prisma.$disconnect();
  }
}

// Example usage
