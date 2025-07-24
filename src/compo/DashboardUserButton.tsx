"use client";
import { useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerFooter, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "./Generated_avatar";
import { ChevronDownIcon, CreditCard, LogOut, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';


export default function DashboardUserButton() {
  const router=useRouter();
  const session = useSession();
  // console.log("sowreeshDebugcontinue");
  // console.log("debug1:",session.data?.user.id);
  // console.log("sowreeshDebugbreak");
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button className="gap-x-2 rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
            {session.data?.user.image ? (
              <Avatar>
                <AvatarImage src={session.data.user.image} />
              </Avatar>
            ) : (
              <GeneratedAvatar
                seed={session.data?.user.email || session.data?.user.name || "user"}
                variant="initials"
                className="size-9 mr-3"
              />
            )}
            <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
              <p>{session.data?.user.email || session.data?.user.name}</p>
            </div>
            <ChevronDownIcon className="size-4 shrink-0" />
          </button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader >
            <DrawerTitle>{session.data?.user.email}</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={() => { }}>
              <CreditCard className="size-4" />
              Billing
            </Button>
            <Button
              variant="outline"
              onClick={() => { signOut({ callbackUrl: "/auth/signin" }) }}>
              <LogOutIcon className="size-4 text-black" />
              LogOut
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="gap-x-2 rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {session.data?.user.image ? (
          <Avatar>
            <AvatarImage src={session.data.user.image}></AvatarImage>
          </Avatar>
        ) : <GeneratedAvatar
          seed={session.data?.user.email || session.data?.user.name || "user"}
          variant="initials"
          className="size-9 mr-3"
        />}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p>
            {session.data?.user.email || session.data?.user.name}
          </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{session.data?.user.email}</span>
            <span className=" text-sm font-normal text-muted-foreground truncate">{session.data?.user.id}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between ">
          Billing
          <CreditCard className=" size-4" />
        </DropdownMenuItem >
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between " onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


  );
}
