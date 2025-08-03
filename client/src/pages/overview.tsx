import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { DollarSign, Users, Target, TrendingUp, Eye, MousePointer } from "lucide-react";
import { motion } from "framer-motion";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { AIInsights } from "@/components/ai-insights";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

interface OverviewData {
  totalRevenue: string;
  totalSpend: string;
  totalConversions: number;
  roas: string;
  activeCampaigns: number;
  impressions: number;
  clicks: number;
  ctr: string;
}

// Generate realistic chart data with faker
const generatePerformanceData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    revenue: faker.number.int({ min: 2000, max: 8000 }),
    spend: faker.number.int({ min: 800, max: 3000 }),
    conversions: faker.number.int({ min: 15, max: 75 })
  }));
};

const generatePlatformData = () => [
  { name: 'Google Ads', value: faker.number.int({ min: 35, max: 45 }), color: '#4285F4' },
  { name: 'Facebook', value: faker.number.int({ min: 25, max: 35 }), color: '#1877F2' },
  { name: 'LinkedIn', value: faker.number.int({ min: 10, max: 20 }), color: '#0A66C2' },
  { name: 'Twitter', value: faker.number.int({ min: 5, max: 15 }), color: '#1DA1F2' },
  { name: 'TikTok', value: faker.number.int({ min: 3, max: 10 }), color: '#FE2C55' }
];

const generateCampaignData = () => [
  { name: 'Summer Sale 2024', spend: faker.number.int({ min: 5000, max: 15000 }), revenue: faker.number.int({ min: 15000, max: 45000 }) },
  { name: 'Brand Awareness Q4', spend: faker.number.int({ min: 8000, max: 18000 }), revenue: faker.number.int({ min: 12000, max: 35000 }) },
  { name: 'Holiday Campaign', spend: faker.number.int({ min: 6000, max: 14000 }), revenue: faker.number.int({ min: 18000, max: 42000 }) },
  { name: 'Product Launch', spend: faker.number.int({ min: 4000, max: 12000 }), revenue: faker.number.int({ min: 16000, max: 38000 }) },
  { name: 'Retargeting Campaign', spend: faker.number.int({ min: 3000, max: 8000 }), revenue: faker.number.int({ min: 9000, max: 24000 }) }
];

export default function Overview() {
  const [realtimeData, setRealtimeData] = useState({
    impressions: 0,
    clicks: 0,
    conversions: 0
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        impressions: prev.impressions + faker.number.int({ min: 10, max: 100 }),
        clicks: prev.clicks + faker.number.int({ min: 1, max: 15 }),
        conversions: prev.conversions + faker.number.int({ min: 0, max: 3 })
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const { data: overview, isLoading } = useQuery<OverviewData>({
    queryKey: ["/api/overview"],
    select: (data: any) => ({
      ...data,
      impressions: 1250000 + realtimeData.impressions,
      clicks: 45000 + realtimeData.clicks,
      ctr: ((45000 + realtimeData.clicks) / (1250000 + realtimeData.impressions) * 100).toFixed(2) + '%'
    })
  });

  const performanceData = generatePerformanceData();
  const platformData = generatePlatformData();
  const campaignData = generateCampaignData();

  if (isLoading) {
    return (
      <motion.div 
        className="p-6 space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} variant="card" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingSkeleton variant="chart" />
          <LoadingSkeleton variant="chart" />
        </div>
      </motion.div>
    );
  }

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${overview?.totalRevenue}`,
      change: "+12.5% from last month",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Total Impressions",
      value: overview?.impressions.toLocaleString() || "0",
      change: `+${realtimeData.impressions} today`,
      changeType: "positive" as const,
      icon: Eye
    },
    {
      title: "Total Clicks",
      value: overview?.clicks.toLocaleString() || "0",
      change: `+${realtimeData.clicks} today`,
      changeType: "positive" as const,
      icon: MousePointer
    },
    {
      title: "Total Conversions",
      value: ((overview?.totalConversions || 0) + realtimeData.conversions).toLocaleString(),
      change: `+${realtimeData.conversions} today`,
      changeType: "positive" as const,
      icon: Target
    }
  ];

  return (
    <motion.div 
      className="p-6 space-y-8 bg-transparent min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Real-time analytics and AI-powered insights for your advertising campaigns
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={metric.icon}
            index={index}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Performance Trends" index={0}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="spend" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Platform Distribution" index={1}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {platformData.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {platform.name}: {platform.value}%
                </span>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Campaign Performance and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Top Campaigns ROI" index={2}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                stroke="#6B7280"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="spend" fill="#F59E0B" name="Spend" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#10B981" name="Revenue" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <AIInsights />
      </div>
    </motion.div>
  );
}