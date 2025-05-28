import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Copy, Share2, Save, Eye, Code, Download, Trash2, Moon, Sun } from 'lucide-react';
import axios from '../network/axios';
import Prism from 'prismjs'



const BinPaste = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('text');
  const [isPrivate, setIsPrivate] = useState(false);
  const [savedPastes, setSavedPastes] = useState([]);
  const [currentPaste, setCurrentPaste] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { shortId,  } = useParams();

  const languages = [
    'text', 'javascript', 'python', 'java', 'cpp', 'html', 'css', 
    'json', 'xml', 'sql', 'bash', 'php', 'ruby', 'go', "csharp"
  ];

  // Load saved pastes from memory on component mount

  useEffect(() => {
    Prism.highlightAll()
  }, [showPreview, isDarkMode])

  useEffect(() => {
    getPastes();

    const language = searchParams.get('lan') || 'text';

    setLanguage(language);


  }, []);


  useEffect(() => {
    if (shortId) {
      getPasteById(shortId)
    }
  }, [shortId])

  const savePaste = async () => {
    if (!content.trim()) return;
    
    const newPaste = {
      title: title || `Untitled ${language}`,
      content,
      language,
      isPrivate,
      isBurnAfter: false,
      tags: [],
    };

    navigate('/bin');

    const { data } = await createPaste(newPaste);

    await copyToClipboard(`${window.origin}/bin/${data.shortId}`);

    const updatedPastes = [newPaste, ...savedPastes.slice(0, 9)]; // Keep only 10 most recent

    setSavedPastes(updatedPastes);
    setCurrentPaste(newPaste);
    
    // Clear form
    setContent('');
    setTitle('');
  };

  const createPaste = async (paste) => {
    try {
      return await axios.post("/", paste);
    } catch(error) {
      console.log(error);
    }
  }

  const getPasteById = async () => {
    try {
      const { data } = await axios.get(shortId);
      setContent(data.content)
      setTitle(data.title);
      setLanguage(data.language);
    } catch(error) {
      console.log(error);
    }
  }

  const getPastes = async () => {
    try {
      const { data } = await axios.get('recent');
      const mappedPastes = data.map(item => ({
        title: item.title,
        language: item.language,
        content: item.content,
        createdAt: item.createdAt,
        views: item.viewCount,
        isPrivate: false,
        shortId: item.shortId
      }))
      setSavedPastes(mappedPastes);
    } catch(error) {
      console.log(error);
    }
  }

  const loadPaste = (paste) => {
    setCurrentPaste(paste);
    setContent(paste.content);
    setTitle(paste.title);
    setLanguage(paste.language);
    setIsPrivate(paste.isPrivate);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log('Failed to copy');
    }
  };

  const downloadPaste = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'paste'}.${language === 'text' ? 'txt' : language}`;
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b backdrop-blur-sm bg-opacity-90 sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              BinPaste
            </h1>
          </div>
          
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-4">
            {/* Controls */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Paste title..."
                  value={title}
                  defaultValue={''}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                />
                
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                  ))}
                </select>
                
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    defaultValue={false}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm">Private</span>
                </label>
                
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${showPreview ? 'bg-purple-600 text-white' : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')}`}
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Preview</span>
                </button>
              </div>
            </div>

            {/* Editor/Preview */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
              
                <div className={`p-4 ${showPreview ? 'block' : 'hidden'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{title || 'Preview'}</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(content)}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={downloadPaste}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <pre className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} language-${language} p-4 rounded-lg overflow-auto text-sm font-mono h-full`}>
                    <code
                      className={`language-${language}`}
                    >{content}</code>
                  </pre>
                </div>

                <div className={`relative ${showPreview ? 'hidden': 'block'}`}>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your code here..."
                    className={`w-full h-96 p-4 ${isDarkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'} border-none resize-none focus:outline-none font-mono text-sm`}
                  />
                  <div className="absolute bottom-4 right-4">
                    <button
                      onClick={savePaste}
                      disabled={!content.trim()}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Paste</span>
                    </button>
                  </div>
                </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}>
              <h3 className="font-semibold mb-3">Recent Pastes</h3>
              <div className="space-y-2">
                {savedPastes.length === 0 ? (
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No saved pastes yet</p>
                ) : (
                  savedPastes.map(paste => (
                    <Link
                      to={`/bin/${paste?.shortId}`}
                      key={paste.id}
                      className='p-1'
                      //onClick={() => loadPaste(paste)}
                    >
                      <div
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-105 ${currentPaste?.id === paste.id ? 'border-purple-500 bg-purple-500 bg-opacity-10' : (isDarkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300')}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{paste.title}</p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {paste.language.toUpperCase()} • {paste.views} views
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePaste(paste.id);
                            }}
                            className={`p-1 rounded hover:bg-red-500 hover:bg-opacity-20 ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {currentPaste && (
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-4`}>
                <h3 className="font-semibold mb-3">Paste Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Created:</span>
                    <span>{new Date(currentPaste.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Language:</span>
                    <span>{currentPaste.language.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Views:</span>
                    <span>{currentPaste.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Privacy:</span>
                    <span>{currentPaste.isPrivate ? 'Private' : 'Public'}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => copyToClipboard(currentPaste.content)}
                    className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <Copy className="w-3 h-3" />
                    <span className="text-xs">Copy</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(window.location.href)}
                    className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <Share2 className="w-3 h-3" />
                    <span className="text-xs">Share</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinPaste;