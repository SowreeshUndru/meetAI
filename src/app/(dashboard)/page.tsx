


import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function Home() {
//  const trpc=useTRPC();
  const session= await getServerSession();
  if(!session){
    redirect("/auth/signin");
  }
//  const {data}=useQuery(trpc.agents.getMany());




  return (
   <div>
     
   </div>
  );
}
