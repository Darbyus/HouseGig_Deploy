import { supabase } from '../config/supabaseClient.js';

export const createListingService = async (listingData, userId) => {
  const { data, error } = await supabase
    .from('listings')
    .insert([{
      ...listingData,
      owner_id: userId,
      created_at: new Date()
    }])
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const getListingService = async (listingId) => {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      owner:owner_id(id, username, avatar_url, bio),
      likes(count)
    `)
    .eq('id', listingId)
    .single();

  if (error) throw { statusCode: 404, message: 'Listing not found' };
  return data;
};

export const getAllListingsService = async (filters = {}) => {
  const { 
    search, 
    propertyType, 
    world, 
    sortBy = 'created_at', 
    limit = 20, 
    offset = 0,
    rarity,
    magicLevel
  } = filters;

  let query = supabase
    .from('listings')
    .select(`
      id,
      title,
      world,
      region,
      property_type,
      price,
      main_image_url,
      rarity,
      magic_level,
      owner_id,
      owner:owner_id(username),
      likes(count)
    `)
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,world.ilike.%${search}%,region.ilike.%${search}%`
    );
  }

  if (propertyType) {
    query = query.eq('property_type', propertyType);
  }

  if (world) {
    query = query.eq('world', world);
  }

  if (rarity) {
    query = query.eq('rarity', rarity);
  }

  if (magicLevel) {
    query = query.eq('magic_level', magicLevel);
  }

  // Sorting
  const sortConfig = {
    'created_at': { column: 'created_at', ascending: false },
    'newest': { column: 'created_at', ascending: false },
    'oldest': { column: 'created_at', ascending: true },
    'most_liked': { column: 'likes', ascending: false }
  };

  const sort = sortConfig[sortBy] || sortConfig['created_at'];
  query = query.order(sort.column, { ascending: sort.ascending });

  const { data, error } = await query;

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const updateListingService = async (listingId, userId, updateData) => {
  // Verify ownership
  const { data: listing, error: fetchError } = await supabase
    .from('listings')
    .select('owner_id')
    .eq('id', listingId)
    .single();

  if (fetchError || !listing) {
    throw { statusCode: 404, message: 'Listing not found' };
  }

  if (listing.owner_id !== userId) {
    throw { statusCode: 403, message: 'Not authorized to update this listing' };
  }

  const { data, error } = await supabase
    .from('listings')
    .update(updateData)
    .eq('id', listingId)
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const deleteListingService = async (listingId, userId) => {
  const { data: listing, error: fetchError } = await supabase
    .from('listings')
    .select('owner_id')
    .eq('id', listingId)
    .single();

  if (fetchError || !listing) {
    throw { statusCode: 404, message: 'Listing not found' };
  }

  if (listing.owner_id !== userId) {
    throw { statusCode: 403, message: 'Not authorized to delete this listing' };
  }

  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', listingId);

  if (error) throw { statusCode: 400, message: error.message };
};

export const getUserListingsService = async (userId, limit = 20, offset = 0) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};
