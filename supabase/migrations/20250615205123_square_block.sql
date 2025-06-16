/*
  # Demo verilerini ekle

  1. Demo Verileri
    - Demo kullanıcılar (admin ve normal kullanıcılar)
    - Demo gönderiler
    - Demo topluluklar
    - Demo etkinlikler
    - Demo dua istekleri
    - Demo etkileşimler (beğeniler, yorumlar, yer imleri)

  Not: Bu geliştirme/demo amaçlıdır
*/

-- Demo kullanıcıları ekle
INSERT INTO users (id, email, name, username, bio, location, verified, role) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@islamic.com', 'Admin Kullanıcı', 'admin', 'Platform yöneticisi', 'İstanbul', true, 'admin'),
  ('550e8400-e29b-41d4-a716-446655440002', 'ahmet@example.com', 'Ahmet Yılmaz', 'ahmetyilmaz', 'İslami değerleri yaşamaya çalışan bir kardeşiniz', 'İstanbul', true, 'user'),
  ('550e8400-e29b-41d4-a716-446655440003', 'fatma@example.com', 'Fatma Özkan', 'fatmaozkan', 'İslami sanat ve mimari ile ilgileniyorum', 'Ankara', false, 'user'),
  ('550e8400-e29b-41d4-a716-446655440004', 'mehmet@example.com', 'Mehmet Demir', 'mehmetdemir', 'Hafız ve Kur''an öğreticisi', 'İzmir', true, 'user'),
  ('550e8400-e29b-41d4-a716-446655440005', 'ayse@example.com', 'Ayşe Kaya', 'aysekaya', 'Aile danışmanı ve eğitimci', 'Bursa', false, 'user')
ON CONFLICT (id) DO NOTHING;

-- Demo gönderileri ekle
INSERT INTO posts (id, user_id, content, type, category, tags, likes_count, comments_count) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Bugün sabah namazından sonra okuduğum bu ayet çok etkiledi: "Ve O, her şeye gücü yeten, her şeyi bilendir." (Bakara 2:109) Allah''ın kudretini düşünmek insanı ne kadar da huzurlu kılıyor.', 'text', 'Ayetler', ARRAY['ayet', 'sabah namazı', 'huzur'], 47, 12),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'Cuma namazı sonrası cemaatle birlikte okuduğumuz dualar... Maşallah ne güzel bir atmosfer vardı. Allah kabul etsin.', 'text', 'İbadet', ARRAY['cuma namazı', 'dua', 'cemaat'], 89, 23),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 'Hz. Peygamber (s.a.v) buyurdu: "Mümin, insanların kendisinden emin olduğu kişidir." Bu hadis günümüzde ne kadar da önemli...', 'text', 'Hadisler', ARRAY['hadis', 'güven', 'ahlak'], 156, 34)
ON CONFLICT (id) DO NOTHING;

-- Demo toplulukları ekle
INSERT INTO communities (id, name, description, category, is_private, location, member_count, created_by) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', 'İstanbul Cami Cemaati', 'İstanbul''daki camilerimizde bir araya gelen kardeşlerimizin buluşma noktası. Namaz vakitleri, hutbe özetleri ve dini sohbetler.', 'Yerel Cemaat', false, 'İstanbul', 1247, '550e8400-e29b-41d4-a716-446655440002'),
  ('750e8400-e29b-41d4-a716-446655440002', 'Kur''an Okuma Grubu', 'Kur''an-ı Kerim''i güzel okumayı öğrenmek ve tecvid kurallarını pekiştirmek isteyenler için. Haftalık online dersler ve pratik seansları.', 'Eğitim', false, 'Online', 856, '550e8400-e29b-41d4-a716-446655440004'),
  ('750e8400-e29b-41d4-a716-446655440003', 'Genç Müslümanlar', 'Gençlerin İslami değerler çerçevesinde bir araya geldiği, deneyim paylaştığı ve birbirini desteklediği topluluk.', 'Gençlik', false, 'Türkiye', 2341, '550e8400-e29b-41d4-a716-446655440005')
ON CONFLICT (id) DO NOTHING;

-- Demo etkinlikleri ekle
INSERT INTO events (id, title, description, type, date, time, location_name, location_address, location_city, organizer_name, capacity, attendees_count, price, is_online, tags, created_by) VALUES
  ('850e8400-e29b-41d4-a716-446655440001', 'İslam''da Aile Hayatı Semineri', 'İslami değerler çerçevesinde aile kurumu, eş seçimi, çocuk eğitimi ve aile içi iletişim konularında uzman görüşleri.', 'seminar', '2024-02-15', '14:00', 'Fatih Camii Konferans Salonu', 'Fevzi Paşa Cad. No:1', 'İstanbul', 'İstanbul İslami Araştırmalar Merkezi', 200, 156, 0, false, ARRAY['aile', 'evlilik', 'eğitim'], '550e8400-e29b-41d4-a716-446655440002'),
  ('850e8400-e29b-41d4-a716-446655440002', 'Kur''an-ı Kerim Tecvid Kursu', 'Başlangıç seviyesinden ileri seviyeye Kur''an-ı Kerim''i güzel okuma sanatı. 8 haftalık yoğun program.', 'workshop', '2024-02-20', '19:00', 'Online Platform', 'Zoom Üzerinden', 'Online', 'Hafız Mehmet Yılmaz', 50, 23, 150, true, ARRAY['kur''an', 'tecvid', 'online'], '550e8400-e29b-41d4-a716-446655440004')
ON CONFLICT (id) DO NOTHING;

-- Demo dua isteklerini ekle
INSERT INTO dua_requests (id, user_id, title, content, category, is_urgent, is_anonymous, tags, prayers_count, comments_count) VALUES
  ('950e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'Annem için şifa duası', 'Sevgili kardeşlerim, annem geçirdiği ameliyat sonrası iyileşme sürecinde. Kendisi için dua etmenizi rica ediyorum. Allah şifa versin inşallah.', 'Sağlık', true, true, ARRAY['şifa', 'aile', 'ameliyat'], 156, 23),
  ('950e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 'İş bulabilmek için', 'Uzun süredir iş arıyorum. Ailemi geçindirmekte zorlanıyorum. Bana uygun bir iş bulabilmem için dualarınızı bekliyorum.', 'İş & Kariyer', false, false, ARRAY['iş', 'aile', 'geçim'], 89, 12)
ON CONFLICT (id) DO NOTHING;

-- Demo topluluk üyeliklerini ekle
INSERT INTO community_members (community_id, user_id, role) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'admin'),
  ('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'member'),
  ('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'admin'),
  ('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'member'),
  ('750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 'admin')
ON CONFLICT (community_id, user_id) DO NOTHING;

-- Demo etkinlik katılımcılarını ekle
INSERT INTO event_attendees (event_id, user_id) VALUES
  ('850e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'),
  ('850e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003'),
  ('850e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004'),
  ('850e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005')
ON CONFLICT (event_id, user_id) DO NOTHING;

-- Demo beğenileri ekle
INSERT INTO likes (user_id, post_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002'),
  ('550e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440003')
ON CONFLICT (user_id, post_id) DO NOTHING;

INSERT INTO likes (user_id, dua_request_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440004', '950e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440003', '950e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (user_id, dua_request_id) DO NOTHING;

-- Demo yorumları ekle
INSERT INTO comments (user_id, post_id, content) VALUES
  ('550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', 'Çok güzel bir paylaşım, teşekkürler kardeşim.'),
  ('550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440001', 'Bu ayet gerçekten çok etkileyici. Allah''ın kudretini hatırlatıyor.'),
  ('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', 'Maşallah, cemaat halinde ibadet ne güzel.')
ON CONFLICT DO NOTHING;

INSERT INTO comments (user_id, dua_request_id, content, is_prayer) VALUES
  ('550e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440001', 'Anneniz için dua ediyorum. Allah şifa versin inşallah. 🤲', true),
  ('550e8400-e29b-41d4-a716-446655440004', '950e8400-e29b-41d4-a716-446655440001', 'Rabbim şifa versin, sabır versin. Dualarımdasınız.', true),
  ('550e8400-e29b-41d4-a716-446655440005', '950e8400-e29b-41d4-a716-446655440002', 'İnşallah en kısa zamanda hayırlı bir iş bulursunuz. Dualarımdasınız.', true)
ON CONFLICT DO NOTHING;

-- Demo yer imlerini ekle
INSERT INTO bookmarks (user_id, post_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440003'),
  ('550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001')
ON CONFLICT (user_id, post_id) DO NOTHING;

INSERT INTO bookmarks (user_id, dua_request_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440004', '950e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (user_id, dua_request_id) DO NOTHING;