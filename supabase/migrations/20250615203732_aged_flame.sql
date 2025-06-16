/*
  # Create comments table

  1. New Tables
    - `comments`
      - `id` (uuid, primary key) - Comment's unique identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `post_id` (uuid, foreign key, optional) - Reference to posts table
      - `dua_request_id` (uuid, foreign key, optional) - Reference to dua_requests table
      - `content` (text) - Comment content
      - `is_prayer` (boolean) - Whether comment is a prayer (for dua requests)
      - `created_at` (timestamp) - When comment was created
      - `updated_at` (timestamp) - When comment was last updated

  2. Security
    - Enable RLS on `comments` table
    - Add policies for CRUD operations
    - Add constraints to ensure only one type of reference per comment
*/

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  dua_request_id uuid REFERENCES dua_requests(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_prayer boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Ensure only one type of reference per comment
  CONSTRAINT comments_single_reference CHECK (
    (post_id IS NOT NULL AND dua_request_id IS NULL) OR
    (post_id IS NULL AND dua_request_id IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Anyone can read comments
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

-- Users can create comments
CREATE POLICY "Users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments
CREATE POLICY "Users can update own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger to update updated_at on comment changes
CREATE OR REPLACE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS comments_user_id_idx ON comments(user_id);
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);
CREATE INDEX IF NOT EXISTS comments_dua_request_id_idx ON comments(dua_request_id);
CREATE INDEX IF NOT EXISTS comments_created_at_idx ON comments(created_at DESC);