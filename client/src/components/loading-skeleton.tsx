import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "chart";
}

export function LoadingSkeleton({ className = "", variant = "card" }: LoadingSkeletonProps) {
  const baseClasses = "bg-gray-200 dark:bg-gray-700 rounded animate-pulse";
  
  const variants = {
    card: "h-32 w-full",
    text: "h-4 w-3/4",
    circle: "h-8 w-8 rounded-full",
    chart: "h-64 w-full",
  };

  return (
    <motion.div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

interface SkeletonGroupProps {
  count: number;
  variant?: "card" | "text" | "circle" | "chart";
  className?: string;
}

export function SkeletonGroup({ count, variant = "card", className = "" }: SkeletonGroupProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <LoadingSkeleton variant={variant} />
        </motion.div>
      ))}
    </div>
  );
}