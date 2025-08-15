import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react";

interface SecurityStats {
  totalDevices: number;
  secureDevices: number;
  vulnerableDevices: number;
  criticalDevices: number;
  averageRiskScore: number;
}

interface SecurityDashboardProps {
  stats: SecurityStats;
}

const SecurityDashboard = ({ stats }: SecurityDashboardProps) => {
  const securityPercentage = Math.round((stats.secureDevices / stats.totalDevices) * 100);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-card to-card/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Devices
          </CardTitle>
          <Activity className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.totalDevices}</div>
          <p className="text-xs text-muted-foreground">
            Connected to network
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Secure Devices
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-secure" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secure">{stats.secureDevices}</div>
          <p className="text-xs text-muted-foreground">
            {securityPercentage}% of total devices
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Vulnerable Devices
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-medium" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-medium">{stats.vulnerableDevices}</div>
          <p className="text-xs text-muted-foreground">
            Need attention
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Critical Risk
          </CardTitle>
          <Shield className="h-4 w-4 text-critical" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-critical">{stats.criticalDevices}</div>
          <p className="text-xs text-muted-foreground">
            Immediate action required
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;