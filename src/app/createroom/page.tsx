// app/createroom/page.tsx
import CreateRoom from "@/components/CreateRoom";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface Props {
  searchParams: {
    id?: string;
    name?: string;
    instructions?: string;
  };
}

export default async function CreateRoomPage({ searchParams }: Props) {
  const agentId = searchParams.id ?? null;
  const agentName = searchParams.name ?? null;
  const agentInstructions = searchParams.instructions ?? null;

  console.log("Agent Details:", agentId, agentName, agentInstructions);

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Room</h1>
      <CreateRoom agentId={agentId} agentName={agentName} agentInstructions={agentInstructions} />
    </main>
  );
}
