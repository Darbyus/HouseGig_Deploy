import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkListingsColumns() {
  console.log('\n=== CHECKING LISTINGS TABLE COLUMNS ===\n');
  
  // Try minimal insert first
  console.log('Test 1: Minimal required columns...');
  const minimalListing = {
    owner_id: '05aeb6c6-558c-4bb4-92d1-27dda41995e6',
    title: 'Test Listing',
    world: 'Test World',
    main_image_url: 'https://via.placeholder.com/800'
  };
  
  const { data: data1, error: error1 } = await supabase
    .from('listings')
    .insert([minimalListing])
    .select();
  
  if (error1) {
    console.log('❌ ERROR:', error1.message);
  } else {
    console.log('✅ SUCCESS!');
    console.log('   Columns in table:', Object.keys(data1[0]).join(', '));
    
    // Clean up
    await supabase.from('listings').delete().eq('id', data1[0].id);
  }
  
  // Test each problematic column individually
  console.log('\nTest 2: Testing individual columns...\n');
  
  const columnsToTest = [
    { name: 'description', value: 'Test description' },
    { name: 'region', value: 'Test Region' },
    { name: 'property_type', value: 'House' },
    { name: 'price', value: '1000 gold' },
    { name: 'size', value: 'Medium' },
    { name: 'rarity', value: 'Common' },
    { name: 'magic_level', value: 'None' },
    { name: 'gallery_image_urls', value: ['https://via.placeholder.com/800'] },
    { name: 'tags', value: ['test'] }
  ];
  
  for (const col of columnsToTest) {
    const testData = {
      ...minimalListing,
      [col.name]: col.value
    };
    
    const { data, error } = await supabase
      .from('listings')
      .insert([testData])
      .select();
    
    if (error) {
      console.log(`❌ ${col.name}: MISSING or ERROR - ${error.message}`);
    } else {
      console.log(`✅ ${col.name}: EXISTS`);
      await supabase.from('listings').delete().eq('id', data[0].id);
    }
  }
}

checkListingsColumns().catch(console.error);
