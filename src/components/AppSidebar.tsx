import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Target, 
  Settings,
  PieChart,
  Calendar,
  LineChart,
  Crown,
  Home
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Receitas", url: "/receitas", icon: TrendingUp },
  { title: "Gastos", url: "/gastos", icon: TrendingDown },
  { title: "Assinaturas", url: "/assinaturas", icon: CreditCard },
  { title: "Investimentos", url: "/investimentos", icon: LineChart },
  { title: "Metas", url: "/metas", icon: Target },
  { title: "Premium", url: "/premium", icon: Crown },
  
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();

  const isActive = (path: string) => currentPath === path;

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon" className="neon-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg neon-glow flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg neon-text">Z</span>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="font-bold text-xl text-foreground neon-text">Zent</h2>
            <p className="text-sm text-muted-foreground neon-text-accent">Controle Financeiro</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-semibold tracking-wider neon-text-accent">
            MENU PRINCIPAL
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 font-medium",
                          isActive
                            ? "neon-button text-primary-foreground shadow-lg"
                            : "text-sidebar-foreground hover:neon-glow-accent hover:text-accent-foreground border border-transparent hover:border-accent/30"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden text-base">
                        {item.title}
                      </span>
                    </NavLink>
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