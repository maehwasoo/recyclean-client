import { useState } from "react";
import { Plus, TrendingUp, Award, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface RecyclingEntry {
  id: string;
  type: string;
  amount: number;
  date: Date;
  points: number;
}

export function RecyclingTracker() {
  const [entries, setEntries] = useState<RecyclingEntry[]>([
    {
      id: "1",
      type: "Plastic Bottles",
      amount: 5,
      date: new Date(2025, 0, 3),
      points: 10
    },
    {
      id: "2", 
      type: "Aluminum Cans",
      amount: 8,
      date: new Date(2025, 0, 2),
      points: 16
    },
    {
      id: "3",
      type: "Glass Jars",
      amount: 3,
      date: new Date(2025, 0, 1),
      points: 9
    }
  ]);

  const totalPoints = entries.reduce((sum, entry) => sum + entry.points, 0);
  const monthlyGoal = 100;
  const progress = (totalPoints / monthlyGoal) * 100;

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Plastic Bottles": "bg-blue-100 text-blue-800",
      "Aluminum Cans": "bg-gray-100 text-gray-800", 
      "Glass Jars": "bg-green-100 text-green-800",
      "Paper": "bg-yellow-100 text-yellow-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Monthly Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">points earned</div>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Goal: {monthlyGoal} points</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          
          {progress >= 100 && (
            <div className="flex items-center justify-center gap-2 p-2 bg-green-50 rounded-md">
              <Award className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Goal achieved!</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Add */}
      <Card>
        <CardContent className="p-4">
          <Button className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Log Recycling Activity
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {entries.slice(0, 5).map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={getTypeColor(entry.type)}>
                    {entry.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {entry.amount} items
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {entry.date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-green-600">+{entry.points}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{entries.length}</div>
              <div className="text-xs text-muted-foreground">Activities</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                {entries.reduce((sum, entry) => sum + entry.amount, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Items</div>
            </div>
            <div>
              <div className="text-lg font-bold">
                {new Set(entries.map(entry => entry.type)).size}
              </div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}