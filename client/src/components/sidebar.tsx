import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  Image, 
  TrendingUp, 
  FileText, 
  Settings, 
  Moon, 
  Sun,
  Menu,
  X,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/" },
  { icon: Target, label: "Campaigns", path: "/campaigns" },
  { icon: Users, label: "Audience", path: "/audience" },
  { icon: Image, label: "Creative", path: "/creative" },
  { icon: TrendingUp, label: "Conversion", path: "/conversion" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarVariants = {
    expanded: {
      width: 240,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    collapsed: {
      width: 80,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1,
        duration: 0.2
      }
    },
    collapsed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-screen sticky top-0 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="flex items-center space-x-2"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                >
                  <Brain className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    ADmyBRAND
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Insights
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-600 dark:text-gray-300"
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={item.path}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: isActive ? 0 : 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`h-5 w-5 ${isCollapsed ? "mx-auto" : "mr-3"}`} />
                  </motion.div>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className={`w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
          >
            <motion.div
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              className={isCollapsed ? "" : "mr-3"}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  variants={contentVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="font-medium"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      {/* Version Info */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="p-4 text-center"
          >
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Version 2.1.0
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              AI-Powered Analytics
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}