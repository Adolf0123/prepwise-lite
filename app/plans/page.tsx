import React from 'react';
import { supabase } from '@/utils/supabase';
import PlanCard from '@/components/PlanCard';

// Force server to read recent database writes instantly instead of caching static pages
export const revalidate = 0;

async function fetchBlueprints() {
  const { data, error } = await supabase
    .from('study_plans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Database Retrieval Error:', error);
    return [];
  }
  return data || [];
}

export default async function PlansPage() {
  const dataset = await fetchBlueprints();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-black text-slate-900">Compiled Active Timelines</h1>
        <p className="text-xs text-slate-500 font-medium">All real-time generation datasets persisted securely inside the cloud network grid.</p>
      </div>

      {dataset.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-xs text-slate-400 font-medium">No schedule instances identified. Return to home to prompt execution cycles.</p>
          <a href="/" className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 block">&larr; Return Home</a>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {dataset.map((row: any) => (
            <PlanCard key={row.id} plan={row} />
          ))}
        </div>
      )}
    </div>
  );
}
