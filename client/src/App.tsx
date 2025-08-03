import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/toaster";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Components
import { Sidebar } from "@/components/sidebar";
import { FloatingActionButton } from "@/components/floating-action-button";
import { ToastContainer, useToastManager } from "@/components/toast-notifications";
import { LoadingScreen } from "@/components/loading-screen";

// Pages
import Overview from "@/pages/overview";
import Campaigns from "@/pages/campaigns";
import Audience from "@/pages/audience";
import Creative from "@/pages/creative";
import Conversion from "@/pages/conversion";
import Reports from "@/pages/reports";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function AppContent() {
  const { toasts, dismissToast, showSuccess, showInfo } = useToastManager();
  const [showLoading, setShowLoading] = useState(true);

  const handleExportPDF = () => {
    showSuccess("PDF Export", "Your report has been exported successfully.");
  };

  const handleExportCSV = () => {
    showSuccess("CSV Export", "Your data has been exported successfully.");
  };

  const handleShare = () => {
    showInfo("Share", "Share functionality coming soon!");
  };

  const handleCreateReport = () => {
    showInfo("Create Report", "Report creation wizard coming soon!");
  };

  if (showLoading) {
    return <LoadingScreen onComplete={() => setShowLoading(false)} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
    >
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Overview} />
            <Route path="/campaigns" component={Campaigns} />
            <Route path="/audience" component={Audience} />
            <Route path="/creative" component={Creative} />
            <Route path="/conversion" component={Conversion} />
            <Route path="/reports" component={Reports} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>

      {/* Global Components */}
      <FloatingActionButton 
        onExportPDF={handleExportPDF}
        onExportCSV={handleExportCSV}
        onShare={handleShare}
        onCreateReport={handleCreateReport}
      />
      
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      <Toaster />
    </motion.div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <AppContent />
        </motion.div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}