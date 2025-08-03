import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  CreditCard, 
  MoreHorizontal,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { formatCurrency } from "@/lib/metrics";
import type { Campaign } from "@shared/schema";

interface OverviewData {
  totalRevenue: string;
  totalSpend: string;
  totalConversions: number;
  roas: string;
  activeCampaigns: number;
  campaigns: Campaign[];
}

function MetricCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon, 
  colorClass 
}: {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  icon: React.ElementType;
  colorClass: string;
}) {
  const isPositive = change.startsWith("+");
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">{title}</p>
            <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass.replace('text', 'bg').replace('600', '100')}`}>
            <Icon className={`w-6 h-6 ${colorClass}`} />
          </div>
        </div>
        <div className="flex items-center mt-4 text-sm">
          {isPositive ? (
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
          ) : (
            <ArrowDown className="w-4 h-4 text-red-600 mr-1" />
          )}
          <span className={isPositive ? "text-green-600" : "text-red-600"}>
            {change}
          </span>
          <span className="text-muted-foreground ml-2">{changeLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignRow ({ campaign }: { campaign: Campaign }) {
  const roas = campaign.spent && parseFloat(campaign.spent) > 0 
    ? (Math.random() * 3 + 2).toFixed(2) // Simulated ROAS calculation
    : "0.00";

  const revenue = campaign.spent 
    ? (parseFloat(campaign.spent) * parseFloat(roas)).toFixed(0)
    : "0";

  return (
    <tr className="border-b border-border">
      <td className="p-4">
        <div>
          <p className="font-medium">{campaign.name}</p>
          <p className="text-muted-foreground text-sm">{campaign.platform}</p>
        </div>
      </td>
      <td className="p-4">
        <Badge 
          variant={campaign.status === "active" ? "default" : "secondary"}
          className={campaign.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
        >
          {campaign.status}
        </Badge>
      </td>
      <td className="p-4 font-mono">{formatCurrency(campaign.spent || "0")}</td>
      <td className="p-4 font-mono">{formatCurrency(revenue)}</td>
      <td className="p-4 font-mono text-green-600">{roas}x</td>
      <td className="p-4">
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
}

export default function Overview() {
  const { data: overviewData, isLoading } = useQuery<OverviewData>({
    queryKey: ["/api/overview"],
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!overviewData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(overviewData.totalRevenue)}
          change="+12.5%"
          changeLabel="vs last month"
          icon={DollarSign}
          colorClass="text-green-600"
        />
        
        <MetricCard
          title="ROAS"
          value={`${overviewData.roas}x`}
          change="+8.2%"
          changeLabel="vs last month"
          icon={TrendingUp}
          colorClass="text-blue-600"
        />
        
        <MetricCard
          title="Conversions"
          value={overviewData.totalConversions.toLocaleString()}
          change="+15.3%"
          changeLabel="vs last month"
          icon={Target}
          colorClass="text-purple-600"
        />
        
        <MetricCard
          title="Ad Spend"
          value={formatCurrency(overviewData.totalSpend)}
          change="+5.1%"
          changeLabel="vs last month"
          icon={CreditCard}
          colorClass="text-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground">Revenue Chart - Integration with Recharts pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground">Channel Chart - Integration with Recharts pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold">Campaign</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Spend</th>
                  <th className="text-left p-4 font-semibold">Revenue</th>
                  <th className="text-left p-4 font-semibold">ROAS</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {overviewData.campaigns.map((campaign) => (
                  <CampaignRow key={campaign.id} campaign={campaign} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
