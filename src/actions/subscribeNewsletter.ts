"use server";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function subscribeNewsletter(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, error: 'Email is required' };
  }

  try {
    if (!supabase) {
      console.warn("Newsletter Sub skipped: No Supabase keys.");
      return { success: true };
    }

    const { error } = await supabase
      .from('leads')
      .insert([
        { 
          name: 'Newsletter Subscriber',
          email: email,
          whatsapp: 'N/A',
          package: 'newsletter',
          message: 'Subscribed via footer newsletter form',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error("Newsletter error:", error);
      return { success: false, error: 'Failed to subscribe' };
    }

    return { success: true };
  } catch (err) {
    console.error("Newsletter error:", err);
    return { success: false, error: 'Something went wrong' };
  }
}
