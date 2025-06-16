/*
  # Create likes table

  1. New Tables
    - `likes`
      - `id` (uuid, primary key) - Like's unique identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `post_id` (uuid, foreign key, optional) - Reference to posts table
      - `dua_request_id` (uuid, foreign key, optional) - Reference to dua_requests table
      - `created_at` (timestamp) - When like was created

  2. Security
    - Enable RLS on `likes` table
    - Add policies for CRUD operations
    - Add constraints to ensure only one type of reference per like
*/

CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  dua_request_id uuid REFERENCES dua_requests(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Ensure only one type of reference per like
  CONSTRAINT likes_single_reference CHECK (
    (post_id IS NOT NULL AND dua_request_id IS NULL) OR
    (post_id IS NULL AND dua_request_id IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Users can read all likes
CREATE POLICY "Users can read likes"
  ON likes
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can create likes
CREATE POLICY "Users can create likes"
  ON likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own likes
CREATE POLICY "Users can delete own likes"
  ON likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create unique indexes to prevent duplicate likes
CREATE UNIQUE INDEX IF NOT EXISTS likes_user_post_unique 
  ON likes(user_id, post_id) 
  WHERE post_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS likes_user_dua_request_unique 
  ON likes(user_id, dua_request_id) 
  WHERE dua_request_id IS NOT NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS likes_post_id_idx ON likes(post_id);
CREATE INDEX IF NOT EXISTS likes_dua_request_id_idx ON likes(dua_request_id);