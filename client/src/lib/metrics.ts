import { Metrics } from "@shared/schema";

export interface OverviewMetrics {
  totalRevenue: string;
  totalSpend: string;
  totalConversions: number;
  roas: string;
  activeCampaigns: number;
}

export interface AudienceMetrics {
  total: string;
  avgAge: string;
  topGender: string;
  engagement: string;
}

export interface CreativeMetrics {
  topPerformer: string;
  avgCTR: string;
  activeTests: string;
}

export interface ConversionMetrics {
  total: string;
  rate: string;
  aov: string;
  cost: string;
}

export function calculateMetrics(metrics: Metrics[]): {
  totalRevenue: number;
  totalSpend: number;
  totalConversions: number;
  totalImpressions: number;
  totalClicks: number;
  averageCTR: number;
  averageROAS: number;
} {
  const totals = metrics.reduce(
    (acc, metric) => ({
      revenue: acc.revenue + parseFloat(metric.revenue || "0"),
      spend: acc.spend + parseFloat(metric.spend || "0"),
      conversions: acc.conversions + (metric.conversions || 0),
      impressions: acc.impressions + (metric.impressions || 0),
      clicks: acc.clicks + (metric.clicks || 0),
    }),
    { revenue: 0, spend: 0, conversions: 0, impressions: 0, clicks: 0 }
  );

  const averageCTR = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
  const averageROAS = totals.spend > 0 ? totals.revenue / totals.spend : 0;

  return {
    totalRevenue: totals.revenue,
    totalSpend: totals.spend,
    totalConversions: totals.conversions,
    totalImpressions: totals.impressions,
    totalClicks: totals.clicks,
    averageCTR,
    averageROAS,
  };
}

export function formatCurrency(amount: number | string, currency = "USD"): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(numAmount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`;
}
