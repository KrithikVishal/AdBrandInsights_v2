import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  index: number;
}

export function MetricCard({ title, value, change, changeType, icon: Icon, index }: MetricCardProps) {
  const changeColor = {
    positive: "text-green-600 dark:text-green-400",
    negative: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="relative overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </CardTitle>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </CardHeader>
        <CardContent className="relative z-10">
          <motion.div 
            className="text-2xl font-bold text-gray-900 dark:text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          >
            {value}
          </motion.div>
          <motion.p 
            className={`text-xs ${changeColor[changeType]} flex items-center mt-1`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
          >
            <motion.span
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
            >
              {change}
            </motion.span>
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}