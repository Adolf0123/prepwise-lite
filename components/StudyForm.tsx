'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Calendar, List, Sparkles, Loader2 } from 'lucide-react';

export default function StudyForm() {
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState('');
  const [examDate, setExamDate] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, topics, examDate }),
      });

      if (res.ok) {
        router.push('/plans');
        router.refresh();
      } else {
        alert('Could not produce routine blueprint records.');
      }
    } catch (err) {
      console.error(err);
      alert('Internal connection failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/90 shadow-xl shadow-slate-200/50 rounded-2xl p-8 space-y-6 border border-slate-200/60 backdrop-blur-xs">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase flex items-center gap-2">
          <BookOpen size={14} className="text-indigo-600" /> Academic Course
        </label>
        <input
          type="text"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g., Computer Science, Biochemistry"
          className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-slate-800 placeholder:text-slate-400"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase flex items-center gap-2">
          <List size={14} className="text-indigo-600" /> Syllabus Modules
        </label>
        <textarea
          required
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          placeholder="e.g., Tree Traversals, Pointer References, Big O Notation"
          rows={3}
          className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-slate-800 placeholder:text-slate-400 resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 tracking-wide uppercase flex items-center gap-2">
          <Calendar size={14} className="text-indigo-600" /> Target Examination Date
        </label>
        <input
          type="date"
          required
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-slate-800"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full premium-gradient hover:opacity-95 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 shadow-md shadow-indigo-200 border border-indigo-700/30 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Assembling Data Matrix...</span>
          </>
        ) : (
          <>
            <Sparkles size={16} />
            <span>Compile Academic Blueprint</span>
          </>
        )}
      </button>
    </form>
  );
}

