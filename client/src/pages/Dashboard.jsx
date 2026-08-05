import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Code, FileText, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const modules = [
    {
      title: 'ExamScope',
      description: 'Browse revision modules and take practice question banks.',
      icon: <BookOpen className="w-8 h-8 text-indigo-500 mb-4" />,
      link: '/examscope',
      color: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400'
    },
    {
      title: 'FixMyCode',
      description: 'Get AI-powered bug analysis and refactored code snippets.',
      icon: <Code className="w-8 h-8 text-emerald-500 mb-4" />,
      link: '/fixmycode',
      color: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400'
    },
    {
      title: 'RoleReady',
      description: 'Upload your resume to get 7-day micro-learning roadmaps.',
      icon: <FileText className="w-8 h-8 text-amber-500 mb-4" />,
      link: '/roleready',
      color: 'bg-amber-50 border-amber-200 hover:border-amber-400'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.name || 'Student'}!</h1>
          <p className="text-slate-500 mt-2">Select a module below to get started.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((mod, idx) => (
          <Link key={idx} to={mod.link} className={`block p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${mod.color}`}>
            {mod.icon}
            <h2 className="text-xl font-semibold text-slate-800 mb-2">{mod.title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{mod.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
