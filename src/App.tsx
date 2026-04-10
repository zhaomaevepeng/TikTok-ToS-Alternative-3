import React, { useState } from 'react';
import { Search, Info, XCircle, FileText, Sparkles, Smartphone, Scale, AlertTriangle } from 'lucide-react';
import { tosData, industryComparisons, TosSection } from './data/tosData';
import { askTosQuestion } from './services/ai';
import { motion, AnimatePresence } from 'motion/react';

const PrivacyGrade = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between mb-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Privacy Grade</h2>
        <p className="text-gray-500 text-sm mt-1">Based on data retention, sharing, and user control.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-red-600 flex items-center gap-1"><XCircle className="w-4 h-4"/> High Data Collection</span>
          <span className="text-sm font-medium text-amber-600 flex items-center gap-1"><AlertTriangle className="w-4 h-4"/> Broad Content License</span>
        </div>
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center border-4 border-red-500">
          <span className="text-3xl font-bold text-red-600">D</span>
        </div>
      </div>
    </div>
  );
};

const TosSectionView = ({ section, isHighlighted }: { section: TosSection, isHighlighted: boolean }) => {
  const [viewMode, setViewMode] = useState<'summary' | 'legal' | 'scenario'>('summary');

  return (
    <motion.div 
      id={`section-${section.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl border ${isHighlighted ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} shadow-sm overflow-hidden mb-6 transition-all duration-500`}
    >
      <div className="border-b border-gray-100 bg-gray-50/50 p-4 flex items-center justify-between flex-wrap gap-4">
        <h3 className="font-semibold text-gray-900">{section.title}</h3>
        <div className="flex bg-gray-200/50 p-1 rounded-lg">
          <button 
            onClick={() => setViewMode('summary')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'summary' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Summary
          </button>
          <button 
            onClick={() => setViewMode('legal')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'legal' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Legal Text
          </button>
          <button 
            onClick={() => setViewMode('scenario')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${viewMode === 'scenario' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Real-world
          </button>
        </div>
      </div>
      <div className="p-6">
        <AnimatePresence mode="wait">
          {viewMode === 'summary' && (
            <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 items-start">
              <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0 mt-1">
                <FileText className="w-5 h-5" />
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{section.summary}</p>
            </motion.div>
          )}
          {viewMode === 'legal' && (
            <motion.div key="legal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-serif text-gray-800 leading-relaxed">
              {section.legalText.map((part, i) => (
                <span key={i} className={
                  part.type === 'addition' ? 'bg-green-100 text-green-900 px-1 rounded' :
                  part.type === 'deletion' ? 'bg-red-100 text-red-900 line-through px-1 rounded' : ''
                }>
                  {part.text}
                </span>
              ))}
            </motion.div>
          )}
          {viewMode === 'scenario' && (
            <motion.div key="scenario" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 items-start">
               <div className="bg-purple-100 p-2 rounded-full text-purple-600 shrink-0 mt-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-gray-700 leading-relaxed text-lg italic">"{section.scenario}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SearchSection = ({ onSearchResult }: { onSearchResult: (sectionId: string | null, answer: string | null) => void }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Combine all legal text for the prompt
    const fullText = tosData.map(s => `Section ${s.id}:\n` + s.legalText.map(t => t.text).join('')).join('\n\n');
    
    const result = await askTosQuestion(query, fullText);
    onSearchResult(result.sectionId, result.answer);
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm mb-8 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="pl-4 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question in plain English (e.g., 'Do you sell my emails?')"
          className="flex-1 py-3 px-2 outline-none text-gray-700 bg-transparent"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {isLoading ? 'Searching...' : 'Ask AI'}
        </button>
      </form>
    </div>
  );
};

const ContextualDemo = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-gray-900 rounded-2xl p-8 text-white mb-8 overflow-hidden relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Smartphone className="w-6 h-6"/> Contextual ToS Demo</h2>
          <p className="text-gray-400 mt-1">Instead of a wall of text, show rules when they matter.</p>
        </div>
      </div>

      <div className="bg-black rounded-[2rem] border-8 border-gray-800 w-72 h-[500px] mx-auto relative overflow-hidden flex flex-col">
        {/* Fake App Header */}
        <div className="pt-12 pb-4 px-6 border-b border-gray-800 flex justify-between items-center bg-gray-900">
          <span className="font-bold">Profile</span>
        </div>
        
        {/* Fake App Content */}
        <div className="flex-1 p-6 flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-700 rounded-full mb-4"></div>
          <h3 className="font-bold text-xl mb-1">@user123</h3>
          
          <button 
            onClick={() => setShowPopup(true)}
            className="mt-8 bg-blue-600 hover:bg-blue-700 w-full py-3 rounded-lg font-medium transition-colors"
          >
            Upload New Video
          </button>
        </div>

        {/* Contextual Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 bg-white text-gray-900 p-6 rounded-t-2xl shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-lg">Before you post...</h4>
                <button onClick={() => setShowPopup(false)} className="text-gray-500 hover:text-gray-900">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                By uploading this video, you grant us a worldwide, royalty-free license to use, modify, and distribute it.
              </p>
              <button onClick={() => setShowPopup(false)} className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium">
                I Understand
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const handleSearchResult = (sectionId: string | null, answer: string | null) => {
    setAiAnswer(answer);
    setHighlightedSection(sectionId);
    
    if (sectionId) {
      const element = document.getElementById(`section-${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-gray-900" />
            <h1 className="text-xl font-bold tracking-tight">TermsReader <span className="text-gray-400 font-normal">for TikTok</span></h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2">
            <PrivacyGrade />
            
            <SearchSection onSearchResult={handleSearchResult} />

            <AnimatePresence>
              {aiAnswer && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex gap-3 items-start overflow-hidden"
                >
                  <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">AI Answer</h4>
                    <p className="text-blue-800">{aiAnswer}</p>
                  </div>
                  <button onClick={() => setAiAnswer(null)} className="ml-auto text-blue-400 hover:text-blue-600">
                    <XCircle className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Terms of Service</h2>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-200 border border-green-400"></span> Additions</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-200 border border-red-400"></span> Deletions</span>
                </div>
              </div>
              
              {tosData.map(section => (
                <TosSectionView 
                  key={section.id} 
                  section={section} 
                  isHighlighted={highlightedSection === section.id} 
                />
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <ContextualDemo />

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-gray-400" />
                Industry Comparison
              </h3>
              <div className="space-y-6">
                {industryComparisons.map((comp, i) => (
                  <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-gray-900 mb-2">{comp.topic}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2 items-start">
                        <span className="font-medium text-gray-700 w-16 shrink-0">TikTok:</span>
                        <span className={`
                          ${comp.status === 'danger' ? 'text-red-700 font-medium' : ''}
                          ${comp.status === 'warning' ? 'text-amber-700 font-medium' : ''}
                          ${comp.status === 'info' ? 'text-gray-600' : ''}
                        `}>{comp.tiktok}</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <span className="font-medium text-gray-700 w-16 shrink-0">Industry:</span>
                        <span className="text-gray-500">{comp.industry}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
