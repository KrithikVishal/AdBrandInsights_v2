import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Share2,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Progress } from "@/components/ui/progress";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { useToastManager } from "@/components/toast-notifications";
import { faker } from "@faker-js/faker";

// AI Summary feed data
const aiSummaries = [
  {
    id: 1,
    title: "Campaign Performance Insights",
    content: "Your Google Ads campaigns are outperforming Facebook by 23% in conversion rate. Consider reallocating 15% of Facebook budget to Google Ads for optimal ROI.",
    type: "optimization",
    timestamp: "2 hours ago",
    confidence: 92
  },
  {
    id: 2,
    title: "Audience Behavior Analysis",
    content: "Mobile users show 35% higher engagement during 6-9 PM. Adjusting ad scheduling to target these peak hours could increase conversions by an estimated 18%.",
    type: "insight",
    timestamp: "4 hours ago",
    confidence: 87
  },
  {
    id: 3,
    title: "Creative Performance Alert",
    content: "Video creatives are showing fatigue after 7 days. Rotating creative assets weekly could prevent a 12% decline in CTR typically seen in week 2.",
    type: "alert",
    timestamp: "6 hours ago",
    confidence: 94
  },
  {
    id: 4,
    title: "Seasonal Trend Prediction",
    content: "Based on historical data, expect a 28% increase in conversion rate next week due to seasonal trends. Consider increasing daily budget by 20%.",
    type: "prediction",
    timestamp: "1 day ago",
    confidence: 89
  }
];

// Report templates
const reportTemplates = [
  {
    name: "Executive Summary",
    description: "High-level overview for stakeholders",
    charts: ["overview", "revenue", "conversions"],
    estimated_time: "2 minutes"
  },
  {
    name: "Campaign Performance",
    description: "Detailed campaign metrics and ROI analysis",
    charts: ["campaigns", "roi", "spending"],
    estimated_time: "3 minutes"
  },
  {
    name: "Audience Analysis",
    description: "Demographics and behavior insights",
    charts: ["demographics", "geography", "devices"],
    estimated_time: "4 minutes"
  },
  {
    name: "Creative Insights",
    description: "Asset performance and optimization suggestions",
    charts: ["creative_performance", "engagement", "formats"],
    estimated_time: "3 minutes"
  },
  {
    name: "Full Analytics Report",
    description: "Comprehensive analysis across all metrics",
    charts: ["all"],
    estimated_time: "8 minutes"
  }
];

// Chart selection options
const chartOptions = [
  { id: "overview", name: "Overview Metrics", icon: BarChart3 },
  { id: "revenue", name: "Revenue Distribution", icon: PieChartIcon },
  { id: "conversions", name: "Conversion Trends", icon: TrendingUp },
  { id: "campaigns", name: "Campaign Performance", icon: FileText },
  { id: "demographics", name: "Audience Demographics", icon: PieChartIcon },
  { id: "geography", name: "Geographic Distribution", icon: BarChart3 },
  { id: "creative_performance", name: "Creative Performance", icon: TrendingUp }
];

const typeColors = {
  optimization: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  insight: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  alert: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  prediction: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
};

const typeIcons = {
  optimization: Settings,
  insight: TrendingUp,
  alert: AlertCircle,
  prediction: Clock
};

function AIInsightCard({ insight, index }: { insight: any, index: number }) {
  const Icon = typeIcons[insight.type as keyof typeof typeIcons];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                {insight.title}
              </CardTitle>
            </div>
            <Badge className={typeColors[insight.type as keyof typeof typeColors]}>
              {insight.type}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{insight.timestamp}</span>
            <span>{insight.confidence}% confidence</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {insight.content}
          </p>
          <div className="flex justify-between items-center">
            <Progress value={insight.confidence} className="flex-1 mr-4" />
            <Button size="sm" variant="outline">
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ReportTemplateCard({ template, onGenerate }: { template: any, onGenerate: (template: any) => void }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="cursor-pointer"
      onClick={() => onGenerate(template)}
    >
      <Card className="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            {template.name}
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {template.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>{template.estimated_time}</span>
            </div>
            <Badge variant="secondary">
              {template.charts.length === 1 && template.charts[0] === "all" 
                ? "All Charts" 
                : `${template.charts.length} Charts`
              }
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Reports() {
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("30d");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const { showSuccess, showInfo } = useToastManager();

  const handleChartToggle = (chartId: string) => {
    setSelectedCharts(prev => 
      prev.includes(chartId) 
        ? prev.filter(id => id !== chartId)
        : [...prev, chartId]
    );
  };

  const handleGenerateReport = async (template?: any) => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    showSuccess(
      "Report Generated",
      `${template ? template.name : 'Custom report'} has been generated successfully.`
    );
  };

  const handleExportPDF = async () => {
    showInfo("Export Started", "Your PDF report is being generated...");
    await handleGenerateReport();
  };

  const handleExportCSV = async () => {
    showInfo("Export Started", "Your CSV data is being prepared...");
    setTimeout(() => {
      showSuccess("CSV Ready", "Your data has been exported to CSV format.");
    }, 1500);
  };

  const metrics = [
    {
      title: "Generated Reports",
      value: "156",
      change: "+23 this month",
      changeType: "positive" as const,
      icon: FileText
    },
    {
      title: "Export Downloads",
      value: "89",
      change: "+12 this week",
      changeType: "positive" as const,
      icon: Download
    },
    {
      title: "Shared Reports",
      value: "34",
      change: "+8 this week",
      changeType: "positive" as const,
      icon: Share2
    },
    {
      title: "AI Insights",
      value: "247",
      change: "+45 this month",
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
            Exportable AI Summaries
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Generate comprehensive reports and AI-powered insights for your campaigns
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleExportCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleExportPDF} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </motion.div>
        </div>
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

      {/* Report Templates */}
      <ChartCard title="Quick Report Templates" index={0}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map((template, index) => (
            <ReportTemplateCard 
              key={template.name} 
              template={template} 
              onGenerate={handleGenerateReport}
            />
          ))}
        </div>
      </ChartCard>

      {/* Custom Report Builder */}
      <ChartCard title="Dynamic Report Builder" index={1}>
        <div className="space-y-6">
          {/* Configuration Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
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

            <Select value={reportFormat} onValueChange={setReportFormat}>
              <SelectTrigger>
                <FileText className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
                <SelectItem value="excel">Excel Workbook</SelectItem>
                <SelectItem value="powerpoint">PowerPoint Slides</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={() => handleGenerateReport()}
              disabled={isGenerating || selectedCharts.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {isGenerating ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>

          {/* Chart Selection */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Select Charts to Include
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chartOptions.map((chart) => {
                const Icon = chart.icon;
                const isSelected = selectedCharts.includes(chart.id);
                
                return (
                  <motion.div
                    key={chart.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => handleChartToggle(chart.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          checked={isSelected}
                          onChange={() => handleChartToggle(chart.id)}
                        />
                        <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`font-medium ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                          {chart.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Generation Progress */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Clock className="h-5 w-5 text-blue-600 animate-spin" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    Generating your custom report...
                  </span>
                </div>
                <Progress value={66} className="h-2" />
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                  Processing {selectedCharts.length} charts • Estimated time: 2-3 minutes
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ChartCard>

      {/* AI Summary Feed */}
      <ChartCard title="AI-Generated Insights" index={2}>
        <div className="space-y-4">
          {aiSummaries.map((insight, index) => (
            <AIInsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}