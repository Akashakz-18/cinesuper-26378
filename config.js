// Supabase Configuration
const SUPABASE_URL = 'https://braarhnmwnvytrmnwd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qIxeLFlXkq3nyTzQqoLLog_OJpKpRRd';

// Initialize the Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);