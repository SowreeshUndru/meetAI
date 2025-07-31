// app/createroom/page.tsx
import CreateRoom from "@/components/CreateRoom"; // Adjust path if different
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function CreateRoomPage() {
const  session=await getServerSession(authOptions);
  if(!session){
    redirect("/login")
  }
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Room</h1>
      <CreateRoom />
    </main>
  );
}
