/*
  # Create database functions and triggers

  1. Functions
    - Update like counts when likes are added/removed
    - Update comment counts when comments are added/removed
    - Update member counts when users join/leave communities
    - Update attendee counts when users register/unregister for events

  2. Triggers
    - Automatically update counts when related records change
*/

-- Function to update post likes count
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

-- Function to update dua request prayers count
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

-- Function to update post comments count
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

-- Function to update dua request comments count
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

-- Function to update community member count
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

-- Function to update event attendees count
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

-- Triggers for post likes
CREATE OR REPLACE TRIGGER update_post_likes_count_trigger
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  WHEN (NEW.post_id IS NOT NULL OR OLD.post_id IS NOT NULL)
  EXECUTE FUNCTION update_post_likes_count();

-- Triggers for dua request prayers
CREATE OR REPLACE TRIGGER update_dua_request_prayers_count_trigger
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW
  WHEN (NEW.dua_request_id IS NOT NULL OR OLD.dua_request_id IS NOT NULL)
  EXECUTE FUNCTION update_dua_request_prayers_count();

-- Triggers for post comments
CREATE OR REPLACE TRIGGER update_post_comments_count_trigger
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  WHEN (NEW.post_id IS NOT NULL OR OLD.post_id IS NOT NULL)
  EXECUTE FUNCTION update_post_comments_count();

-- Triggers for dua request comments
CREATE OR REPLACE TRIGGER update_dua_request_comments_count_trigger
  AFTER INSERT OR DELETE ON comments
  FOR EACH ROW
  WHEN (NEW.dua_request_id IS NOT NULL OR OLD.dua_request_id IS NOT NULL)
  EXECUTE FUNCTION update_dua_request_comments_count();

-- Triggers for community members
CREATE OR REPLACE TRIGGER update_community_member_count_trigger
  AFTER INSERT OR DELETE ON community_members
  FOR EACH ROW
  EXECUTE FUNCTION update_community_member_count();

-- Triggers for event attendees
CREATE OR REPLACE TRIGGER update_event_attendees_count_trigger
  AFTER INSERT OR DELETE ON event_attendees
  FOR EACH ROW
  EXECUTE FUNCTION update_event_attendees_count();