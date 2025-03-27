import { pgTable, serial, text, timestamp, uuid, integer, jsonb, boolean, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const skillLevelEnum = pgEnum("skill_level", ["beginner", "intermediate", "advanced"]);
export const practiceTypeEnum = pgEnum("practice_type", ["scales", "repertoire", "technique", "sight_reading"]);

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  skillLevel: skillLevelEnum("skill_level").default("beginner"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Practice sessions table
export const practiceSessions = pgTable("practice_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  practiceType: practiceTypeEnum("practice_type").notNull(),
  duration: integer("duration").notNull(), // in seconds
  recordingUrl: text("recording_url"),
  scoreData: jsonb("score_data"), // VexFlow or sheet music data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Performance metrics table
export const performanceMetrics = pgTable("performance_metrics", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: uuid("session_id")
    .notNull()
    .references(() => practiceSessions.id, { onDelete: "cascade" }),
  noteAccuracy: integer("note_accuracy"), // percentage
  rhythmAccuracy: integer("rhythm_accuracy"), // percentage
  dynamicsScore: integer("dynamics_score"),
  articulationScore: integer("articulation_score"),
  pedalUsageScore: integer("pedal_usage_score"),
  overallScore: integer("overall_score"),
  aiFeedback: text("ai_feedback"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  practiceSessions: many(practiceSessions),
}));

export const practiceSessionsRelations = relations(practiceSessions, ({ one, many }) => ({
  user: one(users, {
    fields: [practiceSessions.userId],
    references: [users.id],
  }),
  performanceMetrics: many(performanceMetrics),
}));

export const performanceMetricsRelations = relations(performanceMetrics, ({ one }) => ({
  practiceSession: one(practiceSessions, {
    fields: [performanceMetrics.sessionId],
    references: [practiceSessions.id],
  }),
}));
