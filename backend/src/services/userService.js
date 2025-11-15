import { supabase } from '../config/supabaseClient.js';

export const getUserProfileService = async (username) => {
  // Get user from auth.users by metadata
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  
  if (error) throw { statusCode: 500, message: 'Failed to fetch users' };
  
  const user = users.find(u => u.user_metadata?.username === username);
  
  if (!user) throw { statusCode: 404, message: 'User not found' };
  
  return {
    id: user.id,
    username: user.user_metadata?.username || username,
    email: user.email,
    avatar_url: user.user_metadata?.avatar_url || null,
    bio: user.user_metadata?.bio || null,
    created_at: user.created_at
  };
};

export const updateUserProfileService = async (userId, updateData) => {
  // Update user metadata in auth.users
  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    user_metadata: updateData
  });

  if (error) throw { statusCode: 400, message: error.message };
  
  return {
    id: data.user.id,
    username: data.user.user_metadata?.username,
    avatar_url: data.user.user_metadata?.avatar_url,
    bio: data.user.user_metadata?.bio
  };
};

export const getUserByIdService = async (userId) => {
  // Get user from auth.users
  const { data: { user }, error } = await supabase.auth.admin.getUserById(userId);
  
  if (error) throw { statusCode: 404, message: 'User not found' };
  
  return {
    id: user.id,
    username: user.user_metadata?.username || user.email.split('@')[0],
    email: user.email,
    avatar_url: user.user_metadata?.avatar_url || null,
    bio: user.user_metadata?.bio || null,
    created_at: user.created_at
  };
};
