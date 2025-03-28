// src/lib/db/schema.ts
import { pgTable, text, integer, timestamp, uuid, json, pgEnum, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ===== ENUMS =====
export const skillLevelEnum = pgEnum("skill_level", ["beginner", "intermediate", "advanced", "expert"]);

// ===== USERS =====
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  skillLevel: skillLevelEnum("skill_level").default("beginner"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  pieces: many(pieces),
  recordings: many(recordings),
}));

// ===== PIECES (SHEET MUSIC) =====
export const pieces = pgTable("pieces", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  composer: text("composer").notNull(),
  difficulty: integer("difficulty").notNull(), // 1-10 scale
  sheetMusicUrl: text("sheet_music_url"),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const piecesRelations = relations(pieces, ({ one, many }) => ({
  user: one(users, {
    fields: [pieces.userId],
    references: [users.id],
  }),
  recordings: many(recordings),
}));

// ===== RECORDINGS =====
export const recordings = pgTable("recordings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  pieceId: uuid("piece_id")
    .references(() => pieces.id)
    .notNull(),
  title: text("title").notNull(),
  recordingUrl: text("recording_url").notNull(),
  duration: integer("duration"), // in seconds
  createdAt: timestamp("created_at").defaultNow(),
});

export const recordingsRelations = relations(recordings, ({ one, many }) => ({
  user: one(users, {
    fields: [recordings.userId],
    references: [users.id],
  }),
  piece: one(pieces, {
    fields: [recordings.pieceId],
    references: [pieces.id],
  }),
  analysis: one(analysis),
}));

// ===== ANALYSIS =====
export const analysis = pgTable("analysis", {
  id: uuid("id").primaryKey().defaultRandom(),
  recordingId: uuid("recording_id")
    .references(() => recordings.id)
    .notNull()
    .unique(),
  noteAccuracy: real("note_accuracy"),
  rhythmAccuracy: real("rhythm_accuracy"),
  overallScore: real("overall_score"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analysisRelations = relations(analysis, ({ one }) => ({
  recording: one(recordings, {
    fields: [analysis.recordingId],
    references: [recordings.id],
  }),
}));

// Export types for TypeScript
export type User = typeof users.$inferSelect;
export type Piece = typeof pieces.$inferSelect;
export type Recording = typeof recordings.$inferSelect;
export type Analysis = typeof analysis.$inferSelect;
