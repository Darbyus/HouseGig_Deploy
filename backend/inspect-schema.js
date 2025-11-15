import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectTables() {
  console.log('\n=== DATABASE TABLES SCHEMA ===\n');
  
  // Check listings table schema
  console.log('LISTINGS TABLE:');
  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .limit(1);
  
  if (listings && listings[0]) {
    console.log('Columns:', Object.keys(listings[0]).join(', '));
  } else {
    console.log('No data in listings table');
  }
  
  // Check collections table
  console.log('\nCOLLECTIONS TABLE:');
  const { data: collections } = await supabase
    .from('collections')
    .select('*')
    .limit(1);
    
  if (collections && collections[0]) {
    console.log('Columns:', Object.keys(collections[0]).join(', '));
  } else {
    console.log('No data in collections table');
  }
  
  // Check likes table
  console.log('\nLIKES TABLE:');
  const { data: likes } = await supabase
    .from('likes')
    .select('*')
    .limit(1);
    
  if (likes && likes[0]) {
    console.log('Columns:', Object.keys(likes[0]).join(', '));
  } else {
    console.log('No data in likes table');
  }
  
  // Check comments table
  console.log('\nCOMMENTS TABLE:');
  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .limit(1);
    
  if (comments && comments[0]) {
    console.log('Columns:', Object.keys(comments[0]).join(', '));
  } else {
    console.log('No data in comments table');
  }
  
  // Check collection_listings table
  console.log('\nCOLLECTION_LISTINGS TABLE:');
  const { data: collectionListings } = await supabase
    .from('collection_listings')
    .select('*')
    .limit(1);
    
  if (collectionListings && collectionListings[0]) {
    console.log('Columns:', Object.keys(collectionListings[0]).join(', '));
  } else {
    console.log('No data in collection_listings table');
  }
  
  // Check users table (public.users, not auth.users)
  console.log('\nUSERS TABLE (public.users):');
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
    .limit(1);
    
  if (usersError) {
    console.log('Error:', usersError.message);
  } else if (users && users[0]) {
    console.log('Columns:', Object.keys(users[0]).join(', '));
  } else {
    console.log('Table exists but no data');
  }
}

inspectTables().catch(console.error);
