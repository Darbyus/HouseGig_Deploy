import { supabase } from '../config/supabaseClient.js';

export const likeListingService = async (listingId, userId) => {
  // Check if already liked
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('listing_id', listingId)
    .eq('user_id', userId)
    .single();

  if (existingLike) {
    throw { statusCode: 409, message: 'Listing already liked' };
  }

  const { data, error } = await supabase
    .from('likes')
    .insert([{
      listing_id: listingId,
      user_id: userId,
      created_at: new Date()
    }])
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const unlikeListingService = async (listingId, userId) => {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('listing_id', listingId)
    .eq('user_id', userId);

  if (error) throw { statusCode: 400, message: error.message };
};

export const getListingLikesCount = async (listingId) => {
  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('listing_id', listingId);

  if (error) throw { statusCode: 400, message: error.message };
  return count || 0;
};

export const checkIfUserLiked = async (listingId, userId) => {
  const { data } = await supabase
    .from('likes')
    .select('id')
    .eq('listing_id', listingId)
    .eq('user_id', userId)
    .single();

  return !!data;
};

export const getUserLikedListings = async (userId, limit = 20, offset = 0) => {
  const { data, error } = await supabase
    .from('likes')
    .select('listing:listings!listing_id(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw { statusCode: 400, message: error.message };
  return data?.map(like => like.listing) || [];
};
