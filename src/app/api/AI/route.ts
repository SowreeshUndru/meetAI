import { NextResponse } from "next/server";
import analyzeVideoCall from "@/AI_SERVICES/ai";
import { PrismaClient } from "@/generated/prisma";
import processTranscript from "@/processTranscriptions/processTranscript";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userPrompt, id } = await req.json();
    console.log("Prompt:", userPrompt, "ID:", id);

    if (!userPrompt || !id) {
      return NextResponse.json({ error: "Missing userPrompt or ID" }, { status: 400 });
    }

    const callData = await prisma.room.findUnique({
      where: { id },
      include: { agent: true },
    });

    if (!callData) {
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    const createdBy = await prisma.user.findUnique({
      where: { id: callData.createdById },
      select: { email: true },
    });

    const videoCallData = callData.transcriptUrl;
    const videoDetails = await processTranscript(videoCallData); // fix: await added
    const agent = callData.agent?.name;
    const instructions = callData.agent?.instructions;

    const result = await analyzeVideoCall(userPrompt, videoDetails, createdBy, agent, instructions,callData.createdAt);
    console.log(result);
    return NextResponse.json({ success: true, response: result.text });
  } catch (error) {
    console.error("Error in /api/analyze-call:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
