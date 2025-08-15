export interface Device {
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

export const mockDevices: Device[] = [
  {
    id: "1",
    name: "Router-ASUS-5G",
    ip: "192.168.1.1",
    mac: "AA:BB:CC:DD:EE:FF",
    manufacturer: "ASUS",
    deviceType: "Router",
    riskScore: 85,
    riskLevel: "critical",
    openPorts: [22, 23, 80, 443, 8080],
    vulnerabilities: [
      "Default credentials detected",
      "Telnet service enabled",
      "Outdated firmware"
    ],
    lastScan: "2 minutes ago"
  },
  {
    id: "2",
    name: "Smart-TV-Samsung",
    ip: "192.168.1.15",
    mac: "11:22:33:44:55:66",
    manufacturer: "Samsung",
    deviceType: "Smart TV",
    riskScore: 65,
    riskLevel: "high",
    openPorts: [80, 443, 7001, 8001],
    vulnerabilities: [
      "Unencrypted communication",
      "Open debugging ports"
    ],
    lastScan: "2 minutes ago"
  },
  {
    id: "3",
    name: "iPhone-14-Pro",
    ip: "192.168.1.25",
    mac: "77:88:99:AA:BB:CC",
    manufacturer: "Apple",
    deviceType: "Smartphone",
    riskScore: 15,
    riskLevel: "secure",
    openPorts: [],
    vulnerabilities: [],
    lastScan: "2 minutes ago"
  },
  {
    id: "4",
    name: "Ring-Doorbell",
    ip: "192.168.1.30",
    mac: "DD:EE:FF:00:11:22",
    manufacturer: "Ring",
    deviceType: "Security Camera",
    riskScore: 45,
    riskLevel: "medium",
    openPorts: [443, 8443],
    vulnerabilities: [
      "Weak password policy"
    ],
    lastScan: "2 minutes ago"
  },
  {
    id: "5",
    name: "MacBook-Air-M2",
    ip: "192.168.1.35",
    mac: "33:44:55:66:77:88",
    manufacturer: "Apple",
    deviceType: "Laptop",
    riskScore: 20,
    riskLevel: "low",
    openPorts: [22],
    vulnerabilities: [],
    lastScan: "2 minutes ago"
  },
  {
    id: "6",
    name: "Alexa-Echo-Dot",
    ip: "192.168.1.40",
    mac: "99:AA:BB:CC:DD:EE",
    manufacturer: "Amazon",
    deviceType: "Smart Speaker",
    riskScore: 55,
    riskLevel: "medium",
    openPorts: [443, 4070],
    vulnerabilities: [
      "Always listening mode"
    ],
    lastScan: "2 minutes ago"
  },
  {
    id: "7",
    name: "Nest-Thermostat",
    ip: "192.168.1.45",
    mac: "FF:00:11:22:33:44",
    manufacturer: "Google",
    deviceType: "Smart Thermostat",
    riskScore: 25,
    riskLevel: "low",
    openPorts: [443],
    vulnerabilities: [],
    lastScan: "2 minutes ago"
  },
  {
    id: "8",
    name: "HP-Printer",
    ip: "192.168.1.50",
    mac: "55:66:77:88:99:AA",
    manufacturer: "HP",
    deviceType: "Printer",
    riskScore: 70,
    riskLevel: "high",
    openPorts: [21, 80, 443, 9100],
    vulnerabilities: [
      "FTP service enabled",
      "No authentication required"
    ],
    lastScan: "2 minutes ago"
  }
];

export const getSecurityStats = (devices: Device[]) => {
  const totalDevices = devices.length;
  const secureDevices = devices.filter(d => d.riskLevel === 'secure' || d.riskLevel === 'low').length;
  const vulnerableDevices = devices.filter(d => d.riskLevel === 'medium' || d.riskLevel === 'high').length;
  const criticalDevices = devices.filter(d => d.riskLevel === 'critical').length;
  const averageRiskScore = Math.round(devices.reduce((sum, d) => sum + d.riskScore, 0) / totalDevices);

  return {
    totalDevices,
    secureDevices,
    vulnerableDevices,
    criticalDevices,
    averageRiskScore
  };
};

export const getRiskDistribution = (devices: Device[]) => {
  const riskLevels = ['critical', 'high', 'medium', 'low', 'secure'];
  const colors = {
    critical: 'hsl(var(--critical))',
    high: 'hsl(var(--high))',
    medium: 'hsl(var(--medium))',
    low: 'hsl(var(--low))',
    secure: 'hsl(var(--secure))'
  };

  return riskLevels.map(level => ({
    level,
    count: devices.filter(d => d.riskLevel === level).length,
    color: colors[level as keyof typeof colors]
  }));
};