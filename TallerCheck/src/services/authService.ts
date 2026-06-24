import { supabase } from "../lib/supabase";

export const loginWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
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