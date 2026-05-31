import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link, NavLink } from "react-router-dom";
import Photos from "../../assets/icons/photos.svg?react";
import { BookImage, Heart, Images, Share2 } from "lucide-react";

export function AppSidebar() {
  const navItems = [
    { title: "Albums", url: "/", icon: BookImage },
    { title: "Images", url: "/images", icon: Images },
    { title: "Favourite", url: "/images/favourite", icon: Heart },
    { title: "Shared", url: "/albums/shared", icon: Share2 },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-5 px-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild />
            <Link className="flex gap-2 items-center">
              <div className="bg-blue-600 size-8 flex justify-center items-center rounded-full">
                <Photos />
              </div>
              <span className="text-lg font-medium">SnapVault</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="ml-0" />

      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end={item.url === "/images"}
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-1.5 px-3 rounded-2xl ${isActive ? "text-sidebar-item-text-hover bg-sidebar-item-bg" : "text-sidebar-item-text hover:text-sidebar-item-text-hover hover:bg-sidebar-item-bg-hover"}`
                    }
                  >
                    <item.icon size={15} />
                    <span className="text-sm font-medium">{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>

      {/* <SidebarFooter /> */}

      <SidebarRail />
    </Sidebar>
  );
}
