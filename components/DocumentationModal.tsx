import React from 'react';
import { X, Book, Activity, Shield, Cpu, Search } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Book className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">How it Works</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-slate-600 leading-relaxed">
            Live Link Analyzer uses <strong>Gemini 2.5</strong> combined with real-time <strong>Search Grounding</strong> to simulate a comprehensive technical audit of any public URL without direct DOM access.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1 bg-purple-100 p-2 rounded-lg">
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">SEO Health Analysis</h3>
                <p className="text-sm text-slate-600 mt-1">
                  We analyze the semantic structure and metadata of the site. This includes checking for:
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-500">
                    <li>Title tags length and relevance.</li>
                    <li>Meta descriptions for CTR optimization.</li>
                    <li>Canonical tags to prevent duplicate content issues.</li>
                    <li>Robots.txt configuration.</li>
                  </ul>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1 bg-amber-100 p-2 rounded-lg">
                <Cpu className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Performance Simulation</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Using search data and technical inference, we estimate Core Web Vitals:
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-500">
                    <li><strong>LCP (Largest Contentful Paint):</strong> How fast the main content loads.</li>
                    <li><strong>CLS (Cumulative Layout Shift):</strong> Visual stability of the page.</li>
                    <li><strong>TTFB (Time to First Byte):</strong> Server responsiveness.</li>
                  </ul>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1 bg-green-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Security & Tech Stack</h3>
                <p className="text-sm text-slate-600 mt-1">
                  We scan for standard security headers (HSTS, CSP, HTTPS) and identify the underlying technology (CMS, Server, Frameworks) to provide a complete picture of the site's architecture.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 flex gap-3">
             <Activity className="w-5 h-5 flex-shrink-0 mt-0.5" />
             <div>
               <strong>The Health Score</strong> (0-100) is a weighted average calculated from the performance metrics, SEO completeness, and security implementation.
             </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm hover:shadow"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};