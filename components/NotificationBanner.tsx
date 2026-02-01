import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { AlertTriangle, Info } from 'lucide-react';

const NotificationBanner: React.FC = () => {
  const { appConfig } = useContent();

  if (!appConfig.notificationEnabled) return null;

  return (
    <div className="bg-yellow-400 text-yellow-950 px-4 py-3 text-sm font-semibold relative z-[60] shadow-md border-b border-yellow-500">
      <div className="max-w-7xl mx-auto flex items-center justify-center text-center animate-pulse">
        <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
        <span>{appConfig.notificationMessage}</span>
      </div>
    </div>
  );
};

export default NotificationBanner;