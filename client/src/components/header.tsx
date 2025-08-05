import { Bell, Search } from "lucide-react";
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
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-semibold text-white">{pageTitles[title] || title}</h2>
        <span className="px-3 py-1 bg-green-900 text-green-200 rounded-full text-sm font-medium">
          Live
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-700">
          <Bell className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-700">
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
