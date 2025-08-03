import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, UserCheck, Heart } from "lucide-react";

function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  colorClass 
}: {
  title: string;
  value: string;
  subtitle: string;
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
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function AudienceSegmentCard({ 
  name, 
  description, 
  size, 
  percentage 
}: {
  name: string;
  description: string;
  size: string;
  percentage: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">{size}</p>
        <p className="text-muted-foreground text-sm">{percentage} of total</p>
      </div>
    </div>
  );
}

export default function Audience() {
  const audienceSegments = [
    {
      name: "High-Value Customers",
      description: "Users with LTV > $500",
      size: "125,430",
      percentage: "5.2%"
    },
    {
      name: "Mobile-First Users",
      description: "Primarily use mobile devices",
      size: "892,341",
      percentage: "37.2%"
    },
    {
      name: "Frequent Shoppers",
      description: "Purchase 3+ times per month",
      size: "284,592",
      percentage: "11.9%"
    },
    {
      name: "New Visitors",
      description: "First-time website visitors",
      size: "456,782",
      percentage: "19.0%"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Audience Analytics</h2>
        <p className="text-muted-foreground">Deep insights into your audience demographics and behavior</p>
      </div>

      {/* Audience Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Audience"
          value="2.4M"
          subtitle="+18% this month"
          icon={Users}
          colorClass="text-blue-600"
        />
        
        <MetricCard
          title="Avg. Age"
          value="32.5"
          subtitle="years old"
          icon={Calendar}
          colorClass="text-green-600"
        />
        
        <MetricCard
          title="Top Gender"
          value="Female"
          subtitle="58% of audience"
          icon={UserCheck}
          colorClass="text-purple-600"
        />
        
        <MetricCard
          title="Engagement Rate"
          value="4.8%"
          subtitle="+0.3% vs last month"
          icon={Heart}
          colorClass="text-red-600"
        />
      </div>

      {/* Demographics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground">Age Distribution Chart - Integration with Recharts pending</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground">Geographic Map - Integration pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interest Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Technology</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Fashion</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '72%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">72%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Travel</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Food & Dining</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '61%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">61%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Mobile</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">67%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Desktop</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '28%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">28%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Tablet</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audience Segments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Audience Segments</CardTitle>
            <Button>Create Segment</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {audienceSegments.map((segment, index) => (
              <AudienceSegmentCard
                key={index}
                name={segment.name}
                description={segment.description}
                size={segment.size}
                percentage={segment.percentage}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
