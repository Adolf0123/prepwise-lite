'use client';

import React from 'react';
import { Calendar, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface RoutineDay {
  day: string;
  focus: string;
  tasks: string[];
}

interface PlanCardProps {
  plan: {
    id: string;
    subject: string;
    topics: string;
    exam_date: string;
    schedule: RoutineDay[];
  };
}

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className="bg-white/80 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200/60 overflow-hidden flex flex-col h-[460px] transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/60 hover:translate-y-[-2px] backdrop-blur-xs">
      {/* Premium Header */}
      <div className="premium-gradient p-5 text-white relative overflow-hidden shrink-0 border-b border-indigo-700/20">
        <div className="absolute right-[-10px] bottom-[-20px] text-white/10 select-none pointer-events-none">
          <BookOpen size={100} />
        </div>
        
        <h3 className="text-base font-black flex items-center gap-2 tracking-tight">
          <BookOpen size={16} className="text-violet-200" /> {plan.subject}
        </h3>
        <p className="text-violet-100 text-[11px] mt-1 font-medium flex items-center gap-1.5 opacity-90">
          <Layers size={12} className="shrink-0" /> 
          <span className="truncate">Modules: {plan.topics}</span>
        </p>
        
        <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase bg-black/15 w-max px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-xs">
          <Calendar size={12} /> Target: {new Date(plan.exam_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Structured Day Breakdown Body Container */}
      <div className="p-5 space-y-4 overflow-y-auto flex-1 bg-linear-to-b from-white to-slate-50/50">
        {Array.isArray(plan.schedule) && plan.schedule.length > 0 ? (
          plan.schedule.map((slot, index) => (
            <div key={index} className="bg-white border border-slate-200/50 rounded-xl p-3.5 shadow-xs transition-colors hover:border-indigo-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">
                  {slot.day}
                </span>
                <span className="text-[11px] font-bold text-slate-700 truncate max-w-[150px]">
                  {slot.focus}
                </span>
              </div>
              
              <ul className="space-y-1.5">
                {slot.tasks.map((task, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium leading-relaxed">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-8">
            <p className="text-xs text-slate-400 font-semibold">Structured schedule mapping unreadable.</p>
          </div>
        )}
      </div>
    </div>
  );
}
