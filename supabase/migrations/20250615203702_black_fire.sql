/*
  # Create communities table

  1. New Tables
    - `communities`
      - `id` (uuid, primary key) - Community's unique identifier
      - `name` (text) - Community name
      - `description` (text) - Community description
      - `category` (text) - Community category
      - `is_private` (boolean) - Whether community is private
      - `cover_image` (text, optional) - URL to cover image
      - `location` (text, optional) - Community location
      - `member_count` (integer) - Number of members
      - `created_by` (uuid, foreign key) - Reference to users table
      - `created_at` (timestamp) - When community was created
      - `updated_at` (timestamp) - When community was last updated

  2. Security
    - Enable RLS on `communities` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  is_private boolean DEFAULT false,
  cover_image text,
  location text,
  member_count integer DEFAULT 1,
  created_by uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Anyone can read public communities
CREATE POLICY "Anyone can read public communities"
  ON communities
  FOR SELECT
  TO public
  USING (NOT is_private);

-- Authenticated users can read all communities (for join requests)
CREATE POLICY "Authenticated users can read communities"
  ON communities
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can create communities
CREATE POLICY "Users can create communities"
  ON communities
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Community creators can update their communities
CREATE POLICY "Creators can update communities"
  ON communities
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Community creators can delete their communities
CREATE POLICY "Creators can delete communities"
  ON communities
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Trigger to update updated_at on community changes
CREATE OR REPLACE TRIGGER update_communities_updated_at
  BEFORE UPDATE ON communities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS communities_created_by_idx ON communities(created_by);
CREATE INDEX IF NOT EXISTS communities_category_idx ON communities(category);
CREATE INDEX IF NOT EXISTS communities_created_at_idx ON communities(created_at DESC);