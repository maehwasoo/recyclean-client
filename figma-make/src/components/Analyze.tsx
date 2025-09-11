import { useState } from "react";
import { Camera, Upload, Scan, CheckCircle, XCircle, AlertCircle, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RecognitionResult {
  item: string;
  confidence: number;
  recyclable: boolean;
  category: string;
  instructions: string;
  tips?: string;
}

export function Analyze() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const mockResults: RecognitionResult[] = [
    {
      item: "Plastic Water Bottle",
      confidence: 95,
      recyclable: true,
      category: "Plastic #1 (PET)",
      instructions: "Remove cap and label. Rinse clean before recycling.",
      tips: "Look for recycling symbol #1 on the bottom"
    },
    {
      item: "Pizza Box",
      confidence: 88,
      recyclable: false,
      category: "Contaminated Paper",
      instructions: "Grease and food residue make this non-recyclable.",
      tips: "Remove clean parts for composting, discard greasy sections"
    },
    {
      item: "Aluminum Can",
      confidence: 92,
      recyclable: true,
      category: "Aluminum",
      instructions: "Rinse clean and crush to save space.",
      tips: "Most valuable recyclable material - 100% recyclable"
    }
  ];

  const handleTakePhoto = () => {
    setIsScanning(true);
    setCapturedImage("https://images.unsplash.com/photo-1579756423478-02bc82a97679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBzeW1ib2xzJTIwcGxhc3RpY3xlbnwxfHx8fDE3NTcwNDM3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral");
    
    // Simulate processing
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsScanning(false);
    }, 3000);
  };

  const handleUploadPhoto = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      setIsScanning(true);
      setCapturedImage("https://images.unsplash.com/photo-1579756423478-02bc82a97679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBzeW1ib2xzJTIwcGxhc3RpY3xlbnwxfHx8fDE3NTcwNDM3MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral");
      
      setTimeout(() => {
        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
        setResult(randomResult);
        setIsScanning(false);
      }, 2000);
    };
    input.click();
  };

  const handleReset = () => {
    setResult(null);
    setCapturedImage(null);
    setIsScanning(false);
  };

  const getStatusIcon = (recyclable: boolean) => {
    return recyclable ? (
      <CheckCircle className="h-6 w-6 text-green-600" />
    ) : (
      <XCircle className="h-6 w-6 text-red-600" />
    );
  };

  const getStatusBadge = (recyclable: boolean) => {
    return recyclable ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        Recyclable ♻️
      </Badge>
    ) : (
      <Badge variant="destructive">
        Not Recyclable ❌
      </Badge>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            AI Item Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Take a photo or upload an image to identify if an item is recyclable
          </p>
        </CardContent>
      </Card>

      {/* Camera/Upload Section */}
      {!capturedImage && !result && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-3">
              <Button onClick={handleTakePhoto} className="w-full" size="lg">
                <Camera className="h-5 w-5 mr-2" />
                Take Photo
              </Button>
              <Button onClick={handleUploadPhoto} variant="outline" className="w-full" size="lg">
                <Upload className="h-5 w-5 mr-2" />
                Upload Image
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Captured Image */}
      {capturedImage && (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <ImageWithFallback
                src={capturedImage}
                alt="Captured item"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scanning State */}
      {isScanning && (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <div className="font-medium">Analyzing image...</div>
            <div className="text-sm text-muted-foreground">This may take a few seconds</div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && !isScanning && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(result.recyclable)}
                Recognition Result
              </CardTitle>
              <Badge variant="outline">
                {result.confidence}% confident
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-lg">{result.item}</h3>
                {getStatusBadge(result.recyclable)}
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                Category: {result.category}
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-sm mb-1">Instructions:</div>
                <div className="text-sm">{result.instructions}</div>
              </div>

              {result.tips && (
                <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm text-blue-900 mb-1">Pro Tip:</div>
                    <div className="text-sm text-blue-800">{result.tips}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Scan Another
              </Button>
              <Button className="flex-1">
                Log as Recycled
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Photography Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Ensure good lighting</li>
            <li>• Place item on clean background</li>
            <li>• Include recycling symbols if visible</li>
            <li>• Take photo straight on, not at angle</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}