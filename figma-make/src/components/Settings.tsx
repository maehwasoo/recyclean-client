import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  MapPin, 
  Shield, 
  HelpCircle, 
  Info, 
  LogOut,
  Moon,
  Sun,
  Globe,
  Volume2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sounds, setSounds] = useState(true);

  const userStats = {
    totalPoints: 287,
    itemsRecycled: 156,
    joinDate: "January 2024",
    streakDays: 12
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Profile Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-green-100 text-green-800 text-lg">
                EC
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">EcoWarrior</h3>
              <p className="text-sm text-muted-foreground">Member since {userStats.joinDate}</p>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {userStats.totalPoints} points
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {userStats.streakDays} day streak
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Your Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{userStats.itemsRecycled}</div>
              <div className="text-xs text-muted-foreground">Items Recycled</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
              <div className="text-xs text-muted-foreground">Total Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            App Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Notifications</div>
                <div className="text-xs text-muted-foreground">Get recycling reminders</div>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <Separator />

          {/* Location Services */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Location Services</div>
                <div className="text-xs text-muted-foreground">Find nearby recycling points</div>
              </div>
            </div>
            <Switch checked={location} onCheckedChange={setLocation} />
          </div>

          <Separator />

          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Sun className="h-4 w-4 text-muted-foreground" />
              )}
              <div>
                <div className="text-sm font-medium">Dark Mode</div>
                <div className="text-xs text-muted-foreground">Switch to dark theme</div>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <Separator />

          {/* Sounds */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Sound Effects</div>
                <div className="text-xs text-muted-foreground">Play sounds for actions</div>
              </div>
            </div>
            <Switch checked={sounds} onCheckedChange={setSounds} />
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language & Region
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm font-medium mb-2">Language</div>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Region</div>
            <Select defaultValue="us">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="eu">European Union</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Account & Support */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            <User className="h-4 w-4 mr-3" />
            Edit Profile
          </Button>
          
          <Button variant="ghost" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-3" />
            Privacy Settings
          </Button>
          
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="h-4 w-4 mr-3" />
            Help & Support
          </Button>
          
          <Button variant="ghost" className="w-full justify-start">
            <Info className="h-4 w-4 mr-3" />
            About EcoTracker
          </Button>

          <Separator />

          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>EcoTracker v1.0.0</div>
            <div>Made with ♻️ for a better planet</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}