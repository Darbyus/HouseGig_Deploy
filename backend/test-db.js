import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

async function testDatabase() {
  console.log('\n=== Testing Database Tables ===\n');
  
  // Check what tables actually exist
  console.log('0. Checking auth.users table (Supabase Auth)...');
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.log('❌ Auth users error:', authError.message);
  } else {
    console.log('✅ Auth users accessible');
    console.log('   Users found:', authUsers.users.length);
  }
  
  // Test REST API access to users table
  console.log('\n1. Testing REST API access to public.users table...');
  const { data: usersData, error: usersError } = await supabase
    .from('users')
    .select('*')
    .limit(1);
  
  if (usersError) {
    console.log('❌ REST API Error:', usersError.message);
    console.log('   Code:', usersError.code);
  } else {
    console.log('✅ Users table accessible via REST API');
    console.log('   Rows found:', usersData.length);
  }
  
  // Test listings table
  console.log('\n2. Testing REST API access to listings table...');
  const { data: listingsData, error: listingsError } = await supabase
    .from('listings')
    .select('*')
    .limit(1);
  
  if (listingsError) {
    console.log('❌ REST API Error:', listingsError.message);
  } else {
    console.log('✅ Listings table accessible');
    console.log('   Rows found:', listingsData.length);
  }
  
  console.log('\n=== Diagnosis ===');
  if (usersError && usersError.code === 'PGRST205') {
    console.log('\n⚠️  SCHEMA CACHE ERROR DETECTED');
    console.log('\nThe database tables may exist, but PostgREST cannot see them.');
    console.log('This usually happens after running SQL scripts.\n');
    console.log('To fix this, reload the schema cache:');
    console.log('1. Go to: https://supabase.com/dashboard/project/yxgwyvioarymiqpmxwqy/settings/api');
    console.log('2. Scroll to "Schema cache" section');
    console.log('3. Click "Reload schema" button\n');
    console.log('OR pause/unpause your project to restart all services.');
  }
}

testDatabase().catch(console.error);
