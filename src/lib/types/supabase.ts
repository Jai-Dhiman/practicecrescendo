export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          skill_level: "beginner" | "intermediate" | "advanced";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          skill_level?: "beginner" | "intermediate" | "advanced";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          skill_level?: "beginner" | "intermediate" | "advanced";
          created_at?: string;
          updated_at?: string;
        };
      };
      practice_sessions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          practice_type: "scales" | "repertoire" | "technique" | "sight_reading";
          duration: number;
          recording_url: string | null;
          score_data: any | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          practice_type: "scales" | "repertoire" | "technique" | "sight_reading";
          duration: number;
          recording_url?: string | null;
          score_data?: any | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          practice_type?: "scales" | "repertoire" | "technique" | "sight_reading";
          duration?: number;
          recording_url?: string | null;
          score_data?: any | null;
          created_at?: string;
        };
      };
      performance_metrics: {
        Row: {
          id: string;
          session_id: string;
          note_accuracy: number | null;
          rhythm_accuracy: number | null;
          dynamics_score: number | null;
          articulation_score: number | null;
          pedal_usage_score: number | null;
          overall_score: number | null;
          ai_feedback: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          note_accuracy?: number | null;
          rhythm_accuracy?: number | null;
          dynamics_score?: number | null;
          articulation_score?: number | null;
          pedal_usage_score?: number | null;
          overall_score?: number | null;
          ai_feedback?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          note_accuracy?: number | null;
          rhythm_accuracy?: number | null;
          dynamics_score?: number | null;
          articulation_score?: number | null;
          pedal_usage_score?: number | null;
          overall_score?: number | null;
          ai_feedback?: string | null;
          created_at?: string;
        };
      };
    };
    Enums: {
      skill_level: "beginner" | "intermediate" | "advanced";
      practice_type: "scales" | "repertoire" | "technique" | "sight_reading";
    };
  };
};
