import { pgTable, text, serial, integer, boolean, timestamp, decimal, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  emergencyContact: text("emergency_contact"),
  emergencyPhone: text("emergency_phone"),
  medicalConditions: text("medical_conditions"),
  goals: text("goals"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  date: text("date").notNull(), // YYYY-MM-DD format
  time: text("time").notNull(), // HH:MM format
  program: text("program").notNull(), // strength, self-defense, mindset, combination
  duration: integer("duration").default(60), // minutes
  status: text("status").default("scheduled"), // scheduled, completed, cancelled
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const agreements = pgTable("agreements", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  agreementType: text("agreement_type").notNull(), // liability-waiver, training-agreement
  signatureData: text("signature_data").notNull(), // base64 encoded signature
  signedAt: timestamp("signed_at").defaultNow(),
  ipAddress: text("ip_address"),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interests: text("interests"), // JSON array of interests
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// New tables for enhanced client dashboard
export const workoutPlans = pgTable("workout_plans", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  name: text("name").notNull(),
  description: text("description"),
  exercises: json("exercises").notNull(), // Array of exercise objects
  duration: integer("duration").default(60), // minutes
  difficulty: text("difficulty").default("beginner"), // beginner, intermediate, advanced
  category: text("category").notNull(), // strength, cardio, flexibility, self-defense
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const progressTracking = pgTable("progress_tracking", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  workoutPlanId: integer("workout_plan_id").references(() => workoutPlans.id),
  metrics: json("metrics").notNull(), // Weight, reps, sets, time, etc.
  notes: text("notes"),
  rating: integer("rating"), // 1-10 difficulty/satisfaction rating
  completedAt: timestamp("completed_at").defaultNow(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),
  paymentMethod: text("payment_method"), // card, cash, bank_transfer
  status: text("status").default("pending"), // pending, completed, failed, refunded
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  description: text("description"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const clientGoals = pgTable("client_goals", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  title: text("title").notNull(),
  description: text("description"),
  targetValue: decimal("target_value", { precision: 10, scale: 2 }),
  currentValue: decimal("current_value", { precision: 10, scale: 2 }).default("0"),
  unit: text("unit"), // lbs, kg, reps, minutes, etc.
  targetDate: timestamp("target_date"),
  status: text("status").default("active"), // active, achieved, paused
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Content Management Tables
export const siteContent = pgTable("site_content", {
  id: serial("id").primaryKey(),
  contentKey: text("content_key").notNull().unique(), // hero_title, about_bio, program_strength_desc, etc.
  contentType: text("content_type").notNull(), // text, textarea, rich_text, image_url, audio_url
  contentValue: text("content_value").notNull(),
  section: text("section").notNull(), // home, about, programs, contact
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const mediaAssets = pgTable("media_assets", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  originalName: text("original_name").notNull(),
  filePath: text("file_path").notNull(),
  fileType: text("file_type").notNull(), // image, video, audio
  mimeType: text("mime_type").notNull(),
  fileSize: integer("file_size").notNull(),
  section: text("section"), // home, about, programs, gallery
  description: text("description"),
  altText: text("alt_text"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const motivationalQuotes = pgTable("motivational_quotes", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(), // strength, mindset, perseverance, discipline, self-defense, transformation
  isActive: boolean("is_active").default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});

export const insertAgreementSchema = createInsertSchema(agreements).omit({
  id: true,
  signedAt: true,
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMediaAssetSchema = createInsertSchema(mediaAssets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMotivationalQuoteSchema = createInsertSchema(motivationalQuotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type Agreement = typeof agreements.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type WorkoutPlan = typeof workoutPlans.$inferSelect;
export type ProgressTracking = typeof progressTracking.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type ClientGoal = typeof clientGoals.$inferSelect;

// Content Management Types
export type SiteContent = typeof siteContent.$inferSelect;
export type MediaAsset = typeof mediaAssets.$inferSelect;
export type MotivationalQuote = typeof motivationalQuotes.$inferSelect;

// Insert Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type InsertAgreement = z.infer<typeof insertAgreementSchema>;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type InsertMediaAsset = z.infer<typeof insertMediaAssetSchema>;
export type InsertMotivationalQuote = z.infer<typeof insertMotivationalQuoteSchema>;

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertWorkoutPlanSchema = createInsertSchema(workoutPlans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProgressTrackingSchema = createInsertSchema(progressTracking).omit({
  id: true,
  completedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  paidAt: true,
});

export const insertClientGoalSchema = createInsertSchema(clientGoals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Additional Insert Types
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type InsertWorkoutPlan = z.infer<typeof insertWorkoutPlanSchema>;
export type InsertProgressTracking = z.infer<typeof insertProgressTrackingSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type InsertClientGoal = z.infer<typeof insertClientGoalSchema>;
