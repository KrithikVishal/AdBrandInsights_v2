import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCampaignSchema, 
  insertAudienceSchema, 
  insertCreativeSchema, 
  insertConversionEventSchema,
  insertReportSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Campaigns
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.getCampaign(req.params.id);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaign" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const validatedData = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign(validatedData);
      res.status(201).json(campaign);
    } catch (error) {
      res.status(400).json({ message: "Invalid campaign data" });
    }
  });

  app.put("/api/campaigns/:id", async (req, res) => {
    try {
      const validatedData = insertCampaignSchema.partial().parse(req.body);
      const campaign = await storage.updateCampaign(req.params.id, validatedData);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(400).json({ message: "Invalid campaign data" });
    }
  });

  app.delete("/api/campaigns/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteCampaign(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete campaign" });
    }
  });

  // Metrics
  app.get("/api/metrics", async (req, res) => {
    try {
      const { campaignId, startDate, endDate } = req.query;
      
      let metrics;
      if (startDate && endDate) {
        metrics = await storage.getMetricsByDateRange(
          new Date(startDate as string),
          new Date(endDate as string)
        );
      } else {
        metrics = await storage.getMetrics(campaignId as string);
      }
      
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  // Dashboard overview data
  app.get("/api/overview", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      const metrics = await storage.getMetrics();
      
      // Calculate aggregated metrics
      const totalRevenue = metrics.reduce((sum, m) => sum + parseFloat(m.revenue || "0"), 0);
      const totalSpend = metrics.reduce((sum, m) => sum + parseFloat(m.spend || "0"), 0);
      const totalConversions = metrics.reduce((sum, m) => sum + (m.conversions || 0), 0);
      const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

      const overview = {
        totalRevenue: totalRevenue.toFixed(2),
        totalSpend: totalSpend.toFixed(2),
        totalConversions,
        roas: roas.toFixed(1),
        activeCampaigns: campaigns.filter(c => c.status === "active").length,
        campaigns: campaigns.slice(0, 5), // Top 5 campaigns for table
      };

      res.json(overview);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch overview data" });
    }
  });

  // Audiences
  app.get("/api/audiences", async (req, res) => {
    try {
      const audiences = await storage.getAudiences();
      res.json(audiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch audiences" });
    }
  });

  app.post("/api/audiences", async (req, res) => {
    try {
      const validatedData = insertAudienceSchema.parse(req.body);
      const audience = await storage.createAudience(validatedData);
      res.status(201).json(audience);
    } catch (error) {
      res.status(400).json({ message: "Invalid audience data" });
    }
  });

  // Creatives
  app.get("/api/creatives", async (req, res) => {
    try {
      const { campaignId } = req.query;
      const creatives = await storage.getCreatives(campaignId as string);
      res.json(creatives);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creatives" });
    }
  });

  app.post("/api/creatives", async (req, res) => {
    try {
      const validatedData = insertCreativeSchema.parse(req.body);
      const creative = await storage.createCreative(validatedData);
      res.status(201).json(creative);
    } catch (error) {
      res.status(400).json({ message: "Invalid creative data" });
    }
  });

  // Conversion Events
  app.get("/api/conversions", async (req, res) => {
    try {
      const { campaignId } = req.query;
      const events = await storage.getConversionEvents(campaignId as string);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversion events" });
    }
  });

  app.post("/api/conversions", async (req, res) => {
    try {
      const validatedData = insertConversionEventSchema.parse(req.body);
      const event = await storage.createConversionEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid conversion event data" });
    }
  });

  // Reports
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  app.post("/api/reports", async (req, res) => {
    try {
      const validatedData = insertReportSchema.parse(req.body);
      const report = await storage.createReport(validatedData);
      res.status(201).json(report);
    } catch (error) {
      res.status(400).json({ message: "Invalid report data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
