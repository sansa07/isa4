/*
  # Topluluklar tablosunu oluştur

  1. Yeni Tablolar
    - `communities`
      - `id` (uuid, primary key) - Topluluğun benzersiz kimliği
      - `name` (text) - Topluluk adı
      - `description` (text) - Topluluk açıklaması
      - `category` (text) - Topluluk kategorisi
      - `is_private` (boolean) - Topluluğun özel olup olmadığı
      - `cover_image` (text, optional) - Kapak resmi URL'si
      - `location` (text, optional) - Topluluk konumu
      - `member_count` (integer) - Üye sayısı
      - `created_by` (uuid, foreign key) - users tablosuna referans
      - `created_at` (timestamp) - Topluluğun oluşturulma zamanı
      - `updated_at` (timestamp) - Topluluğun son güncellenme zamanı

  2. Güvenlik
    - `communities` tablosunda RLS'yi etkinleştir
    - CRUD işlemleri için politikalar ekle
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

-- RLS'yi etkinleştir
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Herkes açık toplulukları okuyabilir
CREATE POLICY "Anyone can read public communities"
  ON communities
  FOR SELECT
  TO public
  USING (NOT is_private);

-- Kimlik doğrulaması yapılmış kullanıcılar tüm toplulukları okuyabilir (katılım istekleri için)
CREATE POLICY "Authenticated users can read communities"
  ON communities
  FOR SELECT
  TO authenticated
  USING (true);

-- Kullanıcılar topluluk oluşturabilir
CREATE POLICY "Users can create communities"
  ON communities
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Topluluk oluşturucuları topluluklarını güncelleyebilir
CREATE POLICY "Creators can update communities"
  ON communities
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Topluluk oluşturucuları topluluklarını silebilir
CREATE POLICY "Creators can delete communities"
  ON communities
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Topluluk değişikliklerinde updated_at'i güncelleme tetikleyicisi
CREATE OR REPLACE TRIGGER update_communities_updated_at
  BEFORE UPDATE ON communities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Daha iyi performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS communities_created_by_idx ON communities(created_by);
CREATE INDEX IF NOT EXISTS communities_category_idx ON communities(category);
CREATE INDEX IF NOT EXISTS communities_created_at_idx ON communities(created_at DESC);