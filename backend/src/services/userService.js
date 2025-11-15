import { supabase } from '../config/supabaseClient.js';

export const getUserProfileService = async (username) => {
  const { data, error } = await supabase
    .from('users')
    .select(`
      id,
      username,
      avatar_url,
      bio,
      created_at,
      listings:listings(count)
    `)
    .eq('username', username)
    .single();

  if (error) throw { statusCode: 404, message: 'User not found' };
  return data;
};

export const updateUserProfileService = async (userId, updateData) => {
  const { data, error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return {
    id: data.id,
    username: data.username,
    avatar_url: data.avatar_url,
    bio: data.bio,
    email: data.email
  };
};

export const getUserByIdService = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw { statusCode: 404, message: 'User not found' };
  return {
    id: data.id,
    username: data.username,
    avatar_url: data.avatar_url,
    bio: data.bio,
    email: data.email,
    created_at: data.created_at
  };
};
