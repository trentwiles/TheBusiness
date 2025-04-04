"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { toast } from "sonner";

type user = {
  name: string;
  email: string;
  avatar: string;
};

export function NavUser() {
  const { isMobile } = useSidebar();

  const [isPending, setIsPending] = useState(true);
  const [userData, setUserData] = useState<user>();
  const { login, logout, user } = useAuth();

  useEffect(() => {
    if (user == undefined) {
      setIsPending(false)
      return
    }
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/me`, {
      headers: {
        Authorization: user.token
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((apiData) => {
        setUserData({
          name: apiData.name,
          email: apiData.email,
          avatar: apiData.avatar,
        });
      })
      .catch(() => {
        // non-200 response
        // we assume the token has expired, or was forged, so it is destroyed
        logout()
        setIsPending(false);
      });
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isPending ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
                <Skeleton className="ml-auto h-4 w-4" />
              </SidebarMenuButton>
            ) : (user != undefined) ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={userData?.avatar} alt={userData?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userData?.name}</span>
                  <span className="truncate text-xs">{userData?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            ) : (
              <></>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              {isPending ? (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="mt-1 h-3 w-16" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userData?.avatar} alt={userData?.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {userData?.name}
                    </span>
                    <span className="truncate text-xs">{userData?.email}</span>
                  </div>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <Link to="/logout">
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
