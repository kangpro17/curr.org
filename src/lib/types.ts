export type Database = {
  public: {
    Tables: {
      resource_links: {
        Row: {
          id: string
          standard_code: string
          title: string
          url: string
          org: string | null
          category: string | null
          tags: string[] | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          standard_code: string
          title: string
          url: string
          org?: string | null
          category?: string | null
          tags?: string[] | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          standard_code?: string
          title?: string
          url?: string
          org?: string | null
          category?: string | null
          tags?: string[] | null
          is_active?: boolean
          created_at?: string
        }
      }
      banners: {
        Row: {
          id: string
          image_url: string | null
          link_url: string
          title: string | null
          subtitle: string | null
          sort_order: number
          is_active: boolean
          start_at: string | null
          end_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          image_url?: string | null
          link_url: string
          title?: string | null
          subtitle?: string | null
          sort_order?: number
          is_active?: boolean
          start_at?: string | null
          end_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          image_url?: string | null
          link_url?: string
          title?: string | null
          subtitle?: string | null
          sort_order?: number
          is_active?: boolean
          start_at?: string | null
          end_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      surveys: {
        Row: {
          id: string
          standard_code: string
          rating: number
          helpful_tags: string[] | null
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          standard_code: string
          rating: number
          helpful_tags?: string[] | null
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          standard_code?: string
          rating?: number
          helpful_tags?: string[] | null
          comment?: string | null
          created_at?: string
        }
      }
      notices: {
        Row: {
          id: string
          title: string
          content: string
          is_active: boolean
          is_pinned: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          is_active?: boolean
          is_pinned?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          is_active?: boolean
          is_pinned?: boolean
          created_at?: string
        }
      }
      faq: {
        Row: {
          id: string
          question: string
          answer: string
          category: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          category: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          category?: string
        }
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

export interface Standard {
  id: string;
  code: string;
  subject: string;
  grade_level: string;
  content: string;
  category: string;
}
