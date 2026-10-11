// CivicLink Supabase Database Connection
const SUPABASE_URL = "https://sauueyjliymbyzivmhrn.supabase.co";
const SUPABASE_ANON_KEY = "J_dvbjCJeUlrj7MmUlf2FQ_Rbp-e0GK";

// Initialize the database client
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);