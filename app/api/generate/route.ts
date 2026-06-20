import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize the Groq SDK client using your environment API key
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

// 2. Initialize the Supabase client to save the generated plans
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 3. Handle incoming HTTP POST requests from the user form
export async function POST(request: Request) {
  try {
    // Extract the form fields submitted by the user
    const { subject, topics, examDate } = await request.json();

    // Safety Check: Ensure no fields are empty
    if (!subject || !topics || !examDate) {
      return NextResponse.json({ error: 'Incomplete parameters submitted' }, { status: 400 });
    }

    // 4. Construct a strict prompt enforcing JSON output formatting
    const instructionPrompt = `You are a professional academic study coordinator. Fabricate a highly structured timeline study schedule matching the criteria properties:
    - Target Subject Course: "${subject}"
    - Included Core Modules: "${topics}"
    - Explicit Goal Deadline: ${examDate}
    
    Synthesize remaining time slots starting from today. Provide output ONLY inside a raw JSON array format block matching this exact template layout. Do not write any conversational text before or after the JSON:
    [
      { "day": "Day 1", "focus": "Core Logic Overview", "tasks": ["Review study guides", "Analyse practice files"] }
    ]`;

    // 5. Query the Groq Cloud API using the ultra-fast Llama 3 model
    const aiCall = await groq.chat.completions.create({
      messages: [{ role: 'user', content: instructionPrompt }],
      model: 'llama3-8b-8192', // Free-tier capable high-speed model
      response_format: { type: 'json_object' }, // Forces the model to return valid JSON
    });

    // Extract the stringified JSON text from the AI response
    const extraction = aiCall.choices?.[0]?.message?.content || '[]';
    
    // 6. Parse and validate the JSON data safely
    let verifiedSchedule;
    try {
      const rawObject = JSON.parse(extraction);
      // Fallback handlers in case the LLM nests the array inside an object key
      verifiedSchedule = Array.isArray(rawObject) ? rawObject : (rawObject.schedule || rawObject.plan || []);
    } catch {
      verifiedSchedule = []; // Empty fallback if JSON parsing completely fails
    }

    // 7. Insert the customized generation details into your Supabase Database table
    const { data, error } = await supabase
      .from('study_plans')
      .insert([
        {
          subject,
          topics,
          exam_date: examDate,
          schedule: verifiedSchedule, // Saves the JSON array directly into your jsonb column
        },
      ])
      .select();

    if (error) throw error;

    // Return a successful response back to the client-side UI form
    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (err: any) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
