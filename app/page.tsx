import React from 'react';
import StudyForm from '@/components/StudyForm';
import { Sparkles } from 'lucide-react';

export default function Page() {
  return (
    <div className="max-w-xl mx-auto space-y-8 pt-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-[11px] font-bold text-indigo-700 uppercase tracking-widest animate-pulse">
          <Sparkles size={12} /> Next-Gen AI Study Core
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent">
          Smarter Preparation Starts Here
        </h1>
        <p className="max-w-md mx-auto text-xs text-slate-500 font-medium leading-relaxed">
          Inject core syllabus modules and exam timelines into our custom parsing model to create an automated academic study flow.
        </p>
      </div>
      
      <StudyForm />
    </div>
  );
}
