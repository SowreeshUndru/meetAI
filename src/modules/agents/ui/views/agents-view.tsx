"use client"

import { useTRPC } from "@/trpc/client";
import {useSuspenseQuery } from "@tanstack/react-query";
import Loading from "@/compo/Loading";
import Error from "@/compo/Error";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data,error} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    if(error) throw error;
    
    return(
        <div>
          {  JSON.stringify(data, null, 2)}
        </div>
    )
}

