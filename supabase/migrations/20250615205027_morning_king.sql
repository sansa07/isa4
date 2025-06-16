/*
  # Beğeniler tablosunu oluştur

  1. Yeni Tablolar
    - `likes`
      - `id` (uuid, primary key) - Beğeninin benzersiz kimliği
      - `user_id` (uuid, foreign key) - users tablosuna referans
      - `post_id` (uuid, foreign key, optional) - posts tablosuna referans
      - `dua_request_id` (uuid, foreign key, optional) - dua_requests tablosuna referans
      - `created_at` (timestamp) - Beğeninin oluşturulma zamanı

  2. Güvenlik
    - `likes` tablosunda RLS'yi etkinleştir
    - CRUD işlemleri için politikalar ekle
    - Beğeni başına sadece bir tür referans olmasını sağlayan kısıtlamalar ekle
*/

CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  dua_request_id uuid REFERENCES dua_requests(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  
  -- Beğeni başına sadece bir tür referans olmasını sağla
  CONSTRAINT likes_single_reference CHECK (
    (post_id IS NOT NULL AND dua_request_id IS NULL) OR
    (post_id IS NULL AND dua_request_id IS NOT NULL)
  )
);

-- RLS'yi etkinleştir
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar tüm beğenileri okuyabilir
CREATE POLICY "Users can read likes"
  ON likes
  FOR SELECT
  TO authenticated
  USING (true);

-- Kullanıcılar beğeni oluşturabilir
CREATE POLICY "Users can create likes"
  ON likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar kendi beğenilerini silebilir
CREATE POLICY "Users can delete own likes"
  ON likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Çift beğeniyi önlemek için benzersiz indeksler oluştur
CREATE UNIQUE INDEX IF NOT EXISTS likes_user_post_unique 
  ON likes(user_id, post_id) 
  WHERE post_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS likes_user_dua_request_unique 
  ON likes(user_id, dua_request_id) 
  WHERE dua_request_id IS NOT NULL;

-- Daha iyi performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS likes_post_id_idx ON likes(post_id);
CREATE INDEX IF NOT EXISTS likes_dua_request_id_idx ON likes(dua_request_id);