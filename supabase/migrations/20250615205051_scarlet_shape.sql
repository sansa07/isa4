/*
  # Topluluk üyeleri tablosunu oluştur

  1. Yeni Tablolar
    - `community_members`
      - `id` (uuid, primary key) - Üyeliğin benzersiz kimliği
      - `community_id` (uuid, foreign key) - communities tablosuna referans
      - `user_id` (uuid, foreign key) - users tablosuna referans
      - `role` (text) - Üye rolü (member, admin, moderator)
      - `joined_at` (timestamp) - Kullanıcının topluluğa katılma zamanı

  2. Güvenlik
    - `community_members` tablosunda RLS'yi etkinleştir
    - CRUD işlemleri için politikalar ekle
*/

CREATE TABLE IF NOT EXISTS community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid REFERENCES communities(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role text DEFAULT 'member' CHECK (role IN ('member', 'admin', 'moderator')),
  joined_at timestamptz DEFAULT now(),
  
  -- Kullanıcı başına topluluk başına benzersiz üyelik sağla
  UNIQUE(community_id, user_id)
);

-- RLS'yi etkinleştir
ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

-- Herkes topluluk üyeliklerini okuyabilir (üye listeleri için)
CREATE POLICY "Anyone can read community memberships"
  ON community_members
  FOR SELECT
  TO public
  USING (true);

-- Kullanıcılar topluluklara katılabilir (üyelik oluştur)
CREATE POLICY "Users can join communities"
  ON community_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Kullanıcılar topluluklardan ayrılabilir (kendi üyeliklerini sil)
CREATE POLICY "Users can leave communities"
  ON community_members
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Topluluk yöneticileri üyelikleri yönetebilir
CREATE POLICY "Community admins can manage memberships"
  ON community_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = community_members.community_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'admin'
    )
  );

-- Daha iyi performans için indeksler oluştur
CREATE INDEX IF NOT EXISTS community_members_community_id_idx ON community_members(community_id);
CREATE INDEX IF NOT EXISTS community_members_user_id_idx ON community_members(user_id);