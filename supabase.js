import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qsjdgpnkfcaontjgobdf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzamRncG5rZmNhb250amdvYmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQwMjAyNzQsImV4cCI6MTk2OTU5NjI3NH0.HJA8aeDTUT5fMSHrmGboxc0CKCZUYuQwWUPH9DFKSeQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});