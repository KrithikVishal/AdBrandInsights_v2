import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastNotificationProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
  error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
};

function ToastNotification({ toast, onDismiss }: ToastNotificationProps) {
  const Icon = toastIcons[toast.type];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative p-4 rounded-lg border shadow-lg ${toastStyles[toast.type]} max-w-sm w-full`}
    >
      <div className="flex items-start space-x-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Icon className="h-5 w-5 mt-0.5" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <motion.h4
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="font-medium text-sm"
          >
            {toast.title}
          </motion.h4>
          {toast.description && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-sm opacity-90 mt-1"
            >
              {toast.description}
            </motion.p>
          )}
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(toast.id)}
            className="h-6 w-6 p-0 hover:bg-black/10 dark:hover:bg-white/10"
          >
            <X className="h-3 w-3" />
          </Button>
        </motion.div>
      </div>
      
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-lg"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: (toast.duration || 5000) / 1000, ease: "linear" }}
      />
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            toast={toast}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Toast manager hook
export function useToastManager() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    dismissToast,
    showSuccess: (title: string, description?: string) => 
      addToast({ type: "success", title, description }),
    showError: (title: string, description?: string) => 
      addToast({ type: "error", title, description }),
    showWarning: (title: string, description?: string) => 
      addToast({ type: "warning", title, description }),
    showInfo: (title: string, description?: string) => 
      addToast({ type: "info", title, description }),
  };
}