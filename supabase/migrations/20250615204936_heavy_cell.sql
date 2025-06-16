/*
  # Kullanıcılar tablosunu oluştur

  1. Yeni Tablolar
    - `users`
      - `id` (uuid, primary key) - Kullanıcının benzersiz kimliği
      - `email` (text, unique) - Kullanıcının e-posta adresi
      - `name` (text) - Kullanıcının görünen adı
      - `username` (text, unique) - Kullanıcının benzersiz kullanıcı adı
      - `avatar_url` (text, optional) - Kullanıcının avatar resmi URL'si
      - `bio` (text, optional) - Kullanıcının biyografisi
      - `location` (text, optional) - Kullanıcının konumu
      - `website` (text, optional) - Kullanıcının web sitesi URL'si
      - `verified` (boolean) - Kullanıcının doğrulanmış olup olmadığı
      - `role` (text) - Kullanıcının rolü (user, admin, moderator)
      - `created_at` (timestamp) - Kullanıcının oluşturulma zamanı
      - `updated_at` (timestamp) - Kullanıcının son güncellenme zamanı

  2. Güvenlik
    - `users` tablosunda RLS'yi etkinleştir
    - Kullanıcıların kendi verilerini okuma ve güncelleme politikaları
    - Temel kullanıcı bilgilerine genel okuma erişimi politikası
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  username text UNIQUE NOT NULL,
  avatar_url text,
  bio text,
  location text,
  website text,
  verified boolean DEFAULT false,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS'yi etkinleştir
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar kendi verilerini okuyabilir
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Kullanıcılar kendi verilerini güncelleyebilir
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Herkes temel kullanıcı bilgilerini okuyabilir (profiller, gönderiler vb. için)
CREATE POLICY "Public can read basic user info"
  ON users
  FOR SELECT
  TO public
  USING (true);

-- Yeni kullanıcı oluşturma fonksiyonu
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO users (id, email, name, username)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Kayıt olma sırasında kullanıcı profili oluşturma tetikleyicisi
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- updated_at sütununu güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Kullanıcı değişikliklerinde updated_at'i güncelleme tetikleyicisi
CREATE OR REPLACE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();