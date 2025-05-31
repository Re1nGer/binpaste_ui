import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Shield, 
  Clock, 
  Zap, 
  Globe, 
  Lock,
  Eye,
  Download,
  Share2,
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const BinPasteIntro = ({ isDarkMode = true, onGetStarted, className = "" }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Cycle through features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Code,
      title: "Syntax Highlighting",
      description: "15+ programming languages supported",
      color: "text-blue-400"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Password protection & burn-after-read",
      color: "text-green-400"
    },
    {
      icon: Clock,
      title: "Smart Expiration",
      description: "Auto-delete from 1 hour to forever",
      color: "text-yellow-400"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Share code instantly with unique URLs",
      color: "text-purple-400"
    }
  ];

  const quickFeatures = [
    "No registration required",
    "Instant sharing with unique links",
    "Mobile & desktop optimized",
    "API access for developers"
  ];

  const themeClasses = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    card: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
      muted: isDarkMode ? 'text-gray-400' : 'text-gray-500'
    },
    accent: 'bg-gradient-to-r from-purple-500 to-pink-500',
    accentHover: 'from-purple-600 to-pink-600'
  };

  return (
    <div className={`${themeClasses.background} py-16 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Main Hero Section */}
        <div className={`text-center mb-16 ${isVisible ? 'opacity-100 transform translate-y-0 transition-all duration-1000' : 'opacity-0 transform translate-y-8'}`}>
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
            <Code className="w-8 h-8 text-white" />
          </div>

          {/* Main Headline */}
          <h1 className={`text-5xl md:text-6xl font-bold ${themeClasses.text.primary} mb-6`}>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              BinPaste
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className={`text-xl md:text-2xl ${themeClasses.text.secondary} mb-8 font-medium`}>
            The modern way to share code snippets
          </h2>

          {/* Main Description */}
          <p className={`text-lg ${themeClasses.text.muted} max-w-3xl mx-auto mb-8 leading-relaxed`}>
            Share code instantly with syntax highlighting, password protection, and smart expiration. 
            Perfect for developers, students, and teams who need a fast, secure way to share code snippets.
          </p>

          {/* CTA Button */}
          {onGetStarted && (
            <button
              onClick={onGetStarted}
              className={`inline-flex items-center space-x-2 px-8 py-4 ${themeClasses.accent} hover:${themeClasses.accentHover} text-white rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <span>Start Sharing Code</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Rotating Features Showcase */}
        <div className={`${themeClasses.card} border rounded-2xl p-8 mb-12 ${isVisible ? 'opacity-100 transform translate-y-0 transition-all duration-1000 delay-300' : 'opacity-0 transform translate-y-4'}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Feature Content */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                  { features[currentFeature].icon} 
                </div>
                <h3 className={`text-2xl font-bold ${themeClasses.text.primary}`}>
                  {features[currentFeature].title}
                </h3>
              </div>
              <p className={`text-lg ${themeClasses.text.secondary} mb-6`}>
                {features[currentFeature].description}
              </p>

              {/* Feature Indicators */}
              <div className="flex space-x-2">
                {features.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentFeature 
                        ? 'bg-purple-500 w-8' 
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Visual Demo */}
            <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className={`text-sm ${themeClasses.text.muted} font-mono`}>
                  binpaste.dev/p/abc123
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <span className={`text-purple-400 text-sm font-mono`}>const</span>
                  <span className={`${themeClasses.text.primary} text-sm font-mono`}>greeting = </span>
                  <span className={`text-green-400 text-sm font-mono`}>"Hello, BinPaste!";</span>
                </div>
                <div className="flex space-x-2">
                  <span className={`text-purple-400 text-sm font-mono`}>console</span>
                  <span className={`${themeClasses.text.primary} text-sm font-mono`}>.log(greeting);</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Features Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 ${isVisible ? 'opacity-100 transform translate-y-0 transition-all duration-1000 delay-500' : 'opacity-0 transform translate-y-4'}`}>
          {quickFeatures.map((feature, index) => (
            <div key={index} className={`${themeClasses.card} border rounded-xl p-6 text-center hover:scale-105 transition-transform duration-200`}>
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className={`${themeClasses.text.secondary} font-medium`}>{feature}</p>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className={`text-center ${isVisible ? 'opacity-100 transform translate-y-0 transition-all duration-1000 delay-700' : 'opacity-0 transform translate-y-4'}`}>
          <h3 className={`text-2xl font-bold ${themeClasses.text.primary} mb-6`}>
            Perfect for
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Code, label: "Code Reviews" },
              { icon: Share2, label: "Quick Sharing" },
              { icon: Eye, label: "Showcasing" },
              { icon: Lock, label: "Secure Snippets" },
              { icon: Download, label: "Backup Code" },
              { icon: Globe, label: "Team Collaboration" }
            ].map((item, index) => (
              <div key={index} className={`flex items-center space-x-2 px-4 py-2 ${themeClasses.card} border rounded-full`}>
                <item.icon className="w-4 h-4 text-purple-400" />
                <span className={`${themeClasses.text.secondary} text-sm font-medium`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats or Final CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'opacity-100 transform translate-y-0 transition-all duration-1000 delay-900' : 'opacity-0 transform translate-y-4'}`}>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className={`${themeClasses.text.muted} text-sm`}>
              Join thousands of developers sharing code securely
            </span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage example with theme support
const BinPasteIntroDemo = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleGetStarted = () => {
    // Scroll to editor or navigate to create page
    document.getElementById('paste-editor')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className={isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-lg transition-colors ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-white' 
              : 'bg-white hover:bg-gray-100 text-gray-900 shadow-lg'
          }`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main Intro */}
      <BinPasteIntro 
        isDarkMode={isDarkMode}
        onGetStarted={handleGetStarted}
      />

      {/* Placeholder for main app content */}
      <div id="paste-editor" className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <h2 className="text-2xl font-bold mb-4">Your Paste Editor Would Go Here</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            This is where users would create their pastes after being introduced to the app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BinPasteIntroDemo;