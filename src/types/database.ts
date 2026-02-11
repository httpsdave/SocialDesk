export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          cover_url: string | null;
          bio: string | null;
          website: string | null;
          timezone: string;
          notification_email: boolean;
          notification_push: boolean;
          notification_sms: boolean;
          theme: string;
          settings_json: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          cover_url?: string | null;
          bio?: string | null;
          website?: string | null;
          timezone?: string;
          notification_email?: boolean;
          notification_push?: boolean;
          notification_sms?: boolean;
          theme?: string;
          settings_json?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          cover_url?: string | null;
          bio?: string | null;
          website?: string | null;
          timezone?: string;
          notification_email?: boolean;
          notification_push?: boolean;
          notification_sms?: boolean;
          theme?: string;
          settings_json?: Json | null;
          updated_at?: string;
        };
      };
      connected_accounts: {
        Row: {
          id: string;
          user_id: string;
          platform: string;
          platform_user_id: string | null;
          platform_username: string | null;
          platform_display_name: string | null;
          platform_avatar_url: string | null;
          access_token: string;
          refresh_token: string | null;
          token_expires_at: string | null;
          scopes: string[] | null;
          followers_count: number;
          is_active: boolean;
          connected_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          platform: string;
          platform_user_id?: string | null;
          platform_username?: string | null;
          platform_display_name?: string | null;
          platform_avatar_url?: string | null;
          access_token: string;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          scopes?: string[] | null;
          followers_count?: number;
          is_active?: boolean;
          connected_at?: string;
          updated_at?: string;
        };
        Update: {
          platform_user_id?: string | null;
          platform_username?: string | null;
          platform_display_name?: string | null;
          platform_avatar_url?: string | null;
          access_token?: string;
          refresh_token?: string | null;
          token_expires_at?: string | null;
          scopes?: string[] | null;
          followers_count?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          media_urls: string[] | null;
          platforms: string[];
          status: 'draft' | 'scheduled' | 'published' | 'failed';
          scheduled_at: string | null;
          published_at: string | null;
          platform_post_ids: Json | null;
          error_message: string | null;
          char_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          media_urls?: string[] | null;
          platforms: string[];
          status?: 'draft' | 'scheduled' | 'published' | 'failed';
          scheduled_at?: string | null;
          published_at?: string | null;
          platform_post_ids?: Json | null;
          error_message?: string | null;
          char_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          media_urls?: string[] | null;
          platforms?: string[];
          status?: 'draft' | 'scheduled' | 'published' | 'failed';
          scheduled_at?: string | null;
          published_at?: string | null;
          platform_post_ids?: Json | null;
          error_message?: string | null;
          char_count?: number;
          updated_at?: string;
        };
      };
      analytics_cache: {
        Row: {
          id: string;
          user_id: string;
          connected_account_id: string;
          platform: string;
          metric_type: string;
          metric_data: Json;
          date_range_start: string;
          date_range_end: string;
          fetched_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          connected_account_id: string;
          platform: string;
          metric_type: string;
          metric_data: Json;
          date_range_start: string;
          date_range_end: string;
          fetched_at?: string;
        };
        Update: {
          metric_data?: Json;
          fetched_at?: string;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: {
      post_status: 'draft' | 'scheduled' | 'published' | 'failed';
      platform_type: 'tiktok' | 'x' | 'facebook' | 'instagram' | 'youtube' | 'youtube-shorts' | 'pinterest';
    };
  };
}
