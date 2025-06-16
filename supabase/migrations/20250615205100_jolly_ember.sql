/*
  # Etkinlik katılımcıları tablosunu oluştur

  1. Yeni Tablolar
    - `event_attendees`
      - `id` (uuid, primary key) - Katılımın benzersiz kimliği
      - `event_id` (uuid, foreign key) - events tablosuna referans
      - `user_id` (uuid, foreign key) - users tablosuna referans
      - `registered_at` (timestamp) - Kullanıcının etkinliğe kayıt olma zamanı

  2. Güvenlik
    - `event_attendees` tablosunda RLS'yi etkinleştir
    - CRUD işlemleri için politikalar ekle
*/

CREATE TABLE IF NOT EXISTS event_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  registered_at timestamptz DEFAULT now(),
  
  -- Kullanıcı başına etkinlik başına benzersiz katılım sağla
  UNIQUE(event_id, user_id)
);

-- RLS'yi etkinleştir
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;

-- Herkes etkinlik katılımcılarını okuyabilir (katılımcı listeleri için)
CREATE POLICY "Anyone can read event attendees"
  ON event_attendees
  FOR SELECT
  TO public
  USING (true);

-- Kullanıcılar etkinliklere kayıt olabilir
CREATE POLICY "Users can register for events"
  ON event_attendees
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar etkinliklerden kayıt iptal edebilir
CREATE POLICY "Users can unregister from events"
  ON event_attendees
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Daha iyi performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS event_attendees_event_id_idx ON event_attendees(event_id);
CREATE INDEX IF NOT EXISTS event_attendees_user_id_idx ON event_attendees(user_id);