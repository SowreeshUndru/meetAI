import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/compo/LogoutButton";

export default async function Home() {
  const session =await getServerSession();
  console.log("hello");
  if(!session){
    redirect("/api/auth/signin");
  }
  return (
   <div>
     <h1 className="text-2xl">Welcome, {session.user?.name || session.user?.email}!</h1>
      <LogoutButton />
   </div>
    
  );
}
