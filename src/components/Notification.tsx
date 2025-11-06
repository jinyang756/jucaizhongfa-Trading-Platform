import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../contexts/NotificationContext';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const Notification: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  // 获取通知图标和样式
  const getNotificationStyle = (type: string) => {
    switch (type) {
      case 'success':
        return {
          icon: '✅',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          textColor: 'text-green-400',
        };
      case 'error':
        return {
          icon: '❌',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          textColor: 'text-red-400',
        };
      case 'warning':
        return {
          icon: '⚠️',
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/30',
          textColor: 'text-yellow-400',
        };
      case 'info':
        return {
          icon: 'ℹ️',
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30',
          textColor: 'text-blue-400',
        };
      default:
        return {
          icon: 'ℹ️',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30',
          textColor: 'text-gray-400',
        };
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const style = getNotificationStyle(notification.type);

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`rounded-lg border ${style.bgColor} ${style.borderColor} p-4 shadow-lg backdrop-blur-sm`}
            >
              <div className="flex items-start">
                <span className={`text-xl mr-3 ${style.textColor}`}>{style.icon}</span>
                <div className="flex-1">
                  <h4 className={`font-bold ${style.textColor}`}>{notification.title}</h4>
                  <p className="text-gray-300 text-sm mt-1">{notification.message}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
