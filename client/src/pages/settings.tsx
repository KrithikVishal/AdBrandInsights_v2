import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Palette, 
  Globe, 
  Shield, 
  User,
  Monitor,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
  Volume2,
  Save,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/hooks/use-theme";
import { useToastManager } from "@/components/toast-notifications";

// Theme color options
const themeColors = [
  { name: "Blue", value: "blue", color: "#3B82F6" },
  { name: "Green", value: "green", color: "#10B981" },
  { name: "Purple", value: "purple", color: "#8B5CF6" },
  { name: "Orange", value: "orange", color: "#F59E0B" },
  { name: "Red", value: "red", color: "#EF4444" },
  { name: "Pink", value: "pink", color: "#EC4899" },
  { name: "Indigo", value: "indigo", color: "#6366F1" },
  { name: "Teal", value: "teal", color: "#14B8A6" }
];

// Language options
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" }
];

function SettingsSection({ 
  title, 
  description, 
  icon: Icon, 
  children 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ColorPicker({ 
  selectedColor, 
  onColorChange 
}: { 
  selectedColor: string; 
  onColorChange: (color: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {themeColors.map((color) => (
        <motion.button
          key={color.value}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onColorChange(color.value)}
          className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
            selectedColor === color.value
              ? 'border-gray-900 dark:border-white shadow-lg'
              : 'border-gray-200 dark:border-gray-700'
          }`}
          style={{ backgroundColor: color.color }}
          title={color.name}
        >
          {selectedColor === color.value && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full h-full rounded-full flex items-center justify-center"
            >
              <div className="w-3 h-3 bg-white rounded-full" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { showSuccess } = useToastManager();

  // Settings state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true,
    reports: true,
    alerts: true
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    themeColor: "blue",
    volume: [75],
    autoRefresh: true,
    compactMode: false
  });

  const [privacy, setPrivacy] = useState({
    analytics: true,
    tracking: false,
    dataSharing: false,
    cookieConsent: true
  });

  const handleSaveSettings = () => {
    // Save settings to localStorage or API
    localStorage.setItem('settings', JSON.stringify({ notifications, preferences, privacy }));
    showSuccess("Settings Saved", "Your preferences have been updated successfully.");
  };

  const handleResetSettings = () => {
    setNotifications({
      email: true,
      push: true,
      sms: false,
      marketing: true,
      reports: true,
      alerts: true
    });
    setPreferences({
      language: "en",
      timezone: "UTC",
      currency: "USD",
      dateFormat: "MM/DD/YYYY",
      themeColor: "blue",
      volume: [75],
      autoRefresh: true,
      compactMode: false
    });
    setPrivacy({
      analytics: true,
      tracking: false,
      dataSharing: false,
      cookieConsent: true
    });
    showSuccess("Settings Reset", "All settings have been restored to defaults.");
  };

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
            User Preferences
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your dashboard experience and manage your account settings
          </p>
        </div>
        <div className="flex space-x-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleResetSettings} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Appearance Settings */}
      <SettingsSection
        title="Appearance"
        description="Customize the look and feel of your dashboard"
        icon={Palette}
      >
        <div className="space-y-6">
          {/* Theme Mode */}
          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">
              Theme Mode
            </Label>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme("light")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  theme === "light"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme("dark")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  theme === "dark"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme("system")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  theme === "system"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <Monitor className="h-4 w-4" />
                <span>System</span>
              </motion.button>
            </div>
          </div>

          {/* Theme Colors */}
          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">
              Accent Color
            </Label>
            <ColorPicker
              selectedColor={preferences.themeColor}
              onColorChange={(color) => 
                setPreferences(prev => ({ ...prev, themeColor: color }))
              }
            />
          </div>

          {/* Layout Options */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Compact Mode
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Reduce spacing and padding for more content
              </p>
            </div>
            <Switch
              checked={preferences.compactMode}
              onCheckedChange={(checked) =>
                setPreferences(prev => ({ ...prev, compactMode: checked }))
              }
            />
          </div>
        </div>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        title="Notifications"
        description="Manage how and when you receive notifications"
        icon={Bell}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications(prev => ({ ...prev, email: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-4 w-4 text-gray-500" />
              <div>
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  Push Notifications
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive push notifications on your device
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications(prev => ({ ...prev, push: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <div>
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  SMS Notifications
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Receive important alerts via SMS
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={(checked) =>
                setNotifications(prev => ({ ...prev, sms: checked }))
              }
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-900 dark:text-white">
              Notification Types
            </Label>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Campaign Alerts</span>
              <Switch
                checked={notifications.alerts}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, alerts: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Weekly Reports</span>
              <Switch
                checked={notifications.reports}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, reports: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Marketing Updates</span>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) =>
                  setNotifications(prev => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>

          {/* Volume Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Notification Volume
              </Label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {preferences.volume[0]}%
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Volume2 className="h-4 w-4 text-gray-400" />
              <Slider
                value={preferences.volume}
                onValueChange={(value) =>
                  setPreferences(prev => ({ ...prev, volume: value }))
                }
                max={100}
                step={5}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </SettingsSection>

      {/* Language & Region */}
      <SettingsSection
        title="Language & Region"
        description="Set your language, timezone, and regional preferences"
        icon={Globe}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
              Language
            </Label>
            <Select value={preferences.language} onValueChange={(value) =>
              setPreferences(prev => ({ ...prev, language: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <div className="flex items-center space-x-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
              Timezone
            </Label>
            <Select value={preferences.timezone} onValueChange={(value) =>
              setPreferences(prev => ({ ...prev, timezone: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC (Universal Time)</SelectItem>
                <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                <SelectItem value="GMT">GMT (Greenwich Mean Time)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
              Currency
            </Label>
            <Select value={preferences.currency} onValueChange={(value) =>
              setPreferences(prev => ({ ...prev, currency: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
              Date Format
            </Label>
            <Select value={preferences.dateFormat} onValueChange={(value) =>
              setPreferences(prev => ({ ...prev, dateFormat: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsSection>

      {/* Privacy & Security */}
      <SettingsSection
        title="Privacy & Security"
        description="Control your data privacy and security settings"
        icon={Shield}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Analytics Collection
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Help improve the platform by sharing usage analytics
              </p>
            </div>
            <Switch
              checked={privacy.analytics}
              onCheckedChange={(checked) =>
                setPrivacy(prev => ({ ...prev, analytics: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Activity Tracking
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Track user activity for personalized recommendations
              </p>
            </div>
            <Switch
              checked={privacy.tracking}
              onCheckedChange={(checked) =>
                setPrivacy(prev => ({ ...prev, tracking: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Data Sharing
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share anonymized data with partners for insights
              </p>
            </div>
            <Switch
              checked={privacy.dataSharing}
              onCheckedChange={(checked) =>
                setPrivacy(prev => ({ ...prev, dataSharing: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Cookie Consent
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Allow cookies for enhanced functionality
              </p>
            </div>
            <Switch
              checked={privacy.cookieConsent}
              onCheckedChange={(checked) =>
                setPrivacy(prev => ({ ...prev, cookieConsent: checked }))
              }
            />
          </div>
        </div>
      </SettingsSection>

      {/* Dashboard Preferences */}
      <SettingsSection
        title="Dashboard"
        description="Customize your dashboard layout and behavior"
        icon={SettingsIcon}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-white">
                Auto-refresh Data
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Automatically refresh dashboard data every 5 minutes
              </p>
            </div>
            <Switch
              checked={preferences.autoRefresh}
              onCheckedChange={(checked) =>
                setPreferences(prev => ({ ...prev, autoRefresh: checked }))
              }
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
              Default Dashboard View
            </Label>
            <Select defaultValue="overview">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="campaigns">Campaigns</SelectItem>
                <SelectItem value="audience">Audience</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => showSuccess("Layout Reset", "Dashboard layout has been reset to default.")}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Dashboard Layout
          </Button>
        </div>
      </SettingsSection>
    </motion.div>
  );
}