import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Percent, ShoppingCart, DollarSign } from "lucide-react";

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
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{title}</h3>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-muted-foreground text-sm">{change} {changeLabel}</p>
      </CardContent>
    </Card>
  );
}

function FunnelStep({ 
  title, 
  value, 
  percentage, 
  color 
}: {
  title: string;
  value: string;
  percentage: number;
  color: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className={`w-4 h-4 ${color} rounded-full`}></div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">{title}</span>
          <span className="font-mono">{value}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
      <span className="text-muted-foreground text-sm w-16 text-right">{percentage}%</span>
    </div>
  );
}

function AttributionRow({ 
  model, 
  value 
}: {
  model: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{model}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

function ConversionPathCard({ 
  platforms, 
  conversions 
}: {
  platforms: string[];
  conversions: string;
}) {
  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2">
        {platforms.map((platform, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs ${
              platform === 'Google' ? 'bg-blue-100 text-blue-800' :
              platform === 'Facebook' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {platform}
            </span>
            {index < platforms.length - 1 && (
              <span className="text-muted-foreground">→</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Conversions:</span>
        <span className="font-medium">{conversions}</span>
      </div>
    </div>
  );
}

export default function Conversion() {
  const funnelSteps = [
    { title: "Ad Impressions", value: "2,450,000", percentage: 100, color: "bg-blue-600" },
    { title: "Website Visits", value: "98,000", percentage: 40, color: "bg-green-600" },
    { title: "Add to Cart", value: "24,500", percentage: 25, color: "bg-yellow-600" },
    { title: "Checkout Started", value: "14,700", percentage: 60, color: "bg-purple-600" },
    { title: "Purchase Complete", value: "9,420", percentage: 64, color: "bg-red-600" }
  ];

  const attributionModels = [
    { model: "First Touch", value: "$847,392" },
    { model: "Last Touch", value: "$923,184" },
    { model: "Linear", value: "$885,288" },
    { model: "Time Decay", value: "$901,456" }
  ];

  const conversionPaths = [
    { platforms: ["Google", "Facebook", "Direct"], conversions: "2,847" },
    { platforms: ["Facebook", "Direct"], conversions: "1,923" },
    { platforms: ["Google", "Direct"], conversions: "1,564" },
    { platforms: ["LinkedIn", "Google", "Direct"], conversions: "892" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Conversion Tracking</h2>
        <p className="text-muted-foreground">Monitor your conversion funnel and attribution data</p>
      </div>

      {/* Conversion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Conversions"
          value="18,426"
          change="+15.3%"
          changeLabel="vs last month"
          icon={Target}
          colorClass="text-green-600"
        />
        
        <MetricCard
          title="Conversion Rate"
          value="4.8%"
          change="+0.3%"
          changeLabel="vs last month"
          icon={Percent}
          colorClass="text-blue-600"
        />
        
        <MetricCard
          title="Avg. Order Value"
          value="$154.60"
          change="+$12.40"
          changeLabel="vs last month"
          icon={ShoppingCart}
          colorClass="text-purple-600"
        />
        
        <MetricCard
          title="Cost Per Conversion"
          value="$32.25"
          change="-$2.10"
          changeLabel="vs last month"
          icon={DollarSign}
          colorClass="text-orange-600"
        />
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {funnelSteps.map((step, index) => (
              <FunnelStep
                key={index}
                title={step.title}
                value={step.value}
                percentage={step.percentage}
                color={step.color}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attribution Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attribution Models</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {attributionModels.slice(0, -1).map((model, index) => (
                <AttributionRow key={index} model={model.model} value={model.value} />
              ))}
              <div className="border-t border-border pt-4">
                <AttributionRow 
                  model={attributionModels[attributionModels.length - 1].model} 
                  value={attributionModels[attributionModels.length - 1].value} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Converting Paths</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {conversionPaths.map((path, index) => (
                <ConversionPathCard
                  key={index}
                  platforms={path.platforms}
                  conversions={path.conversions}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Value by Channel */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Value by Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="font-medium">Google Ads</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">$435,892</p>
                <p className="text-sm text-muted-foreground">38.2% of total</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="font-medium">Facebook Ads</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">$328,145</p>
                <p className="text-sm text-muted-foreground">28.7% of total</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="font-medium">LinkedIn Ads</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">$187,234</p>
                <p className="text-sm text-muted-foreground">16.4% of total</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
