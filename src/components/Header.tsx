import { Shield, Scan, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">IoT Security Sentinel</h1>
              <p className="text-sm text-muted-foreground">Smart Device Vulnerability Scanner</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Live Monitor</span>
            </Button>
            <Button variant="default" size="sm" className="flex items-center space-x-2">
              <Scan className="w-4 h-4" />
              <span>Start Scan</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;