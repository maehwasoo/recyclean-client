import { TrendingUp, Award, Recycle, MapPin, Calendar, Target, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Dashboard() {
  const todayStats = {
    itemsRecycled: 12,
    pointsEarned: 24,
    streakDays: 7
  };

  const weeklyProgress = 65;
  const monthlyGoal = 100;
  const currentPoints = 65;

  const recentActivity = [
    { type: "Plastic Bottles", count: 5, points: 10, time: "2 hours ago" },
    { type: "Aluminum Cans", count: 3, points: 6, time: "1 day ago" },
    { type: "Glass Jars", count: 2, points: 6, time: "2 days ago" }
  ];

  const achievements = [
    { title: "Eco Warrior", description: "7-day recycling streak", earned: true },
    { title: "Bottle Buster", description: "Recycled 50 bottles", earned: true },
    { title: "Green Guardian", description: "100 points earned", earned: false }
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Welcome Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <Recycle className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <h2 className="text-xl font-bold">Welcome back!</h2>
            <p className="text-sm text-muted-foreground">Keep up your amazing recycling efforts</p>
          </div>
        </CardContent>
      </Card>

      {/* Today's Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{todayStats.itemsRecycled}</div>
              <div className="text-xs text-muted-foreground">Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{todayStats.pointsEarned}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{todayStats.streakDays}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Monthly Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-lg font-bold">{currentPoints} / {monthlyGoal} points</div>
            <div className="text-sm text-muted-foreground">January 2025</div>
          </div>
          
          <Progress value={weeklyProgress} className="h-3" />
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{Math.round(weeklyProgress)}% complete</span>
            <span className="font-medium text-green-600">On track!</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Camera className="h-4 w-4 mr-2" />
            Scan Item to Recycle
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <MapPin className="h-4 w-4 mr-2" />
            Find Nearby Trash Bins
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <TrendingUp className="h-4 w-4 mr-2" />
            Log Manual Entry
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <div className="font-medium text-sm">{activity.type}</div>
                <div className="text-xs text-muted-foreground">
                  {activity.count} items • {activity.time}
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                +{activity.points} pts
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
              achievement.earned ? "bg-green-50 border border-green-200" : "bg-muted"
            }`}>
              <Award className={`h-6 w-6 ${
                achievement.earned ? "text-green-600 fill-current" : "text-gray-400"
              }`} />
              <div className="flex-1">
                <div className="font-medium text-sm">{achievement.title}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
              {achievement.earned && (
                <Badge className="bg-green-100 text-green-800">Earned</Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}