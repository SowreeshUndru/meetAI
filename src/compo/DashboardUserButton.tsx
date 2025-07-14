"use client";
import { useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "./Generated_avatar";
import { ChevronDownIcon, CreditCard, LogOut, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
export default function DashboardUserButton() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
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
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between " onClick={() => signOut({ callbackUrl: "/api/auth/signin" })}>
          Logout
          <LogOutIcon  className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


  );
}
