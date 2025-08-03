import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Target, MoreHorizontal } from "lucide-react";

function QuickReportCard({ 
  title, 
  description, 
  icon: Icon, 
  colorClass,
  onGenerate 
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  onGenerate: () => void;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass.replace('text', 'bg').replace('600', '100')}`}>
            <Icon className={`w-6 h-6 ${colorClass}`} />
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        <Button className="w-full" onClick={onGenerate}>
          Generate Report
        </Button>
      </CardContent>
    </Card>
  );
}

function ScheduledReportRow({ 
  name, 
  description, 
  frequency, 
  recipients, 
  nextRun, 
  status 
}: {
  name: string;
  description: string;
  frequency: string;
  recipients: string;
  nextRun: string;
  status: string;
}) {
  return (
    <tr className="border-b border-border">
      <td className="p-4">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </td>
      <td className="p-4">{frequency}</td>
      <td className="p-4">{recipients}</td>
      <td className="p-4">{nextRun}</td>
      <td className="p-4">
        <Badge 
          variant={status === "Active" ? "default" : "secondary"}
          className={status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
        >
          {status}
        </Badge>
      </td>
      <td className="p-4">
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </td>
    </tr>
  );
}

export default function Reports() {
  const [reportName, setReportName] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [metrics, setMetrics] = useState({
    revenue: true,
    conversions: true,
    demographics: false
  });

  const quickReports = [
    {
      title: "Campaign Performance",
      description: "Weekly summary",
      icon: BarChart3,
      colorClass: "text-blue-600"
    },
    {
      title: "Audience Insights",
      description: "Demographics & behavior",
      icon: Users,
      colorClass: "text-green-600"
    },
    {
      title: "Conversion Analysis",
      description: "Funnel & attribution",
      icon: Target,
      colorClass: "text-purple-600"
    }
  ];

  const scheduledReports = [
    {
      name: "Weekly Performance Summary",
      description: "Campaign metrics & KPIs",
      frequency: "Weekly",
      recipients: "marketing@company.com",
      nextRun: "Monday, 9:00 AM",
      status: "Active"
    },
    {
      name: "Monthly ROI Report",
      description: "Revenue and spend analysis",
      frequency: "Monthly",
      recipients: "executives@company.com",
      nextRun: "1st of month, 8:00 AM",
      status: "Active"
    },
    {
      name: "Creative Performance Review",
      description: "Ad creative analysis",
      frequency: "Bi-weekly",
      recipients: "creative@company.com",
      nextRun: "Next Tuesday, 10:00 AM",
      status: "Paused"
    }
  ];

  const handleGenerateReport = (reportType: string) => {
    console.log(`Generating ${reportType} report...`);
    // TODO: Implement report generation logic
  };

  const handleGenerateCustomReport = () => {
    console.log("Generating custom report with:", {
      reportName,
      dateRange,
      groupBy,
      metrics
    });
    // TODO: Implement custom report generation
  };

  const handlePreviewReport = () => {
    console.log("Previewing report...");
    // TODO: Implement report preview
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Reports & Export</h2>
        <p className="text-muted-foreground">Generate comprehensive reports and export your data</p>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickReports.map((report, index) => (
          <QuickReportCard
            key={index}
            title={report.title}
            description={report.description}
            icon={report.icon}
            colorClass={report.colorClass}
            onGenerate={() => handleGenerateReport(report.title)}
          />
        ))}
      </div>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="reportName">Report Name</Label>
              <Input
                id="reportName"
                placeholder="Enter report name..."
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="thisMonth">This month</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Metrics</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="revenue"
                    checked={metrics.revenue}
                    onCheckedChange={(checked) => 
                      setMetrics(prev => ({ ...prev, revenue: !!checked }))
                    }
                  />
                  <Label htmlFor="revenue">Revenue & ROAS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="conversions"
                    checked={metrics.conversions}
                    onCheckedChange={(checked) => 
                      setMetrics(prev => ({ ...prev, conversions: !!checked }))
                    }
                  />
                  <Label htmlFor="conversions">Conversion Metrics</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="demographics"
                    checked={metrics.demographics}
                    onCheckedChange={(checked) => 
                      setMetrics(prev => ({ ...prev, demographics: !!checked }))
                    }
                  />
                  <Label htmlFor="demographics">Audience Demographics</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="groupBy">Grouping</Label>
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select grouping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campaign">By Campaign</SelectItem>
                  <SelectItem value="channel">By Channel</SelectItem>
                  <SelectItem value="date">By Date</SelectItem>
                  <SelectItem value="audience">By Audience</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <Button onClick={handleGenerateCustomReport}>
              Generate Report
            </Button>
            <Button variant="outline" onClick={handlePreviewReport}>
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Scheduled Reports</CardTitle>
            <Button>Schedule New</Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold">Report Name</th>
                  <th className="text-left p-4 font-semibold">Frequency</th>
                  <th className="text-left p-4 font-semibold">Recipients</th>
                  <th className="text-left p-4 font-semibold">Next Run</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scheduledReports.map((report, index) => (
                  <ScheduledReportRow
                    key={index}
                    name={report.name}
                    description={report.description}
                    frequency={report.frequency}
                    recipients={report.recipients}
                    nextRun={report.nextRun}
                    status={report.status}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
