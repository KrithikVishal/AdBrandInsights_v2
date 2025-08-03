import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, Play, Pause, BarChart3, TrendingUp, Target } from "lucide-react";
import type { Campaign } from "@shared/schema";

interface CampaignCardProps {
  campaign: Campaign;
  index: number;
  onEdit?: (campaign: Campaign) => void;
  onToggleStatus?: (campaign: Campaign) => void;
}

export function CampaignCard({ campaign, index, onEdit, onToggleStatus }: CampaignCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    draft: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
  };

  const platformColors = {
    "Google Ads": "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    "Facebook": "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    "LinkedIn": "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    "Twitter": "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    "TikTok": "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400"
  };

  const spentPercentage = campaign.spent && campaign.budget 
    ? Math.min((parseFloat(campaign.spent) / parseFloat(campaign.budget)) * 100, 100)
    : 0;

  const roas = campaign.spent && parseFloat(campaign.spent) > 0
    ? ((Math.random() * 3 + 1) * parseFloat(campaign.spent)).toFixed(2)
    : "0.00";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <CardHeader className="relative z-10 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
              >
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {campaign.name}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge className={statusColors[campaign.status as keyof typeof statusColors]}>
                    {campaign.status}
                  </Badge>
                  <Badge variant="outline" className={platformColors[campaign.platform as keyof typeof platformColors]}>
                    {campaign.platform}
                  </Badge>
                </div>
              </motion.div>
            </div>
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-4">
          {/* Budget Progress */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          >
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
              <span>Budget Progress</span>
              <span>${campaign.spent} / ${campaign.budget}</span>
            </div>
            <Progress 
              value={spentPercentage} 
              className="h-2"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {spentPercentage.toFixed(1)}% spent
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full mx-auto mb-1"
              >
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </motion.div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                ${roas}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">ROAS</div>
            </div>

            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full mx-auto mb-1"
              >
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {(Math.random() * 5 + 1).toFixed(2)}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">CTR</div>
            </div>

            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full mx-auto mb-1"
              >
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {Math.floor(Math.random() * 500 + 100)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Conv.</div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
            className="flex space-x-2 pt-2"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onToggleStatus?.(campaign)}
            >
              {campaign.status === 'active' ? (
                <>
                  <Pause className="h-3 w-3 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  Start
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit?.(campaign)}
            >
              Edit
            </Button>
          </motion.div>

          {/* Campaign Dates */}
          {(campaign.startDate || campaign.endDate) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.6 }}
              className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700"
            >
              {campaign.startDate && (
                <div>Start: {new Date(campaign.startDate).toLocaleDateString()}</div>
              )}
              {campaign.endDate && (
                <div>End: {new Date(campaign.endDate).toLocaleDateString()}</div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}