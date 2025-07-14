"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import DashboardUserButton from "./DashboardUserButton";
import { SessionProvider } from "next-auth/react";
const firstSection = [
    {
        icon: VideoIcon,
        label: "meetings",
        href: "/meetings"

    }, {
        icon: BotIcon,
        label: "Agents",
        href: "/agents"

    }
]
const secondsection = [
    {
        icon: StarIcon,
        label: "upgarde",
        href: "/upgarde"

    }
]
export const DashboardSidebar = () => {
    const pathname = usePathname();
    //    const pathname="/agents";
    return (
        <Sidebar className="" >
            <SidebarHeader className="text-sidebar-accent-foreground  ">
                <Link href="/" className="flex items-center gap-2 px-2 pt-2 h-auto w-auto">
                    <Image src="/logo.png" height={80} width={80} alt="meet.ai" className="rounded-full" />
                    <p className="text-2xl font-semibold">meet.ai</p>
                </Link>
            </SidebarHeader>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]" />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                firstSection.map((item, index) => {
                                    return (
                                        <SidebarMenuItem key={index} className="">
                                            <SidebarMenuButton key={index} className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                                pathname === item.href && "bg-linear-to-r/oklch  border-[#5D6B68]/10 "
                                            )}
                                                isActive={pathname === item.href}  // Check if the current path matches the item's href
                                            >
                                                <Link href={item.href} className="flex items-center gap-2">
                                                    <item.icon className="h-5 w-5" />
                                                    <span className={`text-sm font-medium tracking-tight `} >{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="px-4 py-2">
                    <Separator className="opacity-10 text-[#5D6B68]" />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                secondsection.map((item, index) => {
                                    return (
                                        <SidebarMenuItem key={index} className="">
                                            <SidebarMenuButton key={index} className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                                pathname === item.href && "bg-linear-to-r/oklch  border-[#5D6B68]/10 "
                                            )}
                                                isActive={pathname === item.href}  // Check if the current path matches the item's href
                                            >
                                                <Link href={item.href} className="flex items-center gap-2">
                                                    <item.icon className="h-5 w-5" />
                                                    <span className={`text-sm font-medium tracking-tight `} >{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white" >
                <SessionProvider>
                    <DashboardUserButton />
                </SessionProvider>
            </SidebarFooter>
        </Sidebar>
    );
}