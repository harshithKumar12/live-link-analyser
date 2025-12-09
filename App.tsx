import React, { useState } from 'react';
import { analyzeUrl } from './services/geminiService';
import { AnalysisResult, LoadingStep } from './types';
import { RadialProgress } from './components/RadialProgress';
import { StatusBadge } from './components/StatusBadge';
import { MetricCard } from './components/MetricCard';
import { 
  Activity, 
  Shield, 
  Search, 
  Layers, 
  Code, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Cpu,
  Globe
} from 'lucide-react';

const LOADING_STEPS: LoadingStep[] = [
  { id: 1, label: 'Connecting to URL...', status: 'pending' },
  { id: 2, label: 'Scanning Metadata & SEO...', status: 'pending' },
  { id: 3, label: 'Simulating Performance...', status: 'pending' },
  { id: 4, label: 'Checking Security Headers...', status: 'pending' },
  { id: 5, label: 'Identifying Tech Stack...', status: 'pending' },
];

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Reset state
    setLoading(true);
    setError(null);
    setResult(null);
    setLoadingStep(0);

    // Simulate progress steps while waiting for Gemini
    const interval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 1500);

    try {
      const data = await analyzeUrl(url);
      setResult(data);
      setLoadingStep(LOADING_STEPS.length);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const getPerformanceStatus = (val: number, good: number, poor: number) => {
    if (val <= good) return 'good';
    if (val <= poor) return 'needs-improvement';
    return 'poor';
  };

  const getScoreStatus = (val: number) => {
    if (val >= 0.1) return 'good';
    if (val >= 0.25) return 'poor';
    return 'needs-improvement';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              Live Link Analyzer
            </h1>
          </div>
          <a href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            Documentation
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Hero / Input Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Check your website's health instantly.
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Comprehensive scan for SEO, Performance, Security, and Tech Stack analysis powered by Gemini AI.
          </p>
          
          <form onSubmit={handleAnalyze} className="relative flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="url"
                required
                placeholder="https://www.example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="block w-full pl-11 pr-32 py-4 bg-white border border-slate-300 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? 'Scanning...' : 'Analyze'}
            </button>
          </form>

          {/* Loading Steps */}
          {loading && (
            <div className="mt-8 max-w-md mx-auto text-left space-y-3 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              {LOADING_STEPS.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${idx <= loadingStep ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'}`} />
                  <span className={`text-sm ${idx <= loadingStep ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                  {idx < loadingStep && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto" />}
                </div>
              ))}
            </div>
          )}
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-3 justify-center">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )}
        </section>

        {/* Results Dashboard */}
        {result && !loading && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
              <RadialProgress score={result.overallScore} label="Health Score" />
              <div className="flex-grow space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Analysis Summary</h3>
                  <p className="text-slate-600 mt-1">{result.summary}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Top Action Items
                  </h4>
                  <ul className="space-y-2">
                    {result.actionItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* SEO Health */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">SEO Health</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-500">Title Tag</span>
                      <StatusBadge status={result.seo.titleStatus} />
                    </div>
                    <p className="text-slate-800 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                      {result.seo.title || "Missing"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-500">Meta Description</span>
                      <StatusBadge status={result.seo.descriptionStatus} />
                    </div>
                    <p className="text-slate-800 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm">
                      {result.seo.description || "Missing"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-3 rounded-lg">
                        <span className="text-xs text-slate-500 block mb-1">Canonical URL</span>
                        <div className="text-sm font-medium truncate" title={result.seo.canonical}>{result.seo.canonical || 'Missing'}</div>
                     </div>
                     <div className="bg-slate-50 p-3 rounded-lg">
                        <span className="text-xs text-slate-500 block mb-1">Robots.txt</span>
                        <div className="text-sm font-medium">{result.seo.robotsTxt}</div>
                     </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm text-slate-600">Est. Broken Links</span>
                    <span className={`font-bold ${result.seo.brokenLinksEstimate > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.seo.brokenLinksEstimate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Performance Simulation</h3>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <MetricCard 
                    label="LCP" 
                    value={result.performance.lcp} 
                    unit="s" 
                    status={getPerformanceStatus(result.performance.lcp, 2.5, 4.0)} 
                    description="Largest Contentful Paint"
                  />
                  <MetricCard 
                    label="CLS" 
                    value={result.performance.cls} 
                    status={getScoreStatus(result.performance.cls)}
                    description="Layout Shift"
                  />
                  <MetricCard 
                    label="TTFB" 
                    value={result.performance.ttfb} 
                    unit="ms" 
                    status={getPerformanceStatus(result.performance.ttfb, 800, 1800)}
                    description="Time to First Byte"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Optimization Opportunities</h4>
                  {result.performance.imageIssues.length > 0 ? (
                    <ul className="space-y-2">
                      {result.performance.imageIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-2 rounded-md">
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-600 bg-green-50 p-2 rounded-md flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> No major image issues detected.
                    </p>
                  )}
                </div>
              </div>

              {/* Security */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Security</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'HTTPS Encryption', value: result.security.https },
                    { label: 'HSTS Header', value: result.security.hsts },
                    { label: 'Content Security Policy (CSP)', value: result.security.contentSecurityPolicy },
                    { label: 'X-Content-Type-Options', value: result.security.xContentTypeOptions },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      {item.value ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-green-600 uppercase">
                          <CheckCircle2 className="w-4 h-4" /> Secure
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-600 uppercase">
                          <XCircle className="w-4 h-4" /> Missing
                        </span>
                      )}
                    </div>
                  ))}
                  <p className="text-xs text-slate-500 mt-2 italic">{result.security.summary}</p>
                </div>
              </div>

              {/* Tech & Tracking */}
              <div className="space-y-8">
                 {/* Tech Stack */}
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Tech Stack</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Platform/CMS</span>
                      <span className="font-medium">{result.techStack.platform}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-sm text-slate-500">Server</span>
                      <span className="font-medium">{result.techStack.server}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500 block mb-2">Frameworks & Libraries</span>
                      <div className="flex flex-wrap gap-2">
                        {result.techStack.frameworks.map((fw, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md font-medium border border-slate-200">
                            {fw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                      <Code className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Tracking Scripts</h3>
                  </div>
                  <div className="space-y-3">
                    {result.tracking.commonTrackers.length > 0 ? (
                      result.tracking.commonTrackers.map((tracker, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-sm">
                          <span className="font-medium text-slate-700">{tracker}</span>
                          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">Detected</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">No common trackers detected.</p>
                    )}
                    {result.tracking.thirdPartyScripts.length > 0 && (
                      <div className="mt-4">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Other Scripts</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {result.tracking.thirdPartyScripts.map((script, i) => (
                            <span key={i} className="text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded">
                              {script.domain}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Grounding Sources */}
            {result.groundingSources && result.groundingSources.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Search className="w-4 h-4" /> Data Sources
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.groundingSources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors group"
                    >
                      <div className="mt-1 bg-white p-1 rounded shadow-sm group-hover:shadow border border-slate-200">
                        <ExternalLink className="w-3 h-3 text-blue-500" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium text-blue-700 truncate">{source.title}</p>
                        <p className="text-xs text-slate-400 truncate">{source.uri}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;