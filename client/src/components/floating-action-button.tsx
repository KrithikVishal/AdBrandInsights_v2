import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Download, Share2 } from "lucide-react";
import { useState } from "react";

interface FABProps {
  onExportPDF?: () => void;
  onExportCSV?: () => void;
  onShare?: () => void;
  onCreateReport?: () => void;
}

export function FloatingActionButton({ onExportPDF, onExportCSV, onShare, onCreateReport }: FABProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: FileText, label: "Create Report", onClick: onCreateReport, color: "bg-blue-600 hover:bg-blue-700" },
    { icon: Download, label: "Export PDF", onClick: onExportPDF, color: "bg-green-600 hover:bg-green-700" },
    { icon: Download, label: "Export CSV", onClick: onExportCSV, color: "bg-purple-600 hover:bg-purple-700" },
    { icon: Share2, label: "Share", onClick: onShare, color: "bg-orange-600 hover:bg-orange-700" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        className="space-y-3 mb-3"
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ scale: 0, y: 20 }}
              animate={isOpen ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium whitespace-nowrap"
              >
                {action.label}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="sm"
                  onClick={action.onClick}
                  className={`h-12 w-12 rounded-full shadow-lg ${action.color} text-white`}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl"
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="h-6 w-6" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}