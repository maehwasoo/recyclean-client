import { useState } from "react";
import { Lightbulb, Leaf, Target, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Tip {
  id: string;
  title: string;
  description: string;
  category: "reduce" | "reuse" | "recycle" | "energy";
  impact: "high" | "medium" | "low";
  difficulty: "easy" | "moderate" | "hard";
  image: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
}

const tips: Tip[] = [
  {
    id: "1",
    title: "Use Reusable Water Bottles",
    description: "Replace single-use plastic bottles with a reusable alternative. This can save up to 1,460 plastic bottles per year.",
    category: "reduce",
    impact: "high",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGVudmlyb25tZW50JTIwc3VzdGFpbmFiaWxpdHl8ZW58MXx8fHwxNzU3MDQzNzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "2",
    title: "Repurpose Glass Jars",
    description: "Turn empty glass jars into storage containers, planters, or organizers instead of throwing them away.",
    category: "reuse",
    impact: "medium",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGVudmlyb25tZW50JTIwc3VzdGFpbmFiaWxpdHl8ZW58MXx8fHwxNzU3MDQzNzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "3",
    title: "Proper Battery Disposal",
    description: "Take batteries to designated collection points. They contain toxic materials that shouldn't go in regular trash.",
    category: "recycle",
    impact: "high",
    difficulty: "moderate",
    image: "https://images.unsplash.com/photo-1579756423478-02bc82a97679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBzeW1ib2xzJTIwcGxhc3RpY3xlbnwxfHx8fDE3NTcwNDM3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

const goals: Goal[] = [
  {
    id: "1",
    title: "Plastic Reduction",
    description: "Reduce single-use plastic items",
    target: 50,
    current: 32,
    unit: "items",
    deadline: "End of January"
  },
  {
    id: "2",
    title: "Recycling Streak",
    description: "Consecutive days of recycling activity",
    target: 30,
    current: 12,
    unit: "days",
    deadline: "End of February"
  }
];

export function EcoTips() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTips = selectedCategory 
    ? tips.filter(tip => tip.category === selectedCategory)
    : tips;

  const getCategoryColor = (category: string) => {
    const colors = {
      reduce: "bg-red-100 text-red-800",
      reuse: "bg-blue-100 text-blue-800", 
      recycle: "bg-green-100 text-green-800",
      energy: "bg-yellow-100 text-yellow-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getImpactColor = (impact: string) => {
    const colors = {
      high: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-orange-100 text-orange-800"
    };
    return colors[impact as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const categories = [
    { id: "reduce", label: "Reduce", icon: "🔻" },
    { id: "reuse", label: "Reuse", icon: "🔄" },
    { id: "recycle", label: "Recycle", icon: "♻️" },
    { id: "energy", label: "Energy", icon: "⚡" }
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Sustainability Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Sustainability Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={goal.id} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{goal.title}</h4>
                    <p className="text-xs text-muted-foreground">{goal.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {goal.deadline}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{goal.current} / {goal.target} {goal.unit}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-1.5">
                    <div 
                      className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Eco Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className="flex flex-col gap-1 h-auto py-2"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-xs">{category.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips List */}
      <div className="space-y-3">
        {filteredTips.map((tip) => (
          <Card key={tip.id} className="overflow-hidden">
            <div className="relative h-24">
              <ImageWithFallback
                src={tip.image}
                alt={tip.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge className={getCategoryColor(tip.category)}>
                  {tip.category}
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getImpactColor(tip.impact)} variant="secondary">
                  {tip.impact} impact
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">{tip.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {tip.difficulty} to implement
                </Badge>
                <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                  Learn more
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTips.length === 0 && selectedCategory && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No tips found for this category</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}