import { supabase } from '../config/supabaseClient.js';

export const getUserProfileService = async (username) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio, created_at')
    .eq('username', username)
    .single();

  if (error) throw { statusCode: 404, message: 'User not found' };
  return data;
};

export const updateUserProfileService = async (userId, updateData) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  
  return {
    id: data.id,
    username: data.username,
    avatar_url: data.avatar_url,
    bio: data.bio
  };
};

export const getUserByIdService = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio, created_at')
    .eq('id', userId)
    .single();

  if (error) throw { statusCode: 404, message: 'User not found' };
  return data;
};
