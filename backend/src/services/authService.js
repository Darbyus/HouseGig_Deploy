import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabaseClient.js';

export const registerService = async (email, password, username) => {
  // Check if username already exists in profiles
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();

  if (existingProfile) {
    throw { statusCode: 409, message: 'Username already taken' };
  }

  // Create user with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    throw { statusCode: 400, message: authError.message };
  }

  // Check if profile already exists (from previous failed attempt)
  const { data: existingUserProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  let profile;

  if (existingUserProfile) {
    // Update existing profile with username
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({ username })
      .eq('id', authData.user.id)
      .select()
      .single();

    if (updateError) {
      throw { statusCode: 400, message: updateError.message };
    }
    profile = updatedProfile;
  } else {
    // Create new profile
    const { data: newProfile, error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: authData.user.id,
        username,
        created_at: new Date()
      }])
      .select()
      .single();

    if (profileError) {
      throw { statusCode: 400, message: profileError.message };
    }
    profile = newProfile;
  }

  return generateToken({
    id: authData.user.id,
    email: authData.user.email,
    username: profile.username
  });
};

export const loginService = async (email, password) => {
  // Sign in with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    throw { statusCode: 401, message: 'Invalid credentials' };
  }

  // Get profile info
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('username, bio, avatar_url')
    .eq('id', authData.user.id)
    .single();

  if (profileError) {
    throw { statusCode: 404, message: 'Profile not found' };
  }

  return generateToken({
    id: authData.user.id,
    email: authData.user.email,
    username: profile.username,
    avatar_url: profile.avatar_url,
    bio: profile.bio
  });
};

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar_url: user.avatar_url,
      bio: user.bio
    }
  };
};
