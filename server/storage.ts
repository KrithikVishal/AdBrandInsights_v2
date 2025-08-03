import { 
  type User, 
  type InsertUser, 
  type Campaign, 
  type InsertCampaign,
  type Metrics,
  type InsertMetrics,
  type Audience,
  type InsertAudience,
  type Creative,
  type InsertCreative,
  type ConversionEvent,
  type InsertConversionEvent,
  type Report,
  type InsertReport
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Campaigns
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, campaign: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: string): Promise<boolean>;

  // Metrics
  getMetrics(campaignId?: string): Promise<Metrics[]>;
  createMetrics(metrics: InsertMetrics): Promise<Metrics>;
  getMetricsByDateRange(startDate: Date, endDate: Date): Promise<Metrics[]>;

  // Audiences
  getAudiences(): Promise<Audience[]>;
  getAudience(id: string): Promise<Audience | undefined>;
  createAudience(audience: InsertAudience): Promise<Audience>;
  updateAudience(id: string, audience: Partial<InsertAudience>): Promise<Audience | undefined>;
  deleteAudience(id: string): Promise<boolean>;

  // Creatives
  getCreatives(campaignId?: string): Promise<Creative[]>;
  getCreative(id: string): Promise<Creative | undefined>;
  createCreative(creative: InsertCreative): Promise<Creative>;
  updateCreative(id: string, creative: Partial<InsertCreative>): Promise<Creative | undefined>;
  deleteCreative(id: string): Promise<boolean>;

  // Conversion Events
  getConversionEvents(campaignId?: string): Promise<ConversionEvent[]>;
  createConversionEvent(event: InsertConversionEvent): Promise<ConversionEvent>;

  // Reports
  getReports(): Promise<Report[]>;
  getReport(id: string): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
  updateReport(id: string, report: Partial<InsertReport>): Promise<Report | undefined>;
  deleteReport(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private campaigns: Map<string, Campaign>;
  private metrics: Map<string, Metrics>;
  private audiences: Map<string, Audience>;
  private creatives: Map<string, Creative>;
  private conversionEvents: Map<string, ConversionEvent>;
  private reports: Map<string, Report>;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.metrics = new Map();
    this.audiences = new Map();
    this.creatives = new Map();
    this.conversionEvents = new Map();
    this.reports = new Map();

    // Initialize with sample data for development
    this.initializeData();
  }

  private initializeData() {
    // Create sample campaigns
    const campaign1: Campaign = {
      id: randomUUID(),
      name: "Holiday Shopping Campaign",
      platform: "Google Ads",
      status: "active",
      budget: "50000.00",
      spent: "32450.00",
      startDate: new Date("2024-11-01"),
      endDate: new Date("2024-12-31"),
      objective: "conversions",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const campaign2: Campaign = {
      id: randomUUID(),
      name: "Black Friday Sale",
      platform: "Facebook",
      status: "active",
      budget: "25000.00",
      spent: "15240.00",
      startDate: new Date("2024-11-20"),
      endDate: new Date("2024-11-30"),
      objective: "traffic",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.campaigns.set(campaign1.id, campaign1);
    this.campaigns.set(campaign2.id, campaign2);

    // Create sample metrics
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const metrics1: Metrics = {
        id: randomUUID(),
        campaignId: campaign1.id,
        date,
        impressions: Math.floor(Math.random() * 10000) + 5000,
        clicks: Math.floor(Math.random() * 500) + 100,
        conversions: Math.floor(Math.random() * 50) + 10,
        spend: (Math.random() * 1000 + 500).toFixed(2),
        revenue: (Math.random() * 5000 + 2000).toFixed(2),
        ctr: (Math.random() * 5 + 1).toFixed(4),
        cpc: (Math.random() * 5 + 1).toFixed(2),
        cpa: (Math.random() * 100 + 20).toFixed(2),
        roas: (Math.random() * 3 + 2).toFixed(2),
      };

      this.metrics.set(metrics1.id, metrics1);
    }
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Campaigns
  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = {
      ...insertCampaign,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: string, updateData: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;

    const updatedCampaign: Campaign = {
      ...campaign,
      ...updateData,
      updatedAt: new Date(),
    };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  // Metrics
  async getMetrics(campaignId?: string): Promise<Metrics[]> {
    const allMetrics = Array.from(this.metrics.values());
    if (campaignId) {
      return allMetrics.filter(m => m.campaignId === campaignId);
    }
    return allMetrics;
  }

  async createMetrics(insertMetrics: InsertMetrics): Promise<Metrics> {
    const id = randomUUID();
    const metrics: Metrics = {
      ...insertMetrics,
      id,
    };
    this.metrics.set(id, metrics);
    return metrics;
  }

  async getMetricsByDateRange(startDate: Date, endDate: Date): Promise<Metrics[]> {
    return Array.from(this.metrics.values()).filter(m => 
      m.date >= startDate && m.date <= endDate
    );
  }

  // Audiences
  async getAudiences(): Promise<Audience[]> {
    return Array.from(this.audiences.values());
  }

  async getAudience(id: string): Promise<Audience | undefined> {
    return this.audiences.get(id);
  }

  async createAudience(insertAudience: InsertAudience): Promise<Audience> {
    const id = randomUUID();
    const audience: Audience = {
      ...insertAudience,
      id,
      createdAt: new Date(),
    };
    this.audiences.set(id, audience);
    return audience;
  }

  async updateAudience(id: string, updateData: Partial<InsertAudience>): Promise<Audience | undefined> {
    const audience = this.audiences.get(id);
    if (!audience) return undefined;

    const updatedAudience: Audience = {
      ...audience,
      ...updateData,
    };
    this.audiences.set(id, updatedAudience);
    return updatedAudience;
  }

  async deleteAudience(id: string): Promise<boolean> {
    return this.audiences.delete(id);
  }

  // Creatives
  async getCreatives(campaignId?: string): Promise<Creative[]> {
    const allCreatives = Array.from(this.creatives.values());
    if (campaignId) {
      return allCreatives.filter(c => c.campaignId === campaignId);
    }
    return allCreatives;
  }

  async getCreative(id: string): Promise<Creative | undefined> {
    return this.creatives.get(id);
  }

  async createCreative(insertCreative: InsertCreative): Promise<Creative> {
    const id = randomUUID();
    const creative: Creative = {
      ...insertCreative,
      id,
      createdAt: new Date(),
    };
    this.creatives.set(id, creative);
    return creative;
  }

  async updateCreative(id: string, updateData: Partial<InsertCreative>): Promise<Creative | undefined> {
    const creative = this.creatives.get(id);
    if (!creative) return undefined;

    const updatedCreative: Creative = {
      ...creative,
      ...updateData,
    };
    this.creatives.set(id, updatedCreative);
    return updatedCreative;
  }

  async deleteCreative(id: string): Promise<boolean> {
    return this.creatives.delete(id);
  }

  // Conversion Events
  async getConversionEvents(campaignId?: string): Promise<ConversionEvent[]> {
    const allEvents = Array.from(this.conversionEvents.values());
    if (campaignId) {
      return allEvents.filter(e => e.campaignId === campaignId);
    }
    return allEvents;
  }

  async createConversionEvent(insertEvent: InsertConversionEvent): Promise<ConversionEvent> {
    const id = randomUUID();
    const event: ConversionEvent = {
      ...insertEvent,
      id,
      timestamp: new Date(),
    };
    this.conversionEvents.set(id, event);
    return event;
  }

  // Reports
  async getReports(): Promise<Report[]> {
    return Array.from(this.reports.values());
  }

  async getReport(id: string): Promise<Report | undefined> {
    return this.reports.get(id);
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = randomUUID();
    const report: Report = {
      ...insertReport,
      id,
      createdAt: new Date(),
      lastRun: null,
      nextRun: null,
    };
    this.reports.set(id, report);
    return report;
  }

  async updateReport(id: string, updateData: Partial<InsertReport>): Promise<Report | undefined> {
    const report = this.reports.get(id);
    if (!report) return undefined;

    const updatedReport: Report = {
      ...report,
      ...updateData,
    };
    this.reports.set(id, updatedReport);
    return updatedReport;
  }

  async deleteReport(id: string): Promise<boolean> {
    return this.reports.delete(id);
  }
}

export const storage = new MemStorage();
