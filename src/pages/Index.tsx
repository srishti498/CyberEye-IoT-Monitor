import { useState } from "react";
import Header from "@/components/Header";
import SecurityDashboard from "@/components/SecurityDashboard";
import DeviceCard from "@/components/DeviceCard";
import RiskChart from "@/components/RiskChart";
import ScanProgress from "@/components/ScanProgress";
import { mockDevices, getSecurityStats, getRiskDistribution } from "@/data/mockDevices";

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices] = useState(mockDevices);
  
  const stats = getSecurityStats(devices);
  const riskData = getRiskDistribution(devices);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scan completion after 5 seconds
    setTimeout(() => {
      setIsScanning(false);
    }, 5000);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <ScanProgress 
          isScanning={isScanning}
          onStartScan={handleStartScan}
          onStopScan={handleStopScan}
        />
        
        <SecurityDashboard stats={stats} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <RiskChart data={riskData} />
          
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Network Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network Range</span>
                  <span className="font-mono text-sm">192.168.1.0/24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gateway</span>
                  <span className="font-mono text-sm">192.168.1.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">DNS Server</span>
                  <span className="font-mono text-sm">192.168.1.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scan Status</span>
                  <span className={`text-sm font-medium ${isScanning ? 'text-medium' : 'text-primary'}`}>
                    {isScanning ? 'Running' : 'Idle'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Connected Devices</h2>
            <span className="text-muted-foreground">{devices.length} devices found</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
