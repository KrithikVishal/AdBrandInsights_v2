import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image, 
  Video, 
  Play, 
  Eye, 
  ThumbsUp, 
  Share2, 
  TrendingUp,
  Filter,
  Search,
  MoreHorizontal,
  Download,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { ExportButton } from "@/components/export-button";
import { exportCreativeData } from "@/lib/export-utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { faker } from "@faker-js/faker";

// Generate creative performance data
const generateCreativeData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    type: faker.helpers.arrayElement(['image', 'video', 'carousel']),
    platform: faker.helpers.arrayElement(['Facebook', 'Instagram', 'Google Ads', 'LinkedIn', 'TikTok']),
    impressions: faker.number.int({ min: 50000, max: 500000 }),
    clicks: faker.number.int({ min: 2000, max: 25000 }),
    conversions: faker.number.int({ min: 100, max: 1500 }),
    engagement: faker.number.float({ min: 2.5, max: 8.5, fractionDigits: 1 }),
    thumbnail: `https://picsum.photos/300/200?random=${i}`,
    status: faker.helpers.arrayElement(['active', 'paused', 'draft']),
    createdAt: faker.date.recent({ days: 30 })
  }));
};

// Performance timeline data
const performanceData = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  impressions: faker.number.int({ min: 80000, max: 150000 }),
  engagement: faker.number.float({ min: 3.5, max: 7.2, fractionDigits: 1 }),
  ctr: faker.number.float({ min: 2.1, max: 4.8, fractionDigits: 2 })
}));

// Top performing creatives by type
const creativeTypeData = [
  { type: 'Video', performance: 87, count: 145 },
  { type: 'Carousel', performance: 76, count: 89 },
  { type: 'Single Image', performance: 64, count: 234 },
  { type: 'Stories', performance: 72, count: 156 }
];

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
};

const typeIcons = {
  image: Image,
  video: Video,
  carousel: Image
};

function CreativeCard({ creative, index }: { creative: any, index: number }) {
  const Icon = typeIcons[creative.type as keyof typeof typeIcons];
  const ctr = ((creative.clicks / creative.impressions) * 100).toFixed(2);
  const conversionRate = ((creative.conversions / creative.clicks) * 100).toFixed(2);
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    // Create a download link for the creative asset
    const link = document.createElement('a');
    link.href = creative.thumbnail; // Using thumbnail as the asset URL
    link.download = `${creative.name.replace(/\s+/g, '_')}.${creative.type === 'video' ? 'mp4' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    setShowModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
        <div className="relative">
          <img 
            src={creative.thumbnail} 
            alt={creative.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className={statusColors[creative.status as keyof typeof statusColors]}>
              {creative.status.charAt(0).toUpperCase() + creative.status.slice(1)}
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/50 text-white">
              <Icon className="h-3 w-3 mr-1" />
              {creative.type}
            </Badge>
          </div>
          {creative.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <Play className="h-6 w-6 text-white ml-1" />
              </motion.div>
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                {creative.name}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">{creative.platform}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {creative.impressions.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Impressions</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {creative.clicks.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Clicks</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {ctr}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">CTR</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {creative.engagement}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Engagement</div>
            </div>
          </div>

          {/* Engagement Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Performance Score</span>
              <span className="text-gray-900 dark:text-white font-medium">{creative.engagement}%</span>
            </div>
            <Progress value={creative.engagement * 10} className="h-2" />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1" onClick={handleView}>
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button size="sm" variant="outline" className="flex-1" onClick={handleDownload}>
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>

          {/* View Modal */}
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{creative.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowModal(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  {creative.type === 'video' ? (
                    <video
                      controls
                      className="w-full h-auto rounded-lg"
                      poster={creative.thumbnail}
                    >
                      <source src={creative.thumbnail} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={creative.thumbnail}
                      alt={creative.name}
                      className="w-full h-auto rounded-lg"
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Type:</span> {creative.type}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Platform:</span> {creative.platform}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Impressions:</span> {creative.impressions.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Clicks:</span> {creative.clicks.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">CTR:</span> {ctr}%
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Engagement:</span> {creative.engagement}%
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Creative() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const creatives = generateCreativeData();

  const filteredCreatives = creatives.filter(creative => {
    const matchesSearch = creative.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || creative.type === selectedType;
    const matchesPlatform = selectedPlatform === "all" || creative.platform === selectedPlatform;
    const matchesStatus = selectedStatus === "all" || creative.status === selectedStatus;
    return matchesSearch && matchesType && matchesPlatform && matchesStatus;
  });

  const metrics = [
    {
      title: "Total Creatives",
      value: creatives.length.toString(),
      change: "+12 this week",
      changeType: "positive" as const,
      icon: Image
    },
    {
      title: "Avg. CTR",
      value: "3.24%",
      change: "+0.8% this week",
      changeType: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Total Impressions",
      value: creatives.reduce((sum, c) => sum + c.impressions, 0).toLocaleString(),
      change: "+18.5% this week",
      changeType: "positive" as const,
      icon: Eye
    },
    {
      title: "Engagement Rate",
      value: "5.8%",
      change: "+1.2% this week",
      changeType: "positive" as const,
      icon: ThumbsUp
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
            Creative Performance
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Analyze and optimize your creative assets across all campaigns
          </p>
        </div>
        <ExportButton
          onExport={async (format) => {
            await exportCreativeData([], format);
          }}
          label="Export Report"
          className="bg-blue-600 hover:bg-blue-700"
        />
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

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Creative Performance Trends" index={0}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="engagement" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
              <Line type="monotone" dataKey="ctr" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Performance by Creative Type" index={1}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={creativeTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: any, name: any) => [`${value}%`, 'Performance Score']}
              />
              <Bar dataKey="performance" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search creatives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="carousel">Carousel</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="Facebook">Facebook</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="Google Ads">Google Ads</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="TikTok">TikTok</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Creatives Grid */}
      <AnimatePresence mode="wait">
        {filteredCreatives.length > 0 ? (
          <motion.div
            key="creatives-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCreatives.map((creative, index) => (
              <CreativeCard
                key={creative.id}
                creative={creative}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-creatives"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No creatives found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No creatives match your current filters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}