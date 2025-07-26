"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetone } from "../../types"
import { GeneratedAvatar } from "@/compo/Generated_avatar"
import { CornerRightDownIcon ,CornerDownRightIcon, VideoIcon} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AgentGetone>[] = [
  {
    accessorKey: "Name",
    header: "Agent Name",
    cell: ({ row }) => {
      const seed = row.original?.name ?? "unknown"; // fallback to "unknown" if name is undefined
    
      return (
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar 
              variant="bottts"
              seed={seed}  
              className="size-6"
            />
            <span className="font-semibold capitalize">{seed}</span>
          </div>
          <div className="flex items-center gap-x-2"></div>
          <div className="flex items-center gap-x-2">
              <CornerDownRightIcon className="size-3 text-muted-foreground" />
              <span className="text-small text-muted-foreground max-w-[200px] truncate">
                {
                  row.original?.instructions
                }
              </span>
          </div>
          
        </div>
      )
    },
    
  },{
    accessorKey:"meetingCount",
    header:"Meetings",
    cell:({row})=>(
      <Badge>
        <VideoIcon className="text-blue-700"/>
        {/* {row.original.meetingCount} {row.original.meetingCount===1 ?"meeting":"meetings" } */}
      </Badge>
    )
  }
 
]