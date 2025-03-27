'use client';

import { ChevronsUpDown, Home, Lightbulb, LogOut, UserRound } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: Home,
  },
  {
    title: 'Ide',
    url: '/admin/ide',
    icon: Lightbulb,
  },
  {
    title: 'Pengguna',
    url: '/admin/pengguna',
    icon: UserRound,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/admin/login');
  };

  return (
    <Sidebar>
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className={`flex gap-2  items-center p-2 rounded-md ${pathname === item.url ? 'text-blue-600 bg-gray-100' : ''} `}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={'/logo.svg'} alt={'idafund'} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{'idafund'}</span>
                <span className="truncate text-xs">{'ideafundindonesia@gmail.com'}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side={isMobile ? 'bottom' : 'right'} align="end" sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={'/logo.svg'} alt={'idafund'} />
                  <AvatarFallback className="rounded-lg">IF</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{'idafund'}</span>
                  <span className="truncate text-xs text-blue-500">{'ideafundindonesia@gmail.com'}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
