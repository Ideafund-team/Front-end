'use client';

import { HandCoins, Home, Lightbulb, WalletMinimal } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/user/dashboard',
    icon: Home,
  },
  {
    title: 'Ide',
    url: '/user/ide',
    icon: Lightbulb,
  },
  {
    title: 'Investor',
    url: '/user/investor',
    icon: HandCoins,
  },
  {
    title: 'Investasi',
    url: '/user/investasi',
    icon: WalletMinimal,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent className="md:mt-20">
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
    </Sidebar>
  );
}
