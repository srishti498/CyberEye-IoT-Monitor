import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Scan, Square, RotateCcw } from "lucide-react";

interface ScanProgressProps {
  isScanning: boolean;
  onStartScan: () => void;
  onStopScan: () => void;
}

const ScanProgress = ({ isScanning, onStartScan, onStopScan }: ScanProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("");

  const scanPhases = [
    "Discovering network devices...",
    "Scanning IP ranges...",
    "Checking open ports...",
    "Identifying device types...",
    "Analyzing vulnerabilities...",
    "Calculating risk scores...",
    "Generating report..."
  ];

  useEffect(() => {
    if (isScanning) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 2;
          const phaseIndex = Math.floor((newProgress / 100) * scanPhases.length);
          setCurrentPhase(scanPhases[Math.min(phaseIndex, scanPhases.length - 1)]);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
      setCurrentPhase("");
    }
  }, [isScanning]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <Scan className="w-5 h-5 text-primary" />
            <span>Network Scan Status</span>
          </span>
          <div className="flex space-x-2">
            {!isScanning ? (
              <Button onClick={onStartScan} size="sm" className="flex items-center space-x-2">
                <Scan className="w-4 h-4" />
                <span>Start Scan</span>
              </Button>
            ) : (
              <Button onClick={onStopScan} variant="destructive" size="sm" className="flex items-center space-x-2">
                <Square className="w-4 h-4" />
                <span>Stop Scan</span>
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <RotateCcw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isScanning && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {currentPhase && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>{currentPhase}</span>
              </div>
            )}
          </div>
        )}
        
        {!isScanning && (
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              Click "Start Scan" to begin network vulnerability assessment
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScanProgress;