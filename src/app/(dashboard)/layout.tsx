import { SidebarProvider } from "@/components/ui/sidebar";
import {DashboardSidebar} from "@/compo/Dashboardsidebar";
import {DashboardNavbar} from "@/compo/DashboardNavbar";
interface props{
    children: React.ReactNode
}
export default function layout({children}:props){
    return (
        <SidebarProvider>
            <DashboardSidebar/>
           <main className="flex flex-col h-screen w-screen bg-muted">
             <DashboardNavbar/>
             {children}
           </main>
        </SidebarProvider>
    );
};