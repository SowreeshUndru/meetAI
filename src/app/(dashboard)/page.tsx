import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function Home() {
//  const trpc=useTRPC();
const session = await getServerSession(authOptions);
 console.log("debug@2.0",session?.user.id)
  if(!session){
    
    redirect("/auth/signin");
  }

 console.log(session.user.id);
//  const {data}=useQuery(trpc.agents.getMany());




  return (
   <div>
     
   </div>
  );
}
