
import { ResponsiveDialog } from "@/compo/ResponsiveDialog"
import AgentForm from "./AgentForm";
interface NewAgentsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void
}



function NewAgentDilog({
    open,
    onOpenChange
}: NewAgentsDialogProps) {
    return (
        <ResponsiveDialog
            title="NewAgent"
            description="CreateNewAgent"
            onOpenChange={onOpenChange}
            open={open}
        >
            <AgentForm 
            onSuccess={()=>{onOpenChange(false)}}
            onCancel={()=>{onOpenChange(false)}}    
            />
        </ResponsiveDialog>
    )
}

export default NewAgentDilog