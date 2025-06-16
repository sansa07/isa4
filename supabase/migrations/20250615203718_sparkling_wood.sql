/*
  # Create dua_requests table

  1. New Tables
    - `dua_requests`
      - `id` (uuid, primary key) - Dua request's unique identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `title` (text) - Dua request title
      - `content` (text) - Dua request content
      - `category` (text) - Dua request category
      - `is_urgent` (boolean) - Whether request is urgent
      - `is_anonymous` (boolean) - Whether request is anonymous
      - `tags` (text array) - Dua request tags
      - `prayers_count` (integer) - Number of prayers
      - `comments_count` (integer) - Number of comments
      - `created_at` (timestamp) - When request was created
      - `updated_at` (timestamp) - When request was last updated

  2. Security
    - Enable RLS on `dua_requests` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS dua_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  is_urgent boolean DEFAULT false,
  is_anonymous boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  prayers_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE dua_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can read dua requests
CREATE POLICY "Anyone can read dua requests"
  ON dua_requests
  FOR SELECT
  TO public
  USING (true);

-- Users can create dua requests
CREATE POLICY "Users can create dua requests"
  ON dua_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own dua requests
CREATE POLICY "Users can update own dua requests"
  ON dua_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own dua requests
CREATE POLICY "Users can delete own dua requests"
  ON dua_requests
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger to update updated_at on dua request changes
CREATE OR REPLACE TRIGGER update_dua_requests_updated_at
  BEFORE UPDATE ON dua_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS dua_requests_user_id_idx ON dua_requests(user_id);
CREATE INDEX IF NOT EXISTS dua_requests_category_idx ON dua_requests(category);
CREATE INDEX IF NOT EXISTS dua_requests_created_at_idx ON dua_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS dua_requests_urgent_idx ON dua_requests(is_urgent);