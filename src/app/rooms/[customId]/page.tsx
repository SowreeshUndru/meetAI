"use server"
import { redirect } from "next/navigation";
import VideoRoom from "../../../components/VideoRoom";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { TRPCError } from "@trpc/server";
interface Props {
  params:Promise< {
    customId: string;
  }>
}

export default async function RoomPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session?.user?.id) {
   redirect("/");
  }

  const  { customId } = (await params);

  return (
    <main className="p-4 overflow-y-hidden">
     {/* <h1 className="text-2xl font-bold mb-4 ">Meeting Room: {customId}</h1> */}
      <VideoRoom customId={customId} userId={session.user.id} userEmail={session.user.email} />
    </main>
  );
}
