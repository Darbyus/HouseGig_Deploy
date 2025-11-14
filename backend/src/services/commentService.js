import { supabase } from '../config/supabaseClient.js';

export const createCommentService = async (listingId, userId, content) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([{
      listing_id: listingId,
      user_id: userId,
      content,
      created_at: new Date()
    }])
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const getListingCommentsService = async (listingId, limit = 20, offset = 0) => {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      user:user_id(id, username, avatar_url)
    `)
    .eq('listing_id', listingId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};

export const deleteCommentService = async (commentId, userId) => {
  const { data: comment, error: fetchError } = await supabase
    .from('comments')
    .select('user_id')
    .eq('id', commentId)
    .single();

  if (fetchError || !comment) {
    throw { statusCode: 404, message: 'Comment not found' };
  }

  if (comment.user_id !== userId) {
    throw { statusCode: 403, message: 'Not authorized to delete this comment' };
  }

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) throw { statusCode: 400, message: error.message };
};

export const updateCommentService = async (commentId, userId, content) => {
  const { data: comment, error: fetchError } = await supabase
    .from('comments')
    .select('user_id')
    .eq('id', commentId)
    .single();

  if (fetchError || !comment) {
    throw { statusCode: 404, message: 'Comment not found' };
  }

  if (comment.user_id !== userId) {
    throw { statusCode: 403, message: 'Not authorized to update this comment' };
  }

  const { data, error } = await supabase
    .from('comments')
    .update({ content })
    .eq('id', commentId)
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data;
};
