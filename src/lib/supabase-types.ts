// Database type definitions for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          username: string;
          avatar_url: string | null;
          bio: string | null;
          location: string | null;
          website: string | null;
          verified: boolean;
          role: 'user' | 'admin' | 'moderator';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          username: string;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          verified?: boolean;
          role?: 'user' | 'admin' | 'moderator';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          username?: string;
          avatar_url?: string | null;
          bio?: string | null;
          location?: string | null;
          website?: string | null;
          verified?: boolean;
          role?: 'user' | 'admin' | 'moderator';
          created_at?: string;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          type: 'text' | 'image' | 'video';
          media_url: string | null;
          category: string;
          tags: string[];
          likes_count: number;
          comments_count: number;
          shares_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          type?: 'text' | 'image' | 'video';
          media_url?: string | null;
          category?: string;
          tags?: string[];
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          type?: 'text' | 'image' | 'video';
          media_url?: string | null;
          category?: string;
          tags?: string[];
          likes_count?: number;
          comments_count?: number;
          shares_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      communities: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: string;
          is_private: boolean;
          cover_image: string | null;
          location: string | null;
          member_count: number;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          category: string;
          is_private?: boolean;
          cover_image?: string | null;
          location?: string | null;
          member_count?: number;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category?: string;
          is_private?: boolean;
          cover_image?: string | null;
          location?: string | null;
          member_count?: number;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: string;
          date: string;
          time: string;
          location_name: string;
          location_address: string;
          location_city: string;
          organizer_name: string;
          organizer_contact: string | null;
          capacity: number;
          attendees_count: number;
          price: number;
          is_online: boolean;
          image_url: string | null;
          tags: string[];
          requirements: string[] | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: string;
          date: string;
          time: string;
          location_name: string;
          location_address: string;
          location_city: string;
          organizer_name: string;
          organizer_contact?: string | null;
          capacity?: number;
          attendees_count?: number;
          price?: number;
          is_online?: boolean;
          image_url?: string | null;
          tags?: string[];
          requirements?: string[] | null;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: string;
          date?: string;
          time?: string;
          location_name?: string;
          location_address?: string;
          location_city?: string;
          organizer_name?: string;
          organizer_contact?: string | null;
          capacity?: number;
          attendees_count?: number;
          price?: number;
          is_online?: boolean;
          image_url?: string | null;
          tags?: string[];
          requirements?: string[] | null;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      dua_requests: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          category: string;
          is_urgent: boolean;
          is_anonymous: boolean;
          tags: string[];
          prayers_count: number;
          comments_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          category: string;
          is_urgent?: boolean;
          is_anonymous?: boolean;
          tags?: string[];
          prayers_count?: number;
          comments_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          category?: string;
          is_urgent?: boolean;
          is_anonymous?: boolean;
          tags?: string[];
          prayers_count?: number;
          comments_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string | null;
          dua_request_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id?: string | null;
          dua_request_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_id?: string | null;
          dua_request_id?: string | null;
          created_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          user_id: string;
          post_id: string | null;
          dua_request_id: string | null;
          content: string;
          is_prayer: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id?: string | null;
          dua_request_id?: string | null;
          content: string;
          is_prayer?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_id?: string | null;
          dua_request_id?: string | null;
          content?: string;
          is_prayer?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          post_id: string | null;
          dua_request_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id?: string | null;
          dua_request_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          post_id?: string | null;
          dua_request_id?: string | null;
          created_at?: string;
        };
      };
      community_members: {
        Row: {
          id: string;
          community_id: string;
          user_id: string;
          role: 'member' | 'admin' | 'moderator';
          joined_at: string;
        };
        Insert: {
          id?: string;
          community_id: string;
          user_id: string;
          role?: 'member' | 'admin' | 'moderator';
          joined_at?: string;
        };
        Update: {
          id?: string;
          community_id?: string;
          user_id?: string;
          role?: 'member' | 'admin' | 'moderator';
          joined_at?: string;
        };
      };
      event_attendees: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          registered_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          user_id: string;
          registered_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          user_id?: string;
          registered_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}