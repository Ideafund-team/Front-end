import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="">
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className='p-4'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
