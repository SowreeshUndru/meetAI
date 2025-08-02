// app/api/meetings/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const userId=session?.user.id;
    console.log(userId);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  
  const meetings = await prisma.room.findMany({
     where: { createdById: session.user.id },
     include:{
        agent:true
     } 
  });
  console.log(meetings);

  return NextResponse.json(meetings);
}
