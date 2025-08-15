import { Shield, Wifi, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Device {
  id: string;
  name: string;
  ip: string;
  mac: string;
  manufacturer: string;
  deviceType: string;
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low' | 'secure';
  openPorts: number[];
  vulnerabilities: string[];
  lastScan: string;
}

interface DeviceCardProps {
  device: Device;
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'critical': return 'critical';
    case 'high': return 'high';
    case 'medium': return 'medium';
    case 'low': return 'low';
    case 'secure': return 'secure';
    default: return 'muted';
  }
};

const getRiskIcon = (level: string) => {
  switch (level) {
    case 'critical':
    case 'high':
      return <XCircle className="w-4 h-4" />;
    case 'medium':
      return <AlertTriangle className="w-4 h-4" />;
    case 'low':
    case 'secure':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Shield className="w-4 h-4" />;
  }
};

const DeviceCard = ({ device }: DeviceCardProps) => {
  const riskColor = getRiskColor(device.riskLevel);
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4" 
          style={{ borderLeftColor: `hsl(var(--${riskColor}))` }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Wifi className="w-5 h-5 text-primary" />
            <span>{device.name}</span>
          </CardTitle>
          <Badge 
            variant="outline" 
            className="flex items-center space-x-1"
            style={{ 
              color: `hsl(var(--${riskColor}))`,
              borderColor: `hsl(var(--${riskColor}))`
            }}
          >
            {getRiskIcon(device.riskLevel)}
            <span className="capitalize">{device.riskLevel}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">IP Address</p>
            <p className="font-mono">{device.ip}</p>
          </div>
          <div>
            <p className="text-muted-foreground">MAC Address</p>
            <p className="font-mono text-xs">{device.mac}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">Manufacturer</p>
          <p className="font-medium">{device.manufacturer}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-muted-foreground text-sm">Risk Score</p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${device.riskScore}%`,
                  backgroundColor: `hsl(var(--${riskColor}))`
                }}
              />
            </div>
            <span className="text-sm font-medium">{device.riskScore}%</span>
          </div>
        </div>
        
        {device.openPorts.length > 0 && (
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Open Ports</p>
            <div className="flex flex-wrap gap-1">
              {device.openPorts.slice(0, 5).map(port => (
                <Badge key={port} variant="secondary" className="text-xs">
                  {port}
                </Badge>
              ))}
              {device.openPorts.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{device.openPorts.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Last scanned: {device.lastScan}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;