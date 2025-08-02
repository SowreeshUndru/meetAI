"use server"
import { redirect } from "next/navigation";
import VideoRoom from "../../../components/VideoRoom";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@/generated/prisma";
interface Props {
  params:Promise< {
    customId: string;
  }>
}

export default async function RoomPage({ params }: Props) {
  const  { customId } = (await params);
  const prisma = new PrismaClient();
  const creator = await prisma.room.findUnique({
    where: {
      customId,
    },
    select: {
      createdById: true,
    },
  });
  
  const creatorId = creator?.createdById ?? "";


  
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session?.user?.id) {
   redirect("/");
  }



  return (
    <main className="p-4 overflow-y-hidden">
     {/* <h1 className="text-2xl font-bold mb-4 ">Meeting Room: {customId}</h1> */}
     
      <VideoRoom customId={customId} userId={session.user.id} userEmail={session.user.email}  creatorId={creatorId}/>
    </main>
  );
}
