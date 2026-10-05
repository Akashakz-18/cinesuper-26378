// Supabase Configuration
const SUPABASE_URL = 'https://braarhnmwnvytrmnwd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qiXeLFlXkq3nyTzQqoLLog_0JpKpRRd';

// Create client attached to window to prevent identifier redeclaration errors
window.supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;