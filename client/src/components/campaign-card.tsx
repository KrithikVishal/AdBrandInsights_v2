import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal, Play, Pause, Eye, TrendingUp, DollarSign, MousePointer } from "lucide-react";
import { type Campaign } from "@shared/schema";

interface CampaignCardProps {
  campaign: Campaign;
  index: number;
}

const statusColors = {
  active: "bg-green-900/20 text-green-400",
  paused: "bg-yellow-900/20 text-yellow-400",
  draft: "bg-gray-900/20 text-gray-400",
  completed: "bg-blue-900/20 text-blue-400"
};

const platformColors = {
  "Google Ads": "bg-red-900/10 border-red-800",
  "Facebook": "bg-blue-900/10 border-blue-800",
  "LinkedIn": "bg-blue-900/10 border-blue-800",
  "Twitter": "bg-sky-900/10 border-sky-800",
  "TikTok": "bg-pink-900/10 border-pink-800"
};

export function CampaignCard({ campaign, index }: CampaignCardProps) {
  const impressions = Math.floor(Math.random() * 50000) + 10000;
  const clicks = Math.floor(Math.random() * 2000) + 500;
  const ctr = ((clicks / impressions) * 100).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className={`relative overflow-hidden ${platformColors[campaign.platform as keyof typeof platformColors] || 'bg-gray-800'} border hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold text-white line-clamp-1">
                {campaign.name}
              </CardTitle>
              <p className="text-sm text-gray-400">
                {campaign.platform}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant="secondary" 
                className={statusColors[campaign.status as keyof typeof statusColors]}
              >
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Budget and Objective */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Budget</span>
              <span className="font-semibold text-white">
                ${campaign.budget ? parseFloat(campaign.budget).toLocaleString() : '0'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Objective</span>
              <span className="text-sm font-medium text-white capitalize">
                {campaign.objective?.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-700">
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-900/20 rounded-full mx-auto mb-1">
                <Eye className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-sm font-semibold text-white">
                {impressions.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">
                Impressions
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-900/20 rounded-full mx-auto mb-1">
                <MousePointer className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-sm font-semibold text-white">
                {clicks.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">
                Clicks
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-900/20 rounded-full mx-auto mb-1">
                <TrendingUp className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-sm font-semibold text-white">
                {ctr}%
              </div>
              <div className="text-xs text-gray-400">
                CTR
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-3">
            <Button 
              size="sm" 
              variant={campaign.status === 'active' ? 'outline' : 'default'}
              className="flex-1"
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
            <Button size="sm" variant="outline" className="flex-1">
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        </CardContent>

        {/* Performance indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min(parseFloat(ctr) * 10, 100)}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
        />
      </Card>
    </motion.div>
  );
}