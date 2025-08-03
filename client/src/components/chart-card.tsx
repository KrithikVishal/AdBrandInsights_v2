import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  index?: number;
  className?: string;
}

export function ChartCard({ title, children, index = 0, className = "" }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: "easeOut"
      }}
      className={className}
    >
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
          >
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          >
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}