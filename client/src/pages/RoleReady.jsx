import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, Loader2, FileText, CheckCircle2 } from 'lucide-react';
import api from '../api/axios';

const RoleReady = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data.data);
    } catch (err) {
      setError('Failed to upload and parse resume. ' + (err.response?.data?.error || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">RoleReady</h1>
          <p className="text-slate-600">Upload your resume to get a personalized 7-day micro-learning roadmap to level up your technical skills.</p>
        </div>

        {/* Upload Section */}
        {!result && (
          <div className="max-w-xl mx-auto">
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${file ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-blue-400 bg-slate-50'}`}
            >
              <FileText className={`w-12 h-12 mx-auto mb-4 ${file ? 'text-blue-500' : 'text-slate-400'}`} />
              <h3 className="text-lg font-medium text-slate-700 mb-1">
                {file ? file.name : 'Select your Resume'}
              </h3>
              <p className="text-sm text-slate-500 mb-6">PDF or DOCX (max 5MB)</p>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.docx"
              />
              
              <button 
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded shadow-sm hover:bg-slate-50 font-medium"
              >
                Browse Files
              </button>
            </div>

            {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            <button 
              onClick={handleUpload}
              disabled={!file || loading}
              className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Resume...</> : <><Upload className="w-5 h-5 mr-2" /> Generate Roadmap</>}
            </button>
          </div>
        )}

        {/* Result Section */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Parsed Skills */}
            <div className="md:col-span-1">
              <h3 className="font-semibold text-slate-800 mb-4 border-b pb-2">Identified Skills</h3>
              <div className="flex flex-wrap gap-2">
                {result.resume.parsed_skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => {setResult(null); setFile(null);}}
                className="mt-8 text-sm text-slate-500 hover:text-slate-700 underline"
              >
                Upload a different resume
              </button>
            </div>

            {/* 7-Day Roadmap */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-slate-800 mb-4 border-b pb-2">7-Day Micro-Learning Roadmap</h3>
              <div className="space-y-4">
                {Object.entries(result.roadmap.roadmap_data).map(([day, task], idx) => (
                  <div key={idx} className="flex bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="flex-shrink-0 mr-4 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-slate-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700 uppercase text-sm mb-1">{day}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleReady;
