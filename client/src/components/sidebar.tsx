import { TrendingUp, LayoutDashboard, Megaphone, Users, Image, Target, FileText, Settings, User } from "lucide-react";
import { useLocation } from "wouter";

const navigationItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, path: "/dashboard/overview" },
  { id: "campaigns", label: "Campaign Management", icon: Megaphone, path: "/dashboard/campaigns" },
  { id: "audience", label: "Audience Analytics", icon: Users, path: "/dashboard/audience" },
  { id: "creative", label: "Creative Performance", icon: Image, path: "/dashboard/creative" },
  { id: "conversion", label: "Conversion Tracking", icon: Target, path: "/dashboard/conversion" },
  { id: "reports", label: "Reports & Export", icon: FileText, path: "/dashboard/reports" },
  { id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const [, setLocation] = useLocation();

  const handleNavigation = (item: typeof navigationItems[0]) => {
    onNavigate(item.id);
    setLocation(item.path);
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">ADmyBRAND</h1>
            <p className="text-muted-foreground text-sm">Insights</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`nav-item w-full ${currentPage === item.id ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center space-x-3 p-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
          <User className="w-5 h-5" />
          <span className="text-sm">John Smith</span>
        </button>
      </div>
    </aside>
  );
}
