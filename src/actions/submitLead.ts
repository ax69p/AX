"use server";

import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// We disable warnings if keys are missing in dev, but it will fail in production naturally
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function submitLead(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    whatsapp: formData.get('whatsapp') as string,
    website: formData.get('website') as string,
    package: formData.get('package') as string,
    message: formData.get('message') as string,
    locale: formData.get('locale') as string,
    created_at: new Date().toISOString()
  };

  // Basic validation
  if (!data.name || !data.email || !data.whatsapp) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  try {
    if (!supabase) {
      console.warn("SUPABASE KEYS MISSING: Simulating success for lead capture.");
      console.log("LEAD DATA:", data);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, message: 'Message received successfully (Simulated).' };
    }

    const { error } = await supabase
      .from('leads')
      .insert([data]);

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: 'Database error. Please try again or contact via WhatsApp.' };
    }

    return { success: true, message: 'Your request has been received. Our team will contact you shortly.' };

  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
