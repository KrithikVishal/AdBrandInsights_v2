import { Bell, Search } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
}

const pageTitles: Record<string, string> = {
  overview: "Overview Dashboard",
  campaigns: "Campaign Management",
  audience: "Audience Analytics",
  creative: "Creative Performance",
  conversion: "Conversion Tracking",
  reports: "Reports & Export",
  settings: "Settings",
};

export default function Header({ title }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-card border-b border-border p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-semibold">{pageTitles[title] || title}</h2>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
          Live
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
          <Button
            variant={theme === "light" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setTheme("light")}
            className="px-3 py-1"
          >
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setTheme("dark")}
            className="px-3 py-1"
          >
            Dark
          </Button>
        </div>
        
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
