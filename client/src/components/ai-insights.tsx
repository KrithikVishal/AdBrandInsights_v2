import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Target, AlertTriangle, Lightbulb } from "lucide-react";

interface InsightProps {
  type: "performance" | "optimization" | "warning" | "opportunity";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  confidence: number;
}

const insights: InsightProps[] = [
  {
    type: "performance",
    title: "Strong Campaign Performance",
    description: "Your Google Ads campaign 'Summer Sale 2024' is performing 23% above industry benchmarks with exceptional ROAS.",
    impact: "high",
    confidence: 94
  },
  {
    type: "optimization",
    title: "Budget Reallocation Opportunity",
    description: "Consider shifting 15% budget from underperforming Facebook campaigns to high-converting Google Ads campaigns.",
    impact: "medium",
    confidence: 87
  },
  {
    type: "warning",
    title: "Audience Fatigue Detected",
    description: "Creative performance declining for 25-34 demographic. Recommend refreshing ad creatives within 7 days.",
    impact: "medium",
    confidence: 91
  },
  {
    type: "opportunity",
    title: "Expansion Potential",
    description: "LinkedIn campaigns show 3x higher conversion rates for B2B segments. Consider increasing investment.",
    impact: "high",
    confidence: 89
  }
];

const typeConfig = {
  performance: { icon: TrendingUp, color: "bg-green-900/20 text-green-400", borderColor: "border-green-800" },
  optimization: { icon: Target, color: "bg-blue-900/20 text-blue-400", borderColor: "border-blue-800" },
  warning: { icon: AlertTriangle, color: "bg-orange-900/20 text-orange-400", borderColor: "border-orange-800" },
  opportunity: { icon: Lightbulb, color: "bg-purple-900/20 text-purple-400", borderColor: "border-purple-800" }
};

export function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex items-center space-x-2"
          >
            <Brain className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-lg font-semibold text-white">
              AI-Powered Insights
            </CardTitle>
            <Badge variant="secondary" className="ml-auto">
              Live Analysis
            </Badge>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const config = typeConfig[insight.type];
            const Icon = config.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border ${config.borderColor} bg-gray-900/50 hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-start space-x-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-white">
                        {insight.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={config.color} variant="secondary">
                          {insight.impact} impact
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}