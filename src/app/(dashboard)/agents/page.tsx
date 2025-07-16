
import { AgentsView } from "@/modules/agents/ui/views/agents-view"
import { getQueryClient,trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Loading from "@/compo/Loading";
import Error from "@/compo/Error";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


 async function page() {

  const queryClient=getQueryClient();
  void await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());



  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading title="loading" description="please wait"/>}>
      <ErrorBoundary fallback={<AgentsViewError/>}>
      <AgentsView/>
      </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}



export const AgentsViewError=()=>{
  return (
    <Error
    title="Agents failed to load"
    description={ "Something went wrong"}
  />
  )
}



export default page