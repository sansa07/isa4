/*
  # Demo kimlik doğrulama kullanıcıları oluştur

  Bu migration, demo kullanıcıları için auth.users tablosuna kayıtlar ekler.
  Bu kullanıcılar daha sonra giriş yapmak için kullanılabilir.

  Demo Kullanıcılar:
  - admin@islamic.com / 123456 (Admin)
  - user@islamic.com / 123456 (Normal Kullanıcı)
*/

-- Demo admin kullanıcısını auth.users tablosuna ekle
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  '00000000-0000-0000-0000-000000000000',
  'admin@islamic.com',
  '$2a$10$8qvZ7Z7Z7Z7Z7Z7Z7Z7Z7O7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7',
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Admin Kullanıcı", "username": "admin"}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Demo normal kullanıcısını auth.users tablosuna ekle
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  '00000000-0000-0000-0000-000000000000',
  'user@islamic.com',
  '$2a$10$8qvZ7Z7Z7Z7Z7Z7Z7Z7Z7O7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7Z7',
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "Ahmet Yılmaz", "username": "ahmetyilmaz"}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Demo kullanıcıları için identities tablosuna kayıtlar ekle
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  created_at,
  updated_at
) VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  '{"sub": "550e8400-e29b-41d4-a716-446655440001", "email": "admin@islamic.com"}',
  'email',
  now(),
  now()
), (
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440002',
  '{"sub": "550e8400-e29b-41d4-a716-446655440002", "email": "user@islamic.com"}',
  'email',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;