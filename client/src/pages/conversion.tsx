import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  Users,
  Calendar,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  FunnelChart,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { faker } from "@faker-js/faker";

// Conversion funnel data
const funnelData = [
  { name: 'Impressions', value: 1000000, percentage: 100 },
  { name: 'Clicks', value: 45000, percentage: 4.5 },
  { name: 'Visits', value: 38000, percentage: 3.8 },
  { name: 'Add to Cart', value: 8500, percentage: 0.85 },
  { name: 'Purchases', value: 2800, percentage: 0.28 }
];

// Conversion trends data
const conversionTrendsData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  conversions: faker.number.int({ min: 150, max: 400 }),
  conversionRate: faker.number.float({ min: 2.1, max: 4.8, fractionDigits: 2 }),
  revenue: faker.number.int({ min: 15000, max: 45000 }),
  cost: faker.number.int({ min: 8000, max: 20000 })
}));

// Channel performance data
const channelData = [
  { 
    channel: 'Google Ads', 
    conversions: faker.number.int({ min: 800, max: 1500 }),
    rate: faker.number.float({ min: 3.2, max: 5.8, fractionDigits: 2 }),
    cost: faker.number.int({ min: 15000, max: 25000 }),
    revenue: faker.number.int({ min: 45000, max: 85000 }),
    color: '#EA4335'
  },
  { 
    channel: 'Facebook Ads', 
    conversions: faker.number.int({ min: 600, max: 1200 }),
    rate: faker.number.float({ min: 2.8, max: 4.9, fractionDigits: 2 }),
    cost: faker.number.int({ min: 12000, max: 22000 }),
    revenue: faker.number.int({ min: 35000, max: 65000 }),
    color: '#1877F2'
  },
  { 
    channel: 'LinkedIn Ads', 
    conversions: faker.number.int({ min: 200, max: 600 }),
    rate: faker.number.float({ min: 4.1, max: 7.2, fractionDigits: 2 }),
    cost: faker.number.int({ min: 8000, max: 15000 }),
    revenue: faker.number.int({ min: 25000, max: 45000 }),
    color: '#0A66C2'
  },
  { 
    channel: 'Email Marketing', 
    conversions: faker.number.int({ min: 300, max: 800 }),
    rate: faker.number.float({ min: 5.5, max: 8.9, fractionDigits: 2 }),
    cost: faker.number.int({ min: 2000, max: 5000 }),
    revenue: faker.number.int({ min: 18000, max: 35000 }),
    color: '#10B981'
  }
];

// Goal tracking data
const goalData = [
  { 
    goal: 'Monthly Revenue Target',
    current: 285000,
    target: 350000,
    percentage: 81.4,
    trend: 'up',
    change: '+12.5%'
  },
  { 
    goal: 'Conversion Rate Goal',
    current: 3.8,
    target: 4.5,
    percentage: 84.4,
    trend: 'up',
    change: '+0.6%'
  },
  { 
    goal: 'Cost per Acquisition',
    current: 45,
    target: 40,
    percentage: 88.9,
    trend: 'down',
    change: '-$3'
  },
  { 
    goal: 'Return on Ad Spend',
    current: 4.2,
    target: 5.0,
    percentage: 84.0,
    trend: 'up',
    change: '+0.3'
  }
];

// Attribution model data
const attributionData = [
  { model: 'First Touch', conversions: 1200, percentage: 30 },
  { model: 'Last Touch', conversions: 1600, percentage: 40 },
  { model: 'Linear', conversions: 800, percentage: 20 },
  { model: 'Time Decay', conversions: 400, percentage: 10 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

function GoalCard({ goal, index }: { goal: any, index: number }) {
  const TrendIcon = goal.trend === 'up' ? ArrowUpRight : ArrowDownRight;
  const trendColor = goal.trend === 'up' ? 'text-green-600' : 'text-red-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {goal.goal}
            </CardTitle>
            <div className={`flex items-center ${trendColor}`}>
              <TrendIcon className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{goal.change}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {typeof goal.current === 'number' && goal.current > 1000 
                  ? goal.current.toLocaleString() 
                  : goal.current}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                / {typeof goal.target === 'number' && goal.target > 1000 
                  ? goal.target.toLocaleString() 
                  : goal.target}
              </span>
            </div>
            <Progress value={goal.percentage} className="h-2" />
            <div className="text-right">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {goal.percentage}% Complete
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ChannelCard({ channel, index }: { channel: any, index: number }) {
  const roi = ((channel.revenue - channel.cost) / channel.cost * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: channel.color }}
            />
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {channel.channel}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Conversions</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {channel.conversions.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Conv. Rate</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {channel.rate}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Revenue</div>
              <div className="text-xl font-bold text-green-600">
                ${channel.revenue.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ROI</div>
              <div className="text-xl font-bold text-blue-600">
                {roi}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Conversion() {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedChannel, setSelectedChannel] = useState("all");

  const metrics = [
    {
      title: "Total Conversions",
      value: "12,847",
      change: "+18.2% this month",
      changeType: "positive" as const,
      icon: Target
    },
    {
      title: "Conversion Rate",
      value: "3.84%",
      change: "+0.6% this month",
      changeType: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Revenue Generated",
      value: "$285,420",
      change: "+22.1% this month",
      changeType: "positive" as const,
      icon: DollarSign
    },
    {
      title: "Cost per Conversion",
      value: "$45.20",
      change: "-8.3% this month",
      changeType: "positive" as const,
      icon: ShoppingCart
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
            Conversion Tracking
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor conversion performance and optimize your funnel effectiveness
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
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Channels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            <SelectItem value="google">Google Ads</SelectItem>
            <SelectItem value="facebook">Facebook Ads</SelectItem>
            <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
            <SelectItem value="email">Email Marketing</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Conversion Trends */}
      <ChartCard title="Conversion Trends" index={0}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={conversionTrendsData}>
            <defs>
              <linearGradient id="conversionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="conversions" stroke="#3B82F6" fillOpacity={1} fill="url(#conversionsGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="revenue" stroke="#10B981" fillOpacity={1} fill="url(#revenueGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Conversion Funnel and Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Conversion Funnel" index={1}>
          <div className="space-y-4">
            {funnelData.map((step, index) => (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="w-24 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {step.name}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {step.value.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {step.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${step.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Attribution Models" index={2}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={attributionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
                dataKey="conversions"
              >
                {attributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => [`${value} conversions`, 'Conversions']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {attributionData.map((item, index) => (
              <div key={item.model} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">{item.model}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Goals Tracking */}
      <ChartCard title="Goal Tracking" index={3}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goalData.map((goal, index) => (
            <GoalCard key={goal.goal} goal={goal} index={index} />
          ))}
        </div>
      </ChartCard>

      {/* Channel Performance */}
      <ChartCard title="Channel Performance" index={4}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channelData.map((channel, index) => (
            <ChannelCard key={channel.channel} channel={channel} index={index} />
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}