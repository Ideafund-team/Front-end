import { AdminSidebar } from '@/components/admin-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-col flex flex-1" style={{ flexDirection: 'column' }}>
        <SidebarTrigger />
        <SidebarInset>
          <div className="p-4">{children}</div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
