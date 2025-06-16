/*
  # Gönderiler tablosunu oluştur

  1. Yeni Tablolar
    - `posts`
      - `id` (uuid, primary key) - Gönderinin benzersiz kimliği
      - `user_id` (uuid, foreign key) - users tablosuna referans
      - `content` (text) - Gönderi içeriği
      - `type` (text) - Gönderi türü (text, image, video)
      - `media_url` (text, optional) - Medya dosyası URL'si
      - `category` (text) - Gönderi kategorisi
      - `tags` (text array) - Gönderi etiketleri
      - `likes_count` (integer) - Beğeni sayısı
      - `comments_count` (integer) - Yorum sayısı
      - `shares_count` (integer) - Paylaşım sayısı
      - `created_at` (timestamp) - Gönderinin oluşturulma zamanı
      - `updated_at` (timestamp) - Gönderinin son güncellenme zamanı

  2. Güvenlik
    - `posts` tablosunda RLS'yi etkinleştir
    - CRUD işlemleri için politikalar ekle
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  type text DEFAULT 'text' CHECK (type IN ('text', 'image', 'video')),
  media_url text,
  category text DEFAULT 'Genel',
  tags text[] DEFAULT '{}',
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS'yi etkinleştir
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Herkes gönderileri okuyabilir
CREATE POLICY "Anyone can read posts"
  ON posts
  FOR SELECT
  TO public
  USING (true);

-- Kullanıcılar kendi gönderilerini oluşturabilir
CREATE POLICY "Users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi gönderilerini güncelleyebilir
CREATE POLICY "Users can update own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Kullanıcılar kendi gönderilerini silebilir
CREATE POLICY "Users can delete own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Gönderi değişikliklerinde updated_at'i güncelleme tetikleyicisi
CREATE OR REPLACE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Daha iyi performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS posts_user_id_idx ON posts(user_id);
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS posts_category_idx ON posts(category);