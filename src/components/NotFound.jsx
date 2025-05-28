import React, { useState, useEffect } from 'react';
import { 
  FileX, 
  Clock, 
  Trash2, 
  Shield, 
  AlertCircle, 
  Home, 
  Plus,
  Search,
  ArrowLeft,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Paste404 = ({ 
  pasteId = null, 
  reason = 'not_found', // 'not_found' | 'expired' | 'burned' | 'deleted' | 'private'
  onGoBack = null,
  className = ""
}) => {

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const location = useLocation();

  const isDarkMode = location.state?.isDarkMode;

  const navigate = useNavigate();

  const getReasonConfig = () => {
    const configs = {
      not_found: {
        icon: FileX,
        title: "Paste Not Found",
        subtitle: "This paste doesn't exist or the link is incorrect",
        description: "The paste you're looking for might have been removed, or you may have entered an incorrect URL.",
        color: "blue",
        suggestions: [
          "Check the URL for typos",
          "Ask the sender for a new link",
          "The paste might have been deleted"
        ]
      },
      expired: {
        icon: Clock,
        title: "Paste Has Expired",
        subtitle: "This paste has reached its expiration date",
        description: "The creator set an expiration time for this paste, and it has now been automatically deleted for security.",
        color: "orange",
        suggestions: [
          "Contact the creator for a new paste",
          "Check if you have a local copy",
          "Create a new paste with similar content"
        ]
      },
      burned: {
        icon: Trash2,
        title: "Paste Was Burned",
        subtitle: "This was a 'burn after read' paste",
        description: "This paste was configured to be automatically deleted after the first view for maximum security.",
        color: "red",
        suggestions: [
          "This paste can never be recovered",
          "Contact the sender for the content",
          "Ask for a new paste if needed"
        ]
      },
      deleted: {
        icon: Trash2,
        title: "Paste Deleted",
        subtitle: "This paste has been removed",
        description: "The paste has been deleted by its creator or due to policy violations.",
        color: "red",
        suggestions: [
          "The content is permanently gone",
          "Contact the creator if needed",
          "Check if you have any backups"
        ]
      },
      private: {
        icon: Shield,
        title: "Private Paste",
        subtitle: "You don't have permission to view this paste",
        description: "This paste is set to private and can only be accessed by the creator or authorized users.",
        color: "purple",
        suggestions: [
          "Request access from the creator",
          "Check if you need to log in",
          "Verify you have the correct link"
        ]
      }
    };

    return configs[reason] || configs.not_found;
  };

  const config = getReasonConfig();
  const IconComponent = config.icon;

  const getColorClasses = (type = 'icon') => {
    const darkColors = {
      blue: {
        icon: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20',
        button: 'bg-blue-600 hover:bg-blue-700',
        accent: 'text-blue-400'
      },
      orange: {
        icon: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/20',
        button: 'bg-orange-600 hover:bg-orange-700',
        accent: 'text-orange-400'
      },
      red: {
        icon: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        button: 'bg-red-600 hover:bg-red-700',
        accent: 'text-red-400'
      },
      purple: {
        icon: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/20',
        button: 'bg-purple-600 hover:bg-purple-700',
        accent: 'text-purple-400'
      }
    };

    const lightColors = {
      blue: {
        icon: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700',
        accent: 'text-blue-600'
      },
      orange: {
        icon: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        button: 'bg-orange-600 hover:bg-orange-700',
        accent: 'text-orange-600'
      },
      red: {
        icon: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        button: 'bg-red-600 hover:bg-red-700',
        accent: 'text-red-600'
      },
      purple: {
        icon: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700',
        accent: 'text-purple-600'
      }
    };

    const colors = isDarkMode ? darkColors : lightColors;
    return colors[config.color]?.[type] || colors.blue[type];
  };

  const themeClasses = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
      muted: isDarkMode ? 'text-gray-500' : 'text-gray-500'
    },
    card: {
      bg: isDarkMode ? 'bg-gray-800' : 'bg-white',
      border: isDarkMode ? 'border-gray-700' : 'border-gray-200'
    },
    button: {
      secondary: isDarkMode 
        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} flex items-center justify-center p-4 ${className}`}>
      <div className={`max-w-2xl w-full ${isAnimating ? 'animate-in fade-in slide-in-from-bottom-4 duration-700' : ''}`}>
        {/* Main Error Card */}
        <div className={`${themeClasses.card.bg} ${themeClasses.card.border} border rounded-2xl p-8 shadow-xl`}>
          {/* Icon and Main Message */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${getColorClasses('bg')} ${getColorClasses('border')} border-2 rounded-full mb-6`}>
              <IconComponent className={`w-10 h-10 ${getColorClasses('icon')}`} />
            </div>
            
            <h1 className={`text-3xl font-bold ${themeClasses.text.primary} mb-2`}>
              {config.title}
            </h1>
            
            <p className={`text-lg ${themeClasses.text.secondary} mb-4`}>
              {config.subtitle}
            </p>
            
            {pasteId && (
              <div className={`inline-flex items-center space-x-2 px-4 py-2 ${themeClasses.card.bg} ${themeClasses.card.border} border rounded-lg`}>
                <AlertCircle className={`w-4 h-4 ${getColorClasses('accent')}`} />
                <span className={`text-sm ${themeClasses.text.muted} font-mono`}>
                  Paste ID: {pasteId}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className={`${getColorClasses('bg')} ${getColorClasses('border')} border rounded-lg p-4 mb-6`}>
            <p className={`${themeClasses.text.secondary} leading-relaxed`}>
              {config.description}
            </p>
          </div>

          {/* Suggestions */}
          <div className="mb-8">
            <h3 className={`text-sm font-semibold ${getColorClasses('accent')} mb-3 uppercase tracking-wide`}>
              What you can do:
            </h3>
            <ul className="space-y-2">
              {config.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className={`w-1.5 h-1.5 ${getColorClasses('bg')} rounded-full mt-2 flex-shrink-0`}></div>
                  <span className={`${themeClasses.text.secondary} text-sm leading-relaxed`}>
                    {suggestion}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">

            <button
                onClick={() => navigate('/bin')}
                className={`flex items-center justify-center space-x-2 px-6 py-3 ${getColorClasses('button')} text-white rounded-lg transition-all duration-200 font-medium`}
            >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
            </button>
              
            <button
                onClick={() => navigate('/bin')}
                className={`flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 font-medium`}
            >
                <Plus className="w-4 h-4" />
                <span>Create New Paste</span>
            </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleRetry}
                className={`flex items-center justify-center px-4 py-3 ${themeClasses.button.secondary} rounded-lg transition-all duration-200`}
                title="Retry"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              
              {onGoBack && (
                <button
                  onClick={onGoBack}
                  className={`flex items-center justify-center px-4 py-3 ${themeClasses.button.secondary} rounded-lg transition-all duration-200`}
                  title="Go Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className={`mt-6 ${themeClasses.card.bg} ${themeClasses.card.border} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}>
            Need Help?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Search className={`w-5 h-5 ${getColorClasses('accent')} mt-0.5 flex-shrink-0`} />
              <div>
                <h4 className={`font-medium ${themeClasses.text.primary} text-sm`}>
                  Search Tips
                </h4>
                <p className={`${themeClasses.text.secondary} text-xs mt-1`}>
                  Double-check the paste ID and make sure there are no extra characters
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ExternalLink className={`w-5 h-5 ${getColorClasses('accent')} mt-0.5 flex-shrink-0`} />
              <div>
                <h4 className={`font-medium ${themeClasses.text.primary} text-sm`}>
                  Contact Support
                </h4>
                <p className={`${themeClasses.text.secondary} text-xs mt-1`}>
                  Report issues or ask questions about missing pastes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className={`text-sm ${themeClasses.text.muted}`}>
            BinPaste • Secure code sharing made easy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Paste404;