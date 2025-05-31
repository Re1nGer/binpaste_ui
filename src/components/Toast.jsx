import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  Copy, 
  X, 
  AlertCircle, 
  Info, 
  AlertTriangle
} from 'lucide-react';

const Toast = ({ toast, onRemove, isDarkMode = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getTypeConfig = () => {
    const configs = {
      success: {
        icon: Check,
        color: isDarkMode ? 'bg-green-500' : 'bg-green-600',
        bgColor: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
        borderColor: isDarkMode ? 'border-green-500/20' : 'border-green-200',
        textColor: isDarkMode ? 'text-green-400' : 'text-green-700'
      },
      error: {
        icon: AlertCircle,
        color: isDarkMode ? 'bg-red-500' : 'bg-red-600',
        bgColor: isDarkMode ? 'bg-red-500/10' : 'bg-red-50',
        borderColor: isDarkMode ? 'border-red-500/20' : 'border-red-200',
        textColor: isDarkMode ? 'text-red-400' : 'text-red-700'
      },
      warning: {
        icon: AlertTriangle,
        color: isDarkMode ? 'bg-yellow-500' : 'bg-yellow-600',
        bgColor: isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-50',
        borderColor: isDarkMode ? 'border-yellow-500/20' : 'border-yellow-200',
        textColor: isDarkMode ? 'text-yellow-400' : 'text-yellow-700'
      },
      info: {
        icon: Info,
        color: isDarkMode ? 'bg-blue-500' : 'bg-blue-600',
        bgColor: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
        borderColor: isDarkMode ? 'border-blue-500/20' : 'border-blue-200',
        textColor: isDarkMode ? 'text-blue-400' : 'text-blue-700'
      },
      clipboard: {
        icon: Copy,
        color: isDarkMode ? 'bg-purple-500' : 'bg-purple-600',
        bgColor: isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50',
        borderColor: isDarkMode ? 'border-purple-500/20' : 'border-purple-200',
        textColor: isDarkMode ? 'text-purple-400' : 'text-purple-700'
      }
    };
    
    return configs[toast.type] || configs.info;
  };

  const config = getTypeConfig();
  const IconComponent = toast.icon || config.icon;

  const themeClasses = {
    background: isDarkMode ? 'bg-gray-800' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    subtext: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200'
  };

  return (
    <div
      className={`
        flex items-start space-x-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm
        ${themeClasses.background} ${themeClasses.border} ${config.borderColor}
        transition-all duration-300 ease-out transform
        ${isVisible && !isExiting 
          ? 'translate-x-0 opacity-100 scale-100' 
          : isExiting 
            ? 'translate-x-full opacity-0 scale-95'
            : 'translate-x-full opacity-0 scale-95'
        }
        max-w-sm w-full pointer-events-auto
      `}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-8 h-8 ${config.color} rounded-full flex items-center justify-center`}>
        <IconComponent className="w-4 h-4 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium ${themeClasses.text}`}>
          {toast.title}
        </div>
        {toast.message && (
          <div className={`text-xs mt-1 ${themeClasses.subtext}`}>
            {toast.message}
          </div>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className={`text-xs mt-2 ${config.textColor} hover:underline font-medium`}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleRemove}
        className={`flex-shrink-0 ${themeClasses.subtext} hover:${themeClasses.text} transition-colors`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;