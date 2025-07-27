import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAgentFilters } from "../../hooks/use-agents-filters";





function AgentSearch() {
    const [filters, setFilters] = useAgentFilters();




    return (
        <div>
            <Input
            placeholder="searchAgent"
            className="h-9 bg-white w-[200px] pl-7"
            value ={filters.search}
            onChange={(e)=>setFilters({search:e.target.value})}
            
            />
            <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-forgrouund" />
        </div>
    )
}

export default AgentSearch