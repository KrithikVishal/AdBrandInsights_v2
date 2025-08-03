import { useState, useEffect } from "react";
import { useParams } from "wouter";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Overview from "./overview";
import Campaigns from "./campaigns";
import Audience from "./audience";
import Creative from "./creative";
import Conversion from "./conversion";
import Reports from "./reports";
import Settings from "./settings";

export default function Dashboard() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(params.page || "overview");

  useEffect(() => {
    if (params.page) {
      setCurrentPage(params.page);
    }
  }, [params.page]);

  const renderPage = () => {
    switch (currentPage) {
      case "campaigns":
        return <Campaigns />;
      case "audience":
        return <Audience />;
      case "creative":
        return <Creative />;
      case "conversion":
        return <Conversion />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main className="flex-1 overflow-hidden">
        <Header title={currentPage} />
        
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="animate-fade-in">
            {renderPage()}
          </div>
        </div>
      </main>
    </div>
  );
}
