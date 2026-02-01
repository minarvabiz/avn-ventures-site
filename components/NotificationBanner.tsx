import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { AlertTriangle } from 'lucide-react';

const NotificationBanner: React.FC = () => {
  const { appConfig } = useContent();

  if (!appConfig.notificationEnabled) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white px-4 py-3 text-sm font-medium relative z-[60] shadow-md border-b border-amber-700/20">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
        <div className="bg-white/20 p-1.5 rounded-full mr-3 animate-pulse">
           <AlertTriangle className="w-4 h-4 text-white" />
        </div>
        <span className="tracking-wide drop-shadow-sm">{appConfig.notificationMessage}</span>
      </div>
    </div>
  );
};

export default NotificationBanner;