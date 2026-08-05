import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ExamScope = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>
      
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">ExamScope</h1>
        <p className="text-slate-600 mb-6">
          Welcome to the revision and practice question banks module. The interface to browse modules and take quizzes will be built here.
        </p>
        
        <div className="p-12 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 bg-slate-50">
          Exam Modules Interface Placeholder
        </div>
      </div>
    </div>
  );
};

export default ExamScope;
