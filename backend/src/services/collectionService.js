import { supabase } from '../config/supabaseClient.js';

export const createCollectionService = async (collectionData, userId) => {
  const { data, error } = await supabase
    .from('collections')
    .insert([{
      ...collectionData,
      owner_id: userId,
      created_at: new Date()
    }])
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const getCollectionService = async (collectionId) => {
  const { data, error } = await supabase
    .from('collections')
    .select(`
      *,
      owner:owner_id(id, username, avatar_url),
      listings:collection_listings(listing_id)
    `)
    .eq('id', collectionId)
    .single();

  if (error) throw { statusCode: 404, message: 'Collection not found' };
  return data;
};

export const getUserCollectionsService = async (userId) => {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const updateCollectionService = async (collectionId, userId, updateData) => {
  const { data: collection, error: fetchError } = await supabase
    .from('collections')
    .select('owner_id')
    .eq('id', collectionId)
    .single();

  if (fetchError || !collection) {
    throw { statusCode: 404, message: 'Collection not found' };
  }

  if (collection.owner_id !== userId) {
    throw { statusCode: 403, message: 'Not authorized to update this collection' };
  }

  const { data, error } = await supabase
    .from('collections')
    .update(updateData)
    .eq('id', collectionId)
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const deleteCollectionService = async (collectionId, userId) => {
  const { data: collection, error: fetchError } = await supabase
    .from('collections')
    .select('owner_id')
    .eq('id', collectionId)
    .single();

  if (fetchError || !collection) {
    throw { statusCode: 404, message: 'Collection not found' };
  }

  if (collection.owner_id !== userId) {
    throw { statusCode: 403, message: 'Not authorized to delete this collection' };
  }

  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', collectionId);

  if (error) throw { statusCode: 400, message: error.message };
};

export const addListingToCollectionService = async (collectionId, listingId, userId) => {
  // Verify collection ownership
  const { data: collection, error: collError } = await supabase
    .from('collections')
    .select('owner_id')
    .eq('id', collectionId)
    .single();

  if (collError || !collection || collection.owner_id !== userId) {
    throw { statusCode: 403, message: 'Not authorized' };
  }

  // Check if already added
  const { data: existing } = await supabase
    .from('collection_listings')
    .select('id')
    .eq('collection_id', collectionId)
    .eq('listing_id', listingId)
    .single();

  if (existing) {
    throw { statusCode: 409, message: 'Listing already in collection' };
  }

  const { data, error } = await supabase
    .from('collection_listings')
    .insert([{ collection_id: collectionId, listing_id: listingId }])
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const removeListingFromCollectionService = async (collectionId, listingId, userId) => {
  const { data: collection, error: collError } = await supabase
    .from('collections')
    .select('owner_id')
    .eq('id', collectionId)
    .single();

  if (collError || !collection || collection.owner_id !== userId) {
    throw { statusCode: 403, message: 'Not authorized' };
  }

  const { error } = await supabase
    .from('collection_listings')
    .delete()
    .eq('collection_id', collectionId)
    .eq('listing_id', listingId);

  if (error) throw { statusCode: 400, message: error.message };
};
