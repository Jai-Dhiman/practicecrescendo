import { pgTable, serial, text, timestamp, varchar, integer } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    fullName: text('full_name'),
    createdAt: timestamp('created_at').defaultNow()
});

export const sheetMusic = pgTable('sheet_music', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    title: varchar('title', { length: 255 }).notNull(),
    composer: varchar('composer', { length: 255 }),
    difficulty: varchar('difficulty', { length: 50 }),
    filePath: text('file_path').notNull(),
    uploadedAt: timestamp('uploaded_at').defaultNow()
});

export const recordings = pgTable('recordings', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    sheetMusicId: integer('sheet_music_id').references(() => sheetMusic.id),
    title: varchar('title', { length: 255 }).notNull(),
    filePath: text('file_path').notNull(),
    duration: integer('duration'),
    recordedAt: timestamp('recorded_at').defaultNow()
});

export const analyses = pgTable('analyses', {
    id: serial('id').primaryKey(),
    recordingId: integer('recording_id').references(() => recordings.id),
    feedback: text('feedback'),
    status: varchar('status', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    completedAt: timestamp('completed_at')
});