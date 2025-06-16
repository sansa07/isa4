/*
  # Create event_attendees table

  1. New Tables
    - `event_attendees`
      - `id` (uuid, primary key) - Attendance's unique identifier
      - `event_id` (uuid, foreign key) - Reference to events table
      - `user_id` (uuid, foreign key) - Reference to users table
      - `registered_at` (timestamp) - When user registered for event

  2. Security
    - Enable RLS on `event_attendees` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS event_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  registered_at timestamptz DEFAULT now(),
  
  -- Ensure unique attendance per user per event
  UNIQUE(event_id, user_id)
);

-- Enable RLS
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

-- Anyone can read event attendees (for attendee lists)
CREATE POLICY "Anyone can read event attendees"
  ON event_attendees
  FOR SELECT
  TO public
  USING (true);

-- Users can register for events
CREATE POLICY "Users can register for events"
  ON event_attendees
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can unregister from events
CREATE POLICY "Users can unregister from events"
  ON event_attendees
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS event_attendees_event_id_idx ON event_attendees(event_id);
CREATE INDEX IF NOT EXISTS event_attendees_user_id_idx ON event_attendees(user_id);