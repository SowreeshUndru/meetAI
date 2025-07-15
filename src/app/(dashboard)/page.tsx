"use client";


import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export default  function Home() {
 const trpc=useTRPC();
 const {data}=useQuery(trpc.hello.queryOptions({text:"sowreesh"}));



  return (
   <div>
      {data?.greeting || "Loading..."}
   </div>
  );
}
