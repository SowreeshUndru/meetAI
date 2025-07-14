import { SidebarProvider } from "@/components/ui/sidebar";
import {DashboardSidebar} from "@/compo/Dashboardsidebar";
interface props{
    children: React.ReactNode
}
export default function layout({children}:props){
    return (
        <SidebarProvider>
            <DashboardSidebar/>
           <main className="flex flex-col h-screen w-screen bg-muted">
             
             {children}
           </main>
        </SidebarProvider>
    );
};