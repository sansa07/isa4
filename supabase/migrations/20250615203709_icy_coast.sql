/*
  # Create events table

  1. New Tables
    - `events`
      - `id` (uuid, primary key) - Event's unique identifier
      - `title` (text) - Event title
      - `description` (text) - Event description
      - `type` (text) - Event type
      - `date` (date) - Event date
      - `time` (time) - Event time
      - `location_name` (text) - Location name
      - `location_address` (text) - Location address
      - `location_city` (text) - Location city
      - `organizer_name` (text) - Organizer name
      - `organizer_contact` (text, optional) - Organizer contact
      - `capacity` (integer) - Event capacity
      - `attendees_count` (integer) - Number of attendees
      - `price` (decimal) - Event price
      - `is_online` (boolean) - Whether event is online
      - `image_url` (text, optional) - URL to event image
      - `tags` (text array) - Event tags
      - `requirements` (text array, optional) - Event requirements
      - `created_by` (uuid, foreign key) - Reference to users table
      - `created_at` (timestamp) - When event was created
      - `updated_at` (timestamp) - When event was last updated

  2. Security
    - Enable RLS on `events` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  location_name text NOT NULL,
  location_address text NOT NULL,
  location_city text NOT NULL,
  organizer_name text NOT NULL,
  organizer_contact text,
  capacity integer DEFAULT 100,
  attendees_count integer DEFAULT 0,
  price decimal(10,2) DEFAULT 0,
  is_online boolean DEFAULT false,
  image_url text,
  tags text[] DEFAULT '{}',
  requirements text[] DEFAULT '{}',
  created_by uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Anyone can read events
CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Users can create events
CREATE POLICY "Users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Event creators can update their events
CREATE POLICY "Creators can update events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Event creators can delete their events
CREATE POLICY "Creators can delete events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Trigger to update updated_at on event changes
CREATE OR REPLACE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS events_created_by_idx ON events(created_by);
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date);
CREATE INDEX IF NOT EXISTS events_city_idx ON events(location_city);
CREATE INDEX IF NOT EXISTS events_type_idx ON events(type);