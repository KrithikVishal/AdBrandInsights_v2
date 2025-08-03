import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Link, 
  Users, 
  CreditCard,
  Chrome,
  Trash2
} from "lucide-react";

interface SettingsNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

function SettingsNav({ currentSection, onSectionChange }: SettingsNavProps) {
  const settingsNavItems = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Link },
    { id: "team", label: "Team Management", icon: Users },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <nav className="space-y-1">
      {settingsNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`settings-nav-item w-full ${currentSection === item.id ? 'active' : ''}`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function GeneralSettings() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@company.com",
    dateRange: "last30",
    currency: "USD",
    timezone: "PT"
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your profile and preferences have been updated.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="mt-2"
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dateRange">Default Date Range</Label>
              <Select value={formData.dateRange} onValueChange={(value) => handleInputChange("dateRange", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="thisMonth">This month</SelectItem>
                  <SelectItem value="thisQuarter">This quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timezone">Time Zone</Label>
              <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PT">Pacific Time (PT)</SelectItem>
                  <SelectItem value="ET">Eastern Time (ET)</SelectItem>
                  <SelectItem value="CT">Central Time (CT)</SelectItem>
                  <SelectItem value="MT">Mountain Time (MT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
}

function NotificationSettings() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    campaignAlerts: true,
    weeklyReports: true,
    budgetWarnings: true,
    performanceUpdates: false,
    systemMaintenance: true
  });

  const handleSave = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Campaign Alerts</Label>
                <p className="text-muted-foreground text-sm">Get notified when campaigns need attention</p>
              </div>
              <Checkbox
                checked={notifications.campaignAlerts}
                onCheckedChange={(checked) => handleNotificationChange("campaignAlerts", !!checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Weekly Reports</Label>
                <p className="text-muted-foreground text-sm">Receive weekly performance summaries</p>
              </div>
              <Checkbox
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => handleNotificationChange("weeklyReports", !!checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Budget Warnings</Label>
                <p className="text-muted-foreground text-sm">Alert when campaigns approach budget limits</p>
              </div>
              <Checkbox
                checked={notifications.budgetWarnings}
                onCheckedChange={(checked) => handleNotificationChange("budgetWarnings", !!checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Performance Updates</Label>
                <p className="text-muted-foreground text-sm">Daily performance summaries</p>
              </div>
              <Checkbox
                checked={notifications.performanceUpdates}
                onCheckedChange={(checked) => handleNotificationChange("performanceUpdates", !!checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">System Maintenance</Label>
                <p className="text-muted-foreground text-sm">Notifications about system updates and maintenance</p>
              </div>
              <Checkbox
                checked={notifications.systemMaintenance}
                onCheckedChange={(checked) => handleNotificationChange("systemMaintenance", !!checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Button onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  );
}

function IntegrationsSettings() {
  const { toast } = useToast();
  
  const integrations = [
    {
      name: "Google Ads",
      account: "ads@company.com",
      connected: true,
      icon: Chrome,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      name: "Facebook Ads",
      account: "marketing@company.com",
      connected: true,
      icon: Chrome,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      name: "LinkedIn Ads",
      account: "Not connected",
      connected: false,
      icon: Chrome,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      name: "TikTok Ads",
      account: "Not connected",
      connected: false,
      icon: Chrome,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  const handleDisconnect = (integrationName: string) => {
    toast({
      title: "Integration disconnected",
      description: `${integrationName} has been disconnected from your account.`,
    });
  };

  const handleConnect = (integrationName: string) => {
    toast({
      title: "Integration connected",
      description: `${integrationName} has been connected to your account.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Platforms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${integration.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${integration.color}`} />
                  </div>
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {integration.connected ? `Connected account: ${integration.account}` : integration.account}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={integration.connected ? "default" : "secondary"}
                    className={integration.connected ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {integration.connected ? "Connected" : "Not Connected"}
                  </Badge>
                  {integration.connected ? (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDisconnect(integration.name)}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConnect(integration.name)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function TeamSettings() {
  const { toast } = useToast();
  
  const teamMembers = [
    {
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Admin",
      status: "Active"
    },
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Manager",
      status: "Active"
    },
    {
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      role: "Analyst",
      status: "Invited"
    }
  ];

  const handleRemoveMember = (memberName: string) => {
    toast({
      title: "Team member removed",
      description: `${memberName} has been removed from the team.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Members</CardTitle>
            <Button>Invite Member</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-muted-foreground text-sm">{member.email}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline">{member.role}</Badge>
                  <Badge 
                    variant={member.status === "Active" ? "default" : "secondary"}
                    className={member.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {member.status}
                  </Badge>
                  {member.name !== "John Smith" && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleRemoveMember(member.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function BillingSettings() {
  const { toast } = useToast();
  
  const handleUpdatePayment = () => {
    toast({
      title: "Payment method updated",
      description: "Your payment information has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-lg">Professional Plan</p>
                <p className="text-muted-foreground">$99/month • Up to 10 campaigns</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Current Plan</Badge>
            </div>
            
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Monthly Limit</span>
                <span>10 campaigns</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Current Usage</span>
                <span>2 campaigns</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Next Billing Date</span>
                <span>January 15, 2025</span>
              </div>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button>Upgrade Plan</Button>
              <Button variant="outline">View All Plans</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-muted-foreground text-sm">Expires 12/26</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleUpdatePayment}>
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Settings() {
  const [currentSection, setCurrentSection] = useState("general");

  const renderSettingsContent = () => {
    switch (currentSection) {
      case "notifications":
        return <NotificationSettings />;
      case "integrations":
        return <IntegrationsSettings />;
      case "team":
        return <TeamSettings />;
      case "billing":
        return <BillingSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Settings</h2>
        <p className="text-muted-foreground">Configure your dashboard preferences and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <SettingsNav currentSection={currentSection} onSectionChange={setCurrentSection} />
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="animate-fade-in">
            {renderSettingsContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
