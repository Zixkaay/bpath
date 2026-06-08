"use client";

import { useAppStore } from '@/store/useAppStore';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function NotificationToast() {
  const { notification, hideNotification } = useAppStore();

  return (
    <AnimatePresence>
      {notification.visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-[#0a0a0a] border border-[#262626] text-white px-5 py-4 rounded-xl shadow-2xl max-w-sm pointer-events-auto"
        >
          {notification.type === 'success' && (
            <CheckCircle className="text-green-500 shrink-0" size={20} />
          )}
          {notification.type === 'info' && (
            <Info className="text-[#d4af37] shrink-0" size={20} />
          )}
          {notification.type === 'error' && (
            <AlertTriangle className="text-red-500 shrink-0" size={20} />
          )}

          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#A3A3A3]">Message</p>
            <p className="text-sm font-medium text-white/95 leading-normal">{notification.message}</p>
          </div>

          <button
            onClick={hideNotification}
            className="text-[#A3A3A3] hover:text-white transition-colors cursor-pointer p-1"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
