/*
  # Etkinlikler tablosunu oluştur

  1. Yeni Tablolar
    - `events`
      - `id` (uuid, primary key) - Etkinliğin benzersiz kimliği
      - `title` (text) - Etkinlik başlığı
      - `description` (text) - Etkinlik açıklaması
      - `type` (text) - Etkinlik türü
      - `date` (date) - Etkinlik tarihi
      - `time` (time) - Etkinlik saati
      - `location_name` (text) - Konum adı
      - `location_address` (text) - Konum adresi
      - `location_city` (text) - Konum şehri
      - `organizer_name` (text) - Organizatör adı
      - `organizer_contact` (text, optional) - Organizatör iletişim
      - `capacity` (integer) - Etkinlik kapasitesi
      - `attendees_count` (integer) - Katılımcı sayısı
      - `price` (decimal) - Etkinlik ücreti
      - `is_online` (boolean) - Etkinliğin online olup olmadığı
      - `image_url` (text, optional) - Etkinlik resmi URL'si
      - `tags` (text array) - Etkinlik etiketleri
      - `requirements` (text array, optional) - Etkinlik gereksinimleri
      - `created_by` (uuid, foreign key) - users tablosuna referans
      - `created_at` (timestamp) - Etkinliğin oluşturulma zamanı
      - `updated_at` (timestamp) - Etkinliğin son güncellenme zamanı

  2. Güvenlik
    - `events` tablosunda RLS'yi etkinleştir
    - CRUD işlemleri için politikalar ekle
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

-- RLS'yi etkinleştir
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Herkes etkinlikleri okuyabilir
CREATE POLICY "Anyone can read events"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Kullanıcılar etkinlik oluşturabilir
CREATE POLICY "Users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Etkinlik oluşturucuları etkinliklerini güncelleyebilir
CREATE POLICY "Creators can update events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Etkinlik oluşturucuları etkinliklerini silebilir
CREATE POLICY "Creators can delete events"
  ON events
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Etkinlik değişikliklerinde updated_at'i güncelleme tetikleyicisi
CREATE OR REPLACE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Daha iyi performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS events_created_by_idx ON events(created_by);
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date);
CREATE INDEX IF NOT EXISTS events_city_idx ON events(location_city);
CREATE INDEX IF NOT EXISTS events_type_idx ON events(type);