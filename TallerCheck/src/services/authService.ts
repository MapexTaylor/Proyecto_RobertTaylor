import { supabase } from "../lib/supabase";

export const loginWithEmail = async (email: string, password: string) => {
  const cleanEmail = email.trim().toLowerCase();  

  const { data, error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const registerWithEmail = async (email: string, password: string) => {

  const cleanEmail = email.trim().toLowerCase();
  const { data, error } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
};

export const logoutFromSupabase = async () => {

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};