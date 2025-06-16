/*
  # Yer imleri tablosunu oluştur

  1. Yeni Tablolar
    - `bookmarks`
      - `id` (uuid, primary key) - Yer iminin benzersiz kimliği
      - `user_id` (uuid, foreign key) - users tablosuna referans
      - `post_id` (uuid, foreign key, optional) - posts tablosuna referans
      - `dua_request_id` (uuid, foreign key, optional) - dua_requests tablosuna referans
      - `created_at` (timestamp) - Yer iminin oluşturulma zamanı

  2. Güvenlik
    - `bookmarks` tablosunda RLS'yi etkinleştir
    - CRUD işlemleri için politikalar ekle
    - Yer imi başına sadece bir tür referans olmasını sağlayan kısıtlamalar ekle
*/

CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  dua_request_id uuid REFERENCES dua_requests(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Yer imi başına sadece bir tür referans olmasını sağla
  CONSTRAINT bookmarks_single_reference CHECK (
    (post_id IS NOT NULL AND dua_request_id IS NULL) OR
    (post_id IS NULL AND dua_request_id IS NOT NULL)
  )
);

-- RLS'yi etkinleştir
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar kendi yer imlerini okuyabilir
CREATE POLICY "Users can read own bookmarks"
  ON bookmarks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Kullanıcılar yer imi oluşturabilir
CREATE POLICY "Users can create bookmarks"
  ON bookmarks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi yer imlerini silebilir
CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Çift yer imi önlemek için benzersiz indeksler oluştur
CREATE UNIQUE INDEX IF NOT EXISTS bookmarks_user_post_unique 
  ON bookmarks(user_id, post_id) 
  WHERE post_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS bookmarks_user_dua_request_unique 
  ON bookmarks(user_id, dua_request_id) 
  WHERE dua_request_id IS NOT NULL;

-- Daha iyi performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS bookmarks_post_id_idx ON bookmarks(post_id);
CREATE INDEX IF NOT EXISTS bookmarks_dua_request_id_idx ON bookmarks(dua_request_id);