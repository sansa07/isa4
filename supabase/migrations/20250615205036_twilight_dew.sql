/*
  # Yorumlar tablosunu oluştur

  1. Yeni Tablolar
    - `comments`
      - `id` (uuid, primary key) - Yorumun benzersiz kimliği
      - `user_id` (uuid, foreign key) - users tablosuna referans
      - `post_id` (uuid, foreign key, optional) - posts tablosuna referans
      - `dua_request_id` (uuid, foreign key, optional) - dua_requests tablosuna referans
      - `content` (text) - Yorum içeriği
      - `is_prayer` (boolean) - Yorumun dua olup olmadığı (dua istekleri için)
      - `created_at` (timestamp) - Yorumun oluşturulma zamanı
      - `updated_at` (timestamp) - Yorumun son güncellenme zamanı

  2. Güvenlik
    - `comments` tablosunda RLS'yi etkinleştir
    - CRUD işlemleri için politikalar ekle
    - Yorum başına sadece bir tür referans olmasını sağlayan kısıtlamalar ekle
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
  
  -- Yorum başına sadece bir tür referans olmasını sağla
  CONSTRAINT comments_single_reference CHECK (
    (post_id IS NOT NULL AND dua_request_id IS NULL) OR
    (post_id IS NULL AND dua_request_id IS NOT NULL)
  )
);

-- RLS'yi etkinleştir
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Herkes yorumları okuyabilir
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

-- Kullanıcılar yorum oluşturabilir
CREATE POLICY "Users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi yorumlarını güncelleyebilir
CREATE POLICY "Users can update own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Kullanıcılar kendi yorumlarını silebilir
CREATE POLICY "Users can delete own comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Yorum değişikliklerinde updated_at'i güncelleme tetikleyicisi
CREATE OR REPLACE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Daha iyi performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS comments_user_id_idx ON comments(user_id);
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);
CREATE INDEX IF NOT EXISTS comments_dua_request_id_idx ON comments(dua_request_id);
CREATE INDEX IF NOT EXISTS comments_created_at_idx ON comments(created_at DESC);