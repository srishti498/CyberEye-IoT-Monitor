import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RiskData {
  level: string;
  count: number;
  color: string;
}

interface RiskChartProps {
  data: RiskData[];
}

const RiskChart = ({ data }: RiskChartProps) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Risk Level Distribution</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => {
            const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
            
            return (
              <div key={item.level} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">{item.level}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.count} devices ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{total}</p>
              <p className="text-xs text-muted-foreground">Total Devices</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {data.find(d => d.level === 'secure')?.count || 0}
              </p>
              <p className="text-xs text-muted-foreground">Secure</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskChart;