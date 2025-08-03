import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet,
  MapPin,
  TrendingUp,
  Filter,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { faker } from "@faker-js/faker";

// Generate audience data
const generateAudienceData = () => ({
  totalAudience: faker.number.int({ min: 500000, max: 2000000 }),
  newUsers: faker.number.int({ min: 5000, max: 25000 }),
  returning: faker.number.int({ min: 15000, max: 45000 }),
  engagementRate: faker.number.float({ min: 2.5, max: 8.5, fractionDigits: 1 })
});

// Age distribution data
const ageDistributionData = [
  { age: "18-24", count: faker.number.int({ min: 15000, max: 35000 }), percentage: 25 },
  { age: "25-34", count: faker.number.int({ min: 25000, max: 45000 }), percentage: 35 },
  { age: "35-44", count: faker.number.int({ min: 20000, max: 35000 }), percentage: 28 },
  { age: "45-54", count: faker.number.int({ min: 8000, max: 18000 }), percentage: 8 },
  { age: "55+", count: faker.number.int({ min: 3000, max: 8000 }), percentage: 4 }
];

// Geographic distribution data
const geographicData = [
  { country: "United States", users: faker.number.int({ min: 150000, max: 300000 }), percentage: 45 },
  { country: "United Kingdom", users: faker.number.int({ min: 80000, max: 150000 }), percentage: 18 },
  { country: "Canada", users: faker.number.int({ min: 60000, max: 120000 }), percentage: 12 },
  { country: "Australia", users: faker.number.int({ min: 40000, max: 80000 }), percentage: 10 },
  { country: "Germany", users: faker.number.int({ min: 30000, max: 60000 }), percentage: 8 },
  { country: "France", users: faker.number.int({ min: 20000, max: 40000 }), percentage: 5 },
  { country: "Others", users: faker.number.int({ min: 10000, max: 30000 }), percentage: 2 }
];

// Device distribution data
const deviceData = [
  { device: "Mobile", count: faker.number.int({ min: 300000, max: 500000 }), percentage: 65 },
  { device: "Desktop", count: faker.number.int({ min: 150000, max: 250000 }), percentage: 25 },
  { device: "Tablet", count: faker.number.int({ min: 50000, max: 100000 }), percentage: 10 }
];

// Gender distribution data
const genderData = [
  { gender: "Female", count: faker.number.int({ min: 280000, max: 400000 }), percentage: 55 },
  { gender: "Male", count: faker.number.int({ min: 200000, max: 320000 }), percentage: 42 },
  { gender: "Other", count: faker.number.int({ min: 10000, max: 30000 }), percentage: 3 }
];

// Audience growth data
const audienceGrowthData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  users: faker.number.int({ min: 15000, max: 25000 }),
  newUsers: faker.number.int({ min: 800, max: 1500 }),
  returning: faker.number.int({ min: 12000, max: 20000 })
}));

const COLORS = {
  age: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
  device: ['#06B6D4', '#84CC16', '#F97316'],
  gender: ['#EC4899', '#3B82F6', '#6B7280'],
  geography: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16']
};

// AI Persona Suggestions
const personaSuggestions = [
  {
    name: "Tech-Savvy Millennials",
    description: "25-34 year olds who are early technology adopters, primarily mobile users from urban areas",
    traits: ["Mobile-first", "Social media active", "Brand conscious", "Price sensitive"],
    size: "35% of audience"
  },
  {
    name: "Professional Gen X",
    description: "35-44 year olds with high purchasing power, balanced device usage",
    traits: ["Quality focused", "Brand loyal", "Desktop users", "High income"],
    size: "28% of audience"
  },
  {
    name: "Digital Natives",
    description: "18-24 year olds who live on social platforms, highly engaged mobile users",
    traits: ["Trend followers", "Video content", "Impulse buyers", "Social proof driven"],
    size: "25% of audience"
  }
];

// Custom 3D Pie Chart Component
function Enhanced3DPieChart({ data, colors, title }: { data: any[], colors: string[], title: string }) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={40}
            paddingAngle={2}
            dataKey="percentage"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any, name: any, props: any) => [
              `${value}% (${props.payload.count?.toLocaleString() || props.payload.users?.toLocaleString()})`,
              props.payload.age || props.payload.device || props.payload.gender || props.payload.country
            ]}
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: 'none',
              borderRadius: '8px',
              color: 'white'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      
      {/* 3D Effect Shadow */}
      <div className="absolute inset-0 -z-10 transform translate-x-1 translate-y-1 opacity-20">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={40}
              paddingAngle={2}
              dataKey="percentage"
            >
              {data.map((entry, index) => (
                <Cell key={`shadow-${index}`} fill="#000000" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Audience() {
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const { data: audienceData, isLoading } = useQuery({
    queryKey: ["/api/audience"],
    queryFn: () => Promise.resolve(generateAudienceData())
  });

  if (isLoading) {
    return (
      <motion.div 
        className="p-6 space-y-6 bg-transparent min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <LoadingSkeleton variant="text" className="h-8 w-48" />
          <LoadingSkeleton variant="text" className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} variant="card" className="h-32" />
          ))}
        </div>
        <LoadingSkeleton variant="chart" />
      </motion.div>
    );
  }

  const metrics = [
    {
      title: "Total Audience",
      value: audienceData?.totalAudience.toLocaleString() || "0",
      change: "+12.5% this month",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "New Users",
      value: audienceData?.newUsers.toLocaleString() || "0",
      change: "+8.3% this week",
      changeType: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Returning Users",
      value: audienceData?.returning.toLocaleString() || "0",
      change: "+15.2% this week",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Engagement Rate",
      value: `${audienceData?.engagementRate}%`,
      change: "+0.8% this week",
      changeType: "positive" as const,
      icon: TrendingUp
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
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Audience Intelligence
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Deep insights into your audience demographics and behavior patterns
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </motion.div>
      </motion.div>

      {/* Metrics */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {metrics.map((metric, index) => (
          <MetricCard key={metric.title} {...metric} index={index} />
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-[180px]">
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSegment} onValueChange={setSelectedSegment}>
          <SelectTrigger className="w-[180px]">
            <Users className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Segments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Segments</SelectItem>
            <SelectItem value="new">New Users</SelectItem>
            <SelectItem value="returning">Returning Users</SelectItem>
            <SelectItem value="engaged">Highly Engaged</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSource} onValueChange={setSelectedSource}>
          <SelectTrigger className="w-[180px]">
            <Globe className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="organic">Organic Search</SelectItem>
            <SelectItem value="social">Social Media</SelectItem>
            <SelectItem value="direct">Direct</SelectItem>
            <SelectItem value="paid">Paid Advertising</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Audience Growth Chart */}
      <ChartCard title="Audience Growth Trends" index={0}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={audienceGrowthData}>
            <defs>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="newUsersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="users" stroke="#3B82F6" fillOpacity={1} fill="url(#usersGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="newUsers" stroke="#10B981" fillOpacity={1} fill="url(#newUsersGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Demographics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <ChartCard title="Age Distribution" index={1}>
          <Enhanced3DPieChart data={ageDistributionData} colors={COLORS.age} title="Age Groups" />
          <div className="mt-4 space-y-2">
            {ageDistributionData.map((item, index) => (
              <div key={item.age} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS.age[index] }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.age}</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Device Distribution */}
        <ChartCard title="Device Usage" index={2}>
          <Enhanced3DPieChart data={deviceData} colors={COLORS.device} title="Device Types" />
          <div className="mt-4 space-y-2">
            {deviceData.map((item, index) => (
              <div key={item.device} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS.device[index] }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{item.device}</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Geographic Distribution */}
      <ChartCard title="Geographic Distribution" index={3}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geographicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="country" 
                  tick={{ fontSize: 12 }} 
                  stroke="#6B7280"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px' 
                  }}
                  formatter={(value: any, name: any) => [
                    `${value.toLocaleString()} users`, 
                    'Users'
                  ]}
                />
                <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {geographicData.map((item, index) => (
              <motion.div
                key={item.country}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS.geography[index] }}
                  />
                  <span className="font-medium text-gray-900 dark:text-white">{item.country}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.users.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.percentage}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ChartCard>

      {/* AI Persona Suggestions */}
      <ChartCard title="AI-Generated Audience Personas" index={4}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personaSuggestions.map((persona, index) => (
            <motion.div
              key={persona.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{persona.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{persona.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {persona.traits.map((trait) => (
                  <Badge key={trait} variant="secondary" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {persona.size}
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}