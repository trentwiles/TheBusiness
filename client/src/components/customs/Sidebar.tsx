import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type props = {
  children: React.ReactNode;
  dataMode: "Customer" | "Dasher" | "Administrator";
  pageSubclass?: string;
  pageSubclassTo?: string;
  pageTitle?: string;
};

export default function Sidebar(props: props) {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader subclass={props.pageSubclass} pageName={props.pageTitle}  />
        <div className="flex flex-1">
          <AppSidebar  dataMode={props.dataMode} />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {props.children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
