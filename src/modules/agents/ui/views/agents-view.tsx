"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Loading from "@/compo/Loading";
import Error from "@/compo/Error";
import { ResponsiveDialog } from "@/compo/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { useAgentFilters } from "../../hooks/use-agents-filters";

export const AgentsView = () => {
    const [filters]=useAgentFilters()
    const trpc = useTRPC();
    const { data, error } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }));

    if (error) throw error;

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">

            <DataTable data={data} columns={columns} />
        </div>
    )
}

