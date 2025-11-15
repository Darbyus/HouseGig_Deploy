import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkAllTables() {
  console.log('\n=== CHECKING ALL DATABASE TABLES ===\n');
  
  // List of tables to check
  const tablesToCheck = [
    'users',
    'listings', 
    'collections',
    'collection_listings',
    'likes',
    'comments'
  ];
  
  for (const table of tablesToCheck) {
    const { data, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.log(`❌ ${table}: ${error.message} (${error.code})`);
    } else {
      console.log(`✅ ${table}: Table exists and is accessible`);
    }
  }
  
  // Check auth.users
  console.log('\n=== CHECKING AUTH SYSTEM ===\n');
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
  
  if (authError) {
    console.log(`❌ auth.users: ${authError.message}`);
  } else {
    console.log(`✅ auth.users: ${users.length} users found`);
    if (users.length > 0) {
      console.log('   Sample user:', {
        id: users[0].id,
        email: users[0].email,
        username: users[0].user_metadata?.username || 'N/A',
        created_at: users[0].created_at
      });
    }
  }
}

checkAllTables().catch(console.error);
