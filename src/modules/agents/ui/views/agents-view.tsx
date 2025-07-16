"use client"

import { useTRPC } from "@/trpc/client";
import {useSuspenseQuery } from "@tanstack/react-query";
import Loading from "@/compo/Loading";
import Error from "@/compo/Error";
import { ResponsiveDialog } from "@/compo/ResponsiveDialog";
import { Button } from "@/components/ui/button";

export const AgentsView = () => {
    const trpc = useTRPC();
    const { data,error} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    if(error) throw error;
    
    return(
        <div>
         
          {JSON.stringify(data, null, 2)}
        </div>
    )
}

