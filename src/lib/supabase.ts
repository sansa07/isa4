import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Type aliases for easier use
export type User = Database['public']['Tables']['users']['Row'];
export type Post = Database['public']['Tables']['posts']['Row'];
export type Community = Database['public']['Tables']['communities']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type DuaRequest = Database['public']['Tables']['dua_requests']['Row'];
export type Like = Database['public']['Tables']['likes']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];
export type CommunityMember = Database['public']['Tables']['community_members']['Row'];
export type EventAttendee = Database['public']['Tables']['event_attendees']['Row'];

// Insert types
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type PostInsert = Database['public']['Tables']['posts']['Insert'];
export type CommunityInsert = Database['public']['Tables']['communities']['Insert'];
export type EventInsert = Database['public']['Tables']['events']['Insert'];
export type DuaRequestInsert = Database['public']['Tables']['dua_requests']['Insert'];
export type LikeInsert = Database['public']['Tables']['likes']['Insert'];
export type CommentInsert = Database['public']['Tables']['comments']['Insert'];
export type BookmarkInsert = Database['public']['Tables']['bookmarks']['Insert'];
export type CommunityMemberInsert = Database['public']['Tables']['community_members']['Insert'];
export type EventAttendeeInsert = Database['public']['Tables']['event_attendees']['Insert'];

// Update types
export type UserUpdate = Database['public']['Tables']['users']['Update'];
export type PostUpdate = Database['public']['Tables']['posts']['Update'];
export type CommunityUpdate = Database['public']['Tables']['communities']['Update'];
export type EventUpdate = Database['public']['Tables']['events']['Update'];
export type DuaRequestUpdate = Database['public']['Tables']['dua_requests']['Update'];

// Helper functions for common queries
export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const getUserByUsername = async (username: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();
  
  if (error) throw error;
  return data;
};

export const getPostsWithUsers = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      users (
        id,
        name,
        username,
        avatar_url,
        verified
      )
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data;
};

export const getDuaRequestsWithUsers = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('dua_requests')
    .select(`
      *,
      users (
        id,
        name,
        username,
        avatar_url,
        verified
      )
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data;
};

export const getCommunitiesWithCreators = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('communities')
    .select(`
      *,
      users!communities_created_by_fkey (
        id,
        name,
        username,
        avatar_url,
        verified
      )
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data;
};

export const getEventsWithCreators = async (limit = 10, offset = 0) => {
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      users!events_created_by_fkey (
        id,
        name,
        username,
        avatar_url,
        verified
      )
    `)
    .order('date', { ascending: true })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data;
};

// Like/Unlike functions
export const togglePostLike = async (userId: string, postId: string) => {
  // Check if like exists
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .single();

  if (existingLike) {
    // Unlike
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', postId);
    
    if (error) throw error;
    return false; // unliked
  } else {
    // Like
    const { error } = await supabase
      .from('likes')
      .insert({ user_id: userId, post_id: postId });
    
    if (error) throw error;
    return true; // liked
  }
};

export const toggleDuaRequestPrayer = async (userId: string, duaRequestId: string) => {
  // Check if prayer exists
  const { data: existingPrayer } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', userId)
    .eq('dua_request_id', duaRequestId)
    .single();

  if (existingPrayer) {
    // Remove prayer
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('dua_request_id', duaRequestId);
    
    if (error) throw error;
    return false; // prayer removed
  } else {
    // Add prayer
    const { error } = await supabase
      .from('likes')
      .insert({ user_id: userId, dua_request_id: duaRequestId });
    
    if (error) throw error;
    return true; // prayer added
  }
};

// Bookmark functions
export const togglePostBookmark = async (userId: string, postId: string) => {
  // Check if bookmark exists
  const { data: existingBookmark } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .single();

  if (existingBookmark) {
    // Remove bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', postId);
    
    if (error) throw error;
    return false; // unbookmarked
  } else {
    // Add bookmark
    const { error } = await supabase
      .from('bookmarks')
      .insert({ user_id: userId, post_id: postId });
    
    if (error) throw error;
    return true; // bookmarked
  }
};

export const toggleDuaRequestBookmark = async (userId: string, duaRequestId: string) => {
  // Check if bookmark exists
  const { data: existingBookmark } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('dua_request_id', duaRequestId)
    .single();

  if (existingBookmark) {
    // Remove bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('dua_request_id', duaRequestId);
    
    if (error) throw error;
    return false; // unbookmarked
  } else {
    // Add bookmark
    const { error } = await supabase
      .from('bookmarks')
      .insert({ user_id: userId, dua_request_id: duaRequestId });
    
    if (error) throw error;
    return true; // bookmarked
  }
};

// Community membership functions
export const joinCommunity = async (userId: string, communityId: string) => {
  const { error } = await supabase
    .from('community_members')
    .insert({ user_id: userId, community_id: communityId, role: 'member' });
  
  if (error) throw error;
};

export const leaveCommunity = async (userId: string, communityId: string) => {
  const { error } = await supabase
    .from('community_members')
    .delete()
    .eq('user_id', userId)
    .eq('community_id', communityId);
  
  if (error) throw error;
};

// Event attendance functions
export const registerForEvent = async (userId: string, eventId: string) => {
  const { error } = await supabase
    .from('event_attendees')
    .insert({ user_id: userId, event_id: eventId });
  
  if (error) throw error;
};

export const unregisterFromEvent = async (userId: string, eventId: string) => {
  const { error } = await supabase
    .from('event_attendees')
    .delete()
    .eq('user_id', userId)
    .eq('event_id', eventId);
  
  if (error) throw error;
};