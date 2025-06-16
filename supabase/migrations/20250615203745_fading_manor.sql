/*
  # Create community_members table

  1. New Tables
    - `community_members`
      - `id` (uuid, primary key) - Membership's unique identifier
      - `community_id` (uuid, foreign key) - Reference to communities table
      - `user_id` (uuid, foreign key) - Reference to users table
      - `role` (text) - Member role (member, admin, moderator)
      - `joined_at` (timestamp) - When user joined community

  2. Security
    - Enable RLS on `community_members` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'member' CHECK (role IN ('member', 'admin', 'moderator')),
  joined_at timestamptz DEFAULT now(),
  
  -- Ensure unique membership per user per community
  UNIQUE(community_id, user_id)
);

-- Enable RLS
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- Anyone can read community memberships (for member lists)
CREATE POLICY "Anyone can read community memberships"
  ON community_members
  FOR SELECT
  TO public
  USING (true);

-- Users can join communities (create membership)
CREATE POLICY "Users can join communities"
  ON community_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can leave communities (delete their own membership)
CREATE POLICY "Users can leave communities"
  ON community_members
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Community admins can manage memberships
CREATE POLICY "Community admins can manage memberships"
  ON community_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = community_members.community_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS community_members_community_id_idx ON community_members(community_id);
CREATE INDEX IF NOT EXISTS community_members_user_id_idx ON community_members(user_id);