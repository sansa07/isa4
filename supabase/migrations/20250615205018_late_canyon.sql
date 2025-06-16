/*
  # Dua istekleri tablosunu oluştur

  1. Yeni Tablolar
    - `dua_requests`
      - `id` (uuid, primary key) - Dua isteğinin benzersiz kimliği
      - `user_id` (uuid, foreign key) - users tablosuna referans
      - `title` (text) - Dua isteği başlığı
      - `content` (text) - Dua isteği içeriği
      - `category` (text) - Dua isteği kategorisi
      - `is_urgent` (boolean) - İsteğin acil olup olmadığı
      - `is_anonymous` (boolean) - İsteğin anonim olup olmadığı
      - `tags` (text array) - Dua isteği etiketleri
      - `prayers_count` (integer) - Dua sayısı
      - `comments_count` (integer) - Yorum sayısı
      - `created_at` (timestamp) - İsteğin oluşturulma zamanı
      - `updated_at` (timestamp) - İsteğin son güncellenme zamanı

  2. Güvenlik
    - `dua_requests` tablosunda RLS'yi etkinleştir
    - CRUD işlemleri için politikalar ekle
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

-- RLS'yi etkinleştir
ALTER TABLE dua_requests ENABLE ROW LEVEL SECURITY;

-- Herkes dua isteklerini okuyabilir
CREATE POLICY "Anyone can read dua requests"
  ON dua_requests
  FOR SELECT
  TO public
  USING (true);

-- Kullanıcılar dua isteği oluşturabilir
CREATE POLICY "Users can create dua requests"
  ON dua_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi dua isteklerini güncelleyebilir
CREATE POLICY "Users can update own dua requests"
  ON dua_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Kullanıcılar kendi dua isteklerini silebilir
CREATE POLICY "Users can delete own dua requests"
  ON dua_requests
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Dua isteği değişikliklerinde updated_at'i güncelleme tetikleyicisi
CREATE OR REPLACE TRIGGER update_dua_requests_updated_at
  BEFORE UPDATE ON dua_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Daha iyi performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS dua_requests_user_id_idx ON dua_requests(user_id);
CREATE INDEX IF NOT EXISTS dua_requests_category_idx ON dua_requests(category);
CREATE INDEX IF NOT EXISTS dua_requests_created_at_idx ON dua_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS dua_requests_urgent_idx ON dua_requests(is_urgent);