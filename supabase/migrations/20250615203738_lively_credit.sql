/*
  # Create bookmarks table

  1. New Tables
    - `bookmarks`
      - `id` (uuid, primary key) - Bookmark's unique identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `post_id` (uuid, foreign key, optional) - Reference to posts table
      - `dua_request_id` (uuid, foreign key, optional) - Reference to dua_requests table
      - `created_at` (timestamp) - When bookmark was created

  2. Security
    - Enable RLS on `bookmarks` table
    - Add policies for CRUD operations
    - Add constraints to ensure only one type of reference per bookmark
*/

CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  dua_request_id uuid REFERENCES dua_requests(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure only one type of reference per bookmark
  CONSTRAINT bookmarks_single_reference CHECK (
    (post_id IS NOT NULL AND dua_request_id IS NULL) OR
    (post_id IS NULL AND dua_request_id IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can read their own bookmarks
CREATE POLICY "Users can read own bookmarks"
  ON bookmarks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create bookmarks
CREATE POLICY "Users can create bookmarks"
  ON bookmarks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create unique indexes to prevent duplicate bookmarks
CREATE UNIQUE INDEX IF NOT EXISTS bookmarks_user_post_unique 
  ON bookmarks(user_id, post_id) 
  WHERE post_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS bookmarks_user_dua_request_unique 
  ON bookmarks(user_id, dua_request_id) 
  WHERE dua_request_id IS NOT NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS bookmarks_post_id_idx ON bookmarks(post_id);
CREATE INDEX IF NOT EXISTS bookmarks_dua_request_id_idx ON bookmarks(dua_request_id);