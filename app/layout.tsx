import React from 'react';
import './globals.css';

export const metadata = {
  title: 'PrepWise AI - Smart Dashboard Ecosystem',
  description: 'AI-Powered Study Schedule Matrix Engine',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        {/* Decorative Background Accent Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-200/40 blur-3xl pointer-events-none z-0" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-3xl pointer-events-none z-0" />

        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <div className="premium-gradient w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                P
              </div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
                PrepWise <span className="text-indigo-600 font-medium text-base">AI</span>
              </span>
            </a>
            <a 
              href="/plans" 
              className="text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 px-4 py-2 rounded-full transition-all duration-300 border border-slate-200/50"
            >
              Saved Dashboards
            </a>
          </div>
        </header>

        <main className="relative max-w-5xl mx-auto px-6 py-12 z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
