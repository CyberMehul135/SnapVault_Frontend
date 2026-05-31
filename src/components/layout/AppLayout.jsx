import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Outlet } from "react-router-dom";
import { ModeToggle } from "../common/ModeToggle";
import { Toaster } from "sonner";
import { useTheme } from "@/theme/ThemeProvider";
import { AccountOptions } from "../common/AccountOptions";

export default function AppLayout() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <SidebarProvider style={{ "--sidebar-width": "256px" }}>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <header className="flex justify-between h-14 items-center gap-2 border-b px-4 bg-card">
            <SidebarTrigger className="-ml-1 text-muted-foreground cursor-pointer" />
            <div className="flex items-center gap-4">
              <AccountOptions />
              <ModeToggle />
            </div>
          </header>
          <main className="p-6 max-md:px-3">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>

      <Toaster theme={theme} richColors position="bottom-right" />
    </>
  );
}
