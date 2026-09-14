export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      career_applications: {
        Row: {
          created_at: string
          email: string
          experience: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          message: string | null
          name: string
          phone: string | null
          portfolio_url: string | null
          role: string
          updated_at: string
          work_type: string | null
        }
        Insert: {
          created_at?: string
          email: string
          experience?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          message?: string | null
          name: string
          phone?: string | null
          portfolio_url?: string | null
          role: string
          updated_at?: string
          work_type?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          experience?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          role?: string
          updated_at?: string
          work_type?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      insight_clusters: {
        Row: {
          category: string
          created_at: string
          id: number
          meta_description: string
          pillar_slug: string
          pillar_title: string
          pillar_topic_id: number | null
          primary_keyword: string
          slug: string
          topic_count: number
        }
        Insert: {
          category: string
          created_at?: string
          id: number
          meta_description: string
          pillar_slug: string
          pillar_title: string
          pillar_topic_id?: number | null
          primary_keyword: string
          slug: string
          topic_count?: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          meta_description?: string
          pillar_slug?: string
          pillar_title?: string
          pillar_topic_id?: number | null
          primary_keyword?: string
          slug?: string
          topic_count?: number
        }
        Relationships: []
      }
      insight_guidance: {
        Row: {
          category: string
          cta: string
          eeat_evidence: string
          external_links: string
          h2_structure: string
          image_seo: string
          internal_links: string
          recommended_content: string
          refresh_cadence: string
          schema_guidance: string
          visual_assets: string
        }
        Insert: {
          category: string
          cta: string
          eeat_evidence: string
          external_links: string
          h2_structure: string
          image_seo: string
          internal_links: string
          recommended_content: string
          refresh_cadence: string
          schema_guidance: string
          visual_assets: string
        }
        Update: {
          category?: string
          cta?: string
          eeat_evidence?: string
          external_links?: string
          h2_structure?: string
          image_seo?: string
          internal_links?: string
          recommended_content?: string
          refresh_cadence?: string
          schema_guidance?: string
          visual_assets?: string
        }
        Relationships: []
      }
      insight_topics: {
        Row: {
          cannibalisation_status: string
          category: string
          cluster_id: number
          content_status: string
          created_at: string
          editorial_decision: string
          h1: string
          hero_image_direction: string
          is_pillar: boolean
          notes: string
          pillar_topic_id: number | null
          primary_keyword: string
          publication_status: string
          search_intent: string
          similarity_status: string
          suggested_meta_description: string
          suggested_slug: string
          suggested_title: string
          variation: string
          workbook_id: number
        }
        Insert: {
          cannibalisation_status?: string
          category: string
          cluster_id: number
          content_status?: string
          created_at?: string
          editorial_decision?: string
          h1: string
          hero_image_direction: string
          is_pillar?: boolean
          notes?: string
          pillar_topic_id?: number | null
          primary_keyword: string
          publication_status?: string
          search_intent: string
          similarity_status?: string
          suggested_meta_description: string
          suggested_slug: string
          suggested_title: string
          variation?: string
          workbook_id: number
        }
        Update: {
          cannibalisation_status?: string
          category?: string
          cluster_id?: number
          content_status?: string
          created_at?: string
          editorial_decision?: string
          h1?: string
          hero_image_direction?: string
          is_pillar?: boolean
          notes?: string
          pillar_topic_id?: number | null
          primary_keyword?: string
          publication_status?: string
          search_intent?: string
          similarity_status?: string
          suggested_meta_description?: string
          suggested_slug?: string
          suggested_title?: string
          variation?: string
          workbook_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "insight_topics_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "insight_clusters"
            referencedColumns: ["id"]
          },
        ]
      }
      project_enquiries: {
        Row: {
          additional_info: string | null
          attachment_path: string | null
          best_time_to_contact: string | null
          budget_range: string | null
          city: string | null
          company: string | null
          consent: boolean
          consent_at: string | null
          created_at: string
          dedupe_key: string | null
          deliverables: string | null
          details: string
          email: string
          engagement_type: string | null
          existing_assets: string | null
          id: string
          industry: string | null
          landing_page: string | null
          main_challenge: string | null
          name: string
          phone: string | null
          preferred_contact_method: string | null
          preferred_start_date: string | null
          project_goals: string | null
          project_type: string | null
          reference_links: string | null
          referral_source: string | null
          referrer: string | null
          services: string[]
          social_link: string | null
          source_page: string | null
          submission_status: string
          target_audience: string | null
          timeline: string | null
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          website: string | null
        }
        Insert: {
          additional_info?: string | null
          attachment_path?: string | null
          best_time_to_contact?: string | null
          budget_range?: string | null
          city?: string | null
          company?: string | null
          consent?: boolean
          consent_at?: string | null
          created_at?: string
          dedupe_key?: string | null
          deliverables?: string | null
          details: string
          email: string
          engagement_type?: string | null
          existing_assets?: string | null
          id?: string
          industry?: string | null
          landing_page?: string | null
          main_challenge?: string | null
          name: string
          phone?: string | null
          preferred_contact_method?: string | null
          preferred_start_date?: string | null
          project_goals?: string | null
          project_type?: string | null
          reference_links?: string | null
          referral_source?: string | null
          referrer?: string | null
          services?: string[]
          social_link?: string | null
          source_page?: string | null
          submission_status?: string
          target_audience?: string | null
          timeline?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          website?: string | null
        }
        Update: {
          additional_info?: string | null
          attachment_path?: string | null
          best_time_to_contact?: string | null
          budget_range?: string | null
          city?: string | null
          company?: string | null
          consent?: boolean
          consent_at?: string | null
          created_at?: string
          dedupe_key?: string | null
          deliverables?: string | null
          details?: string
          email?: string
          engagement_type?: string | null
          existing_assets?: string | null
          id?: string
          industry?: string | null
          landing_page?: string | null
          main_challenge?: string | null
          name?: string
          phone?: string | null
          preferred_contact_method?: string | null
          preferred_start_date?: string | null
          project_goals?: string | null
          project_type?: string | null
          reference_links?: string | null
          referral_source?: string | null
          referrer?: string | null
          services?: string[]
          social_link?: string | null
          source_page?: string | null
          submission_status?: string
          target_audience?: string | null
          timeline?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
