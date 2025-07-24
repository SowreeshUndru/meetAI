"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import NewAgentDilog from "./NewAgentDilog"
import { useState } from "react"
function ListHeader() {

  const [isDialogopen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewAgentDilog open={isDialogopen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => {
            setIsDialogOpen((prev) => !prev)
          }}>
            <PlusIcon></PlusIcon>
            New Agent
          </Button >
        </div>
      </div>
    </>
  )
}

export default ListHeader