import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1">
        <SidebarTrigger />
        <SidebarInset>
          <div className="p-4 flex flex-1 flex-col gap-4">{children}</div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
