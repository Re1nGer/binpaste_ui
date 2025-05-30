import React, { useState, useRef, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  CalendarDays, 
  CalendarRange,
  Infinity, 
  ChevronDown, 
  CalendarPlus,
  CalendarX,
  Info 
} from 'lucide-react';

const ExpiryDropdown = ({ value = 'never', onChange, isDarkMode = true, className = "", expiresAt, createdAt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const expiryOptions = [
    // Forever Option
    { 
      value: 'never', 
      label: 'Never expires', 
      description: 'Keep forever', 
      icon: Infinity, 
      color: 'purple',
      category: 'forever',
      badge: 'Forever'
    },
    
    // Short Term Options
    { 
      value: '60', 
      label: '1 hour', 
      description: '60 minutes', 
      icon: Clock, 
      color: 'red',
      category: 'short',
      badge: '1h'
    },
    { 
      value: '360', 
      label: '6 hours', 
      description: '360 minutes', 
      icon: Clock, 
      color: 'orange',
      category: 'short',
      badge: '6h'
    },
    { 
      value: '720', 
      label: '12 hours', 
      description: '720 minutes', 
      icon: Clock, 
      color: 'orange',
      category: 'short',
      badge: '12h'
    },

    // Medium Term Options
    { 
      value: '1440', 
      label: '1 day', 
      description: '24 hours', 
      icon: Calendar, 
      color: 'yellow',
      category: 'medium',
      badge: '1d'
    },
    { 
      value: '2880', 
      label: '2 days', 
      description: '48 hours', 
      icon: Calendar, 
      color: 'yellow',
      category: 'medium',
      badge: '2d'
    },
    { 
      value: '4320', 
      label: '3 days', 
      description: '72 hours', 
      icon: Calendar, 
      color: 'yellow',
      category: 'medium',
      badge: '3d'
    },
    { 
      value: '10080', 
      label: '1 week', 
      description: '7 days', 
      icon: Calendar, 
      color: 'green',
      category: 'medium',
      badge: '1w'
    },
    { 
      value: '20160', 
      label: '2 weeks', 
      description: '14 days', 
      icon: Calendar, 
      color: 'green',
      category: 'medium',
      badge: '2w'
    },

    // Long Term Options
    { 
      value: '43200', 
      label: '1 month', 
      description: '30 days', 
      icon: CalendarDays, 
      color: 'blue',
      category: 'long',
      badge: '1m'
    },
    { 
      value: '129600', 
      label: '3 months', 
      description: '90 days', 
      icon: CalendarDays, 
      color: 'blue',
      category: 'long',
      badge: '3m'
    },
    { 
      value: '525600', 
      label: '1 year', 
      description: '365 days', 
      icon: CalendarRange, 
      color: 'indigo',
      category: 'long',
      badge: '1y'
    }
  ];

  const categories = {
    forever: { title: 'PERMANENT', options: expiryOptions.filter(opt => opt.category === 'forever') },
    short: { title: 'SHORT TERM', options: expiryOptions.filter(opt => opt.category === 'short') },
    medium: { title: 'MEDIUM TERM', options: expiryOptions.filter(opt => opt.category === 'medium') },
    long: { title: 'LONG TERM', options: expiryOptions.filter(opt => opt.category === 'long') }
  };

  const selectedOption = expiryOptions.find(opt => opt.value === value) || expiryOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const getColorClasses = (color, type = 'icon') => {
    const darkColorMap = {
      purple: type === 'icon' ? 'text-purple-400' : type === 'badge' ? 'bg-purple-600' : 'border-purple-500',
      red: type === 'icon' ? 'text-red-400' : type === 'badge' ? 'bg-red-600' : 'border-red-500',
      orange: type === 'icon' ? 'text-orange-400' : type === 'badge' ? 'bg-orange-600' : 'border-orange-500',
      yellow: type === 'icon' ? 'text-yellow-400' : type === 'badge' ? 'bg-yellow-600' : 'border-yellow-500',
      green: type === 'icon' ? 'text-green-400' : type === 'badge' ? 'bg-green-600' : 'border-green-500',
      blue: type === 'icon' ? 'text-blue-400' : type === 'badge' ? 'bg-blue-600' : 'border-blue-500',
      indigo: type === 'icon' ? 'text-indigo-400' : type === 'badge' ? 'bg-indigo-600' : 'border-indigo-500'
    };

    const lightColorMap = {
      purple: type === 'icon' ? 'text-purple-600' : type === 'badge' ? 'bg-purple-500' : 'border-purple-400',
      red: type === 'icon' ? 'text-red-600' : type === 'badge' ? 'bg-red-500' : 'border-red-400',
      orange: type === 'icon' ? 'text-orange-600' : type === 'badge' ? 'bg-orange-500' : 'border-orange-400',
      yellow: type === 'icon' ? 'text-yellow-600' : type === 'badge' ? 'bg-yellow-500' : 'border-yellow-400',
      green: type === 'icon' ? 'text-green-600' : type === 'badge' ? 'bg-green-500' : 'border-green-400',
      blue: type === 'icon' ? 'text-blue-600' : type === 'badge' ? 'bg-blue-500' : 'border-blue-400',
      indigo: type === 'icon' ? 'text-indigo-600' : type === 'badge' ? 'bg-indigo-500' : 'border-indigo-400'
    };

    const colorMap = isDarkMode ? darkColorMap : lightColorMap;
    return colorMap[color] || colorMap.purple;
  };

  const getThemeClasses = () => {
    return {
      // Button classes
      button: isDarkMode 
        ? 'bg-gray-800 border-gray-600 text-white hover:border-gray-500' 
        : 'bg-white border-gray-300 text-gray-900 hover:border-gray-400',
      
      // Dropdown menu classes
      dropdown: isDarkMode 
        ? 'bg-gray-800 border-gray-600' 
        : 'bg-white border-gray-300',
      
      // Option classes
      option: isDarkMode 
        ? 'hover:bg-gray-700' 
        : 'hover:bg-gray-100',
      
      // Selected option classes
      selectedOption: isDarkMode 
        ? 'bg-gray-700 border-purple-500' 
        : 'bg-purple-50 border-purple-400',
      
      // Category header classes
      categoryHeader: isDarkMode 
        ? 'text-gray-400 bg-gray-750 border-gray-700' 
        : 'text-gray-600 bg-gray-100 border-gray-200',
      
      // Preview classes
      preview: isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-gray-50 border-gray-200',
      
      // Text colors
      label: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      primaryText: isDarkMode ? 'text-white' : 'text-gray-900',
      secondaryText: isDarkMode ? 'text-gray-400' : 'text-gray-600',
      tertiaryText: isDarkMode ? 'text-gray-300' : 'text-gray-700',
      
      // Border colors
      border: isDarkMode ? 'border-gray-600' : 'border-gray-200',
      divider: isDarkMode ? 'border-gray-600' : 'border-gray-200',
      
      // Focus ring
      focusRing: 'focus:ring-2 focus:ring-purple-500 focus:border-transparent'
    };
  };

  const theme = getThemeClasses();

  const getExpirationInfo = () => {
    const now = new Date();
    
    if (value === 'never') {
      return {
        created: now.toLocaleString(),
        expires: 'Never',
        description: 'This paste will be stored indefinitely and never automatically deleted.'
      };
    }

    if (expiresAt) {
        let expiresIn = new Date(expiresAt);
        let createdDate = new Date(createdAt);
        return {
            created: createdDate.toLocaleString(),
            expires: expiresIn.toLocaleString(),
            description: `This paste will be automatically deleted at ${expiresIn}}.`
        }
    }

    const minutes = parseInt(value);

    const expireDate = new Date(now.getTime() + minutes * 60000);
    
    const timeUnitMap = {
      60: 'hour',
      360: '6 hours', 
      720: '12 hours',
      1440: 'day',
      2880: '2 days',
      4320: '3 days',
      10080: 'week',
      20160: '2 weeks',
      43200: 'month',
      129600: '3 months',
      525600: 'year'
    };
    
    const timeUnit = timeUnitMap[minutes] || `${minutes} minutes`;
    
    return {
      created: now.toLocaleString(),
      expires: expireDate.toLocaleString(),
      description: `This paste will be automatically deleted after ${timeUnit}.`
    };
  };

  const expirationInfo = getExpirationInfo();

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <label className={`block text-sm font-medium ${theme.label}`}>
          Paste expires after:
        </label>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-4 py-3 ${theme.button} border rounded-lg ${theme.focusRing} text-left flex items-center justify-between transition-all duration-200 ${
              isOpen ? `ring-2 ring-purple-500 ${isDarkMode ? 'border-purple-500' : 'border-purple-400'}` : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <selectedOption.icon className={`w-4 h-4 ${getColorClasses(selectedOption.color, 'icon')}`} />
              <div>
                <div className={`font-medium ${theme.primaryText}`}>{selectedOption.label}</div>
                <div className={`text-xs ${theme.secondaryText}`}>{selectedOption.description}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded ${getColorClasses(selectedOption.color, 'badge')} text-white`}>
                {selectedOption.badge}
              </span>
              <ChevronDown 
                className={`w-4 h-4 ${theme.secondaryText} transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`} 
              />
            </div>
          </button>
          
          {isOpen && (
            <div className={`absolute top-full left-0 w-full mt-1 ${theme.dropdown} border rounded-lg shadow-xl z-20 max-h-80 overflow-x-hidden overflow-y-auto`}>
              {Object.entries(categories).map(([categoryKey, category]) => (
                <div key={categoryKey}>
                  {/* Category Header */}
                  {category.options.length > 0 && (
                    <div className={`px-3 py-2 text-xs font-semibold ${theme.categoryHeader} border-b sticky top-0`}>
                      {category.title}
                    </div>
                  )}
                  
                  {/* Category Options */}
                  {category.options.map((option, index) => (
                    <div
                      key={option.value}
                      onClick={() => handleOptionSelect(option.value)}
                      className={`px-4 py-3 cursor-pointer transition-all duration-150 ${theme.option} hover:translate-x-1 flex items-center justify-between ${
                        option.value === value ? `${theme.selectedOption} border-l-4` : ''
                      } ${
                        index === category.options.length - 1 && categoryKey !== 'long' ? `border-b ${theme.divider}` : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <option.icon className={`w-4 h-4 ${getColorClasses(option.color, 'icon')}`} />
                        <div>
                          <div className={`font-medium ${theme.primaryText}`}>{option.label}</div>
                          <div className={`text-xs ${theme.secondaryText}`}>{option.description}</div>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getColorClasses(option.color, 'badge')} text-white`}>
                        {option.badge}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className={`p-4 ${theme.preview} rounded-lg border`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
{/*           <div className="flex items-center space-x-2 text-sm">
            <CalendarPlus className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <span className={theme.tertiaryText}>Created:</span>
            <span className={`font-medium ${theme.primaryText}`}>{expirationInfo.created}</span>
          </div> */}
          <div className="flex items-center space-x-2 text-sm">
            <CalendarX className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
            <span className={theme.tertiaryText}>Expires:</span>
            <span className={`font-medium ${theme.primaryText}`}>{expirationInfo.expires}</span>
          </div>
        </div>
        <div className={`pt-3 border-t ${theme.divider}`}>
          <div className="flex items-start space-x-2 text-sm">
            <Info className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mt-0.5 flex-shrink-0`} />
            <span className={`${theme.tertiaryText} leading-relaxed`}>{expirationInfo.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiryDropdown