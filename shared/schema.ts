import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  platform: text("platform").notNull(), // Google Ads, Facebook, LinkedIn, etc.
  status: text("status").notNull().default("draft"), // active, paused, draft, completed
  budget: decimal("budget", { precision: 10, scale: 2 }),
  spent: decimal("spent", { precision: 10, scale: 2 }).default("0"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  objective: text("objective"), // brand_awareness, traffic, conversions, etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const metrics = pgTable("metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").references(() => campaigns.id),
  date: timestamp("date").notNull(),
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  spend: decimal("spend", { precision: 10, scale: 2 }).default("0"),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default("0"),
  ctr: decimal("ctr", { precision: 5, scale: 4 }).default("0"), // click-through rate
  cpc: decimal("cpc", { precision: 10, scale: 2 }).default("0"), // cost per click
  cpa: decimal("cpa", { precision: 10, scale: 2 }).default("0"), // cost per acquisition
  roas: decimal("roas", { precision: 10, scale: 2 }).default("0"), // return on ad spend
});

export const audiences = pgTable("audiences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  size: integer("size").default(0),
  demographics: jsonb("demographics"), // age, gender, location, etc.
  interests: text("interests").array(),
  behaviors: text("behaviors").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const creatives = pgTable("creatives", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").references(() => campaigns.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // image, video, carousel, text
  format: text("format"), // square, landscape, story, etc.
  imageUrl: text("image_url"),
  headline: text("headline"),
  description: text("description"),
  cta: text("cta"), // call-to-action
  status: text("status").default("active"),
  impressions: integer("impressions").default(0),
  clicks: integer("clicks").default(0),
  conversions: integer("conversions").default(0),
  ctr: decimal("ctr", { precision: 5, scale: 4 }).default("0"),
  cvr: decimal("cvr", { precision: 5, scale: 4 }).default("0"), // conversion rate
  createdAt: timestamp("created_at").defaultNow(),
});

export const conversionEvents = pgTable("conversion_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").references(() => campaigns.id),
  eventType: text("event_type").notNull(), // page_view, add_to_cart, purchase, etc.
  eventValue: decimal("event_value", { precision: 10, scale: 2 }),
  userId: text("user_id"),
  sessionId: text("session_id"),
  timestamp: timestamp("timestamp").defaultNow(),
  attributes: jsonb("attributes"), // additional event data
});

export const reports = pgTable("reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // campaign, audience, creative, conversion
  schedule: text("schedule"), // daily, weekly, monthly
  recipients: text("recipients").array(),
  parameters: jsonb("parameters"), // date range, metrics, grouping, etc.
  lastRun: timestamp("last_run"),
  nextRun: timestamp("next_run"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMetricsSchema = createInsertSchema(metrics).omit({
  id: true,
});

export const insertAudienceSchema = createInsertSchema(audiences).omit({
  id: true,
  createdAt: true,
});

export const insertCreativeSchema = createInsertSchema(creatives).omit({
  id: true,
  createdAt: true,
});

export const insertConversionEventSchema = createInsertSchema(conversionEvents).omit({
  id: true,
  timestamp: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  createdAt: true,
  lastRun: true,
  nextRun: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;

export type InsertMetrics = z.infer<typeof insertMetricsSchema>;
export type Metrics = typeof metrics.$inferSelect;

export type InsertAudience = z.infer<typeof insertAudienceSchema>;
export type Audience = typeof audiences.$inferSelect;

export type InsertCreative = z.infer<typeof insertCreativeSchema>;
export type Creative = typeof creatives.$inferSelect;

export type InsertConversionEvent = z.infer<typeof insertConversionEventSchema>;
export type ConversionEvent = typeof conversionEvents.$inferSelect;

export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;
