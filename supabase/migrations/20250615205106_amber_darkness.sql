/*
  # Veritabanı fonksiyonları ve tetikleyicileri oluştur

  1. Fonksiyonlar
    - Beğeniler eklendiğinde/kaldırıldığında beğeni sayılarını güncelle
    - Yorumlar eklendiğinde/kaldırıldığında yorum sayılarını güncelle
    - Kullanıcılar topluluklara katıldığında/ayrıldığında üye sayılarını güncelle
    - Kullanıcılar etkinliklere kayıt olduğunda/iptal ettiğinde katılımcı sayılarını güncelle

  2. Tetikleyiciler
    - İlgili kayıtlar değiştiğinde sayıları otomatik olarak güncelle
*/

-- Gönderi beğeni sayısını güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Dua isteği dua sayısını güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_dua_request_prayers_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE dua_requests 
    SET prayers_count = prayers_count + 1 
    WHERE id = NEW.dua_request_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE dua_requests 
    SET prayers_count = prayers_count - 1 
    WHERE id = OLD.dua_request_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Gönderi yorum sayısını güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Dua isteği yorum sayısını güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_dua_request_comments_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE dua_requests 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.dua_request_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE dua_requests 
    SET comments_count = comments_count - 1 
    WHERE id = OLD.dua_request_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Topluluk üye sayısını güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_community_member_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE communities 
    SET member_count = member_count + 1 
    WHERE id = NEW.community_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE communities 
    SET member_count = member_count - 1 
    WHERE id = OLD.community_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Etkinlik katılımcı sayısını güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_event_attendees_count()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events 
    SET attendees_count = attendees_count + 1 
    WHERE id = NEW.event_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events 
    SET attendees_count = attendees_count - 1 
    WHERE id = OLD.event_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Gönderi beğenileri için tetikleyiciler
CREATE OR REPLACE TRIGGER update_post_likes_count_trigger
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  WHEN (NEW.post_id IS NOT NULL OR OLD.post_id IS NOT NULL)
  EXECUTE FUNCTION update_post_likes_count();

-- Dua isteği duaları için tetikleyiciler
CREATE OR REPLACE TRIGGER update_dua_request_prayers_count_trigger
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  WHEN (NEW.dua_request_id IS NOT NULL OR OLD.dua_request_id IS NOT NULL)
  EXECUTE FUNCTION update_dua_request_prayers_count();

-- Gönderi yorumları için tetikleyiciler
CREATE OR REPLACE TRIGGER update_post_comments_count_trigger
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  WHEN (NEW.post_id IS NOT NULL OR OLD.post_id IS NOT NULL)
  EXECUTE FUNCTION update_post_comments_count();

-- Dua isteği yorumları için tetikleyiciler
CREATE OR REPLACE TRIGGER update_dua_request_comments_count_trigger
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  WHEN (NEW.dua_request_id IS NOT NULL OR OLD.dua_request_id IS NOT NULL)
  EXECUTE FUNCTION update_dua_request_comments_count();

-- Topluluk üyeleri için tetikleyiciler
CREATE OR REPLACE TRIGGER update_community_member_count_trigger
  AFTER INSERT OR DELETE ON community_members
  FOR EACH ROW
  EXECUTE FUNCTION update_community_member_count();

-- Etkinlik katılımcıları için tetikleyiciler
CREATE OR REPLACE TRIGGER update_event_attendees_count_trigger
  AFTER INSERT OR DELETE ON event_attendees
  FOR EACH ROW
  EXECUTE FUNCTION update_event_attendees_count();