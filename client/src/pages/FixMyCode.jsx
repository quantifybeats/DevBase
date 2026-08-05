import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import api from '../api/axios';

const FixMyCode = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      const res = await api.post('/ai/fix-my-code', { original_code: code, language });
      setAnalysis(res.data.data.gemini_analysis);
    } catch (err) {
      setError('Failed to analyze code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-[600px]">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Code Input</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
            <select 
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          <div className="flex-grow flex flex-col mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">Paste your broken code</label>
            <textarea
              className="w-full flex-grow p-4 font-mono text-sm border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="function hasBugs() { ..."
            />
          </div>

          <button 
            onClick={handleSubmit}
            disabled={loading || !code.trim()}
            className="w-full py-3 bg-slate-800 text-white font-semibold rounded hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</> : 'Fix My Code'}
          </button>
        </div>

        {/* Right Column: Output */}
        <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200 h-[600px] overflow-y-auto">
          <h2 className="text-xl font-bold text-slate-800 mb-4">AI Analysis</h2>
          
          {error && <div className="p-4 bg-red-100 text-red-700 rounded mb-4">{error}</div>}
          
          {!analysis && !loading && !error && (
            <div className="h-full flex items-center justify-center text-slate-400">
              <p>Submit code to see the analysis and refactored result here.</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-red-600 mb-2 flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> Bugs Found</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 text-sm">
                  {analysis.bugsFound.map((bug, i) => (
                    <li key={i}>{bug}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-blue-600 mb-2 flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Explanation</h3>
                <p className="text-sm text-slate-700 bg-white p-3 rounded border border-slate-200 leading-relaxed">
                  {analysis.explanation}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-emerald-600 mb-2 flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span> Corrected Code</h3>
                <pre className="bg-slate-800 text-slate-100 p-4 rounded overflow-x-auto text-sm font-mono border border-slate-700">
                  <code>{analysis.correctedCode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixMyCode;
