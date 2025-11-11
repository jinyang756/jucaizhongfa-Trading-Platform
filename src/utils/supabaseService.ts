import { supabase } from '../supabase';

export const fetchUserData = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
  return data;
};
