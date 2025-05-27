
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Database, Calendar, Users, Zap } from 'lucide-react';

const AgentMarketplace = () => {
  const [agents] = useState([
    {
      id: 1,
      name: "SoilSense Pro",
      type: "Sensor Agent",
      description: "High-precision soil moisture and nutrient monitoring",
      price: 0.05,
      reputation: 4.8,
      servicesProvided: 1247,
      status: "active",
      icon: "SS",
      bgColor: "bg-green-500"
    },
    {
      id: 2,
      name: "WeatherWise AI",
      type: "Prediction Agent", 
      description: "Advanced weather forecasting and crop yield predictions",
      price: 0.12,
      reputation: 4.9,
      servicesProvided: 892,
      status: "active",
      icon: "WW",
      bgColor: "bg-blue-500"
    },
    {
      id: 3,
      name: "ResourceRouter",
      type: "Allocation Agent",
      description: "Optimal irrigation and fertilizer distribution planning",
      price: 0.08,
      reputation: 4.7,
      servicesProvided: 634,
      status: "negotiating",
      icon: "RR",
      bgColor: "bg-purple-500"
    },
    {
      id: 4,
      name: "MarketMind",
      type: "Market Agent",
      description: "Real-time crop pricing and optimal selling strategies",
      price: 0.15,
      reputation: 4.6,
      servicesProvided: 523,
      status: "active",
      icon: "MM",
      bgColor: "bg-orange-500"
    }
  ]);

  const [recentTransactions] = useState([
    { id: 1, from: "FarmBot Alpha", to: "WeatherWise AI", amount: 0.12, service: "7-day forecast", time: "2 min ago" },
    { id: 2, from: "SoilSense Pro", to: "ResourceRouter", amount: 0.05, service: "Moisture data", time: "5 min ago" },
    { id: 3, from: "CropTracker", to: "MarketMind", amount: 0.15, service: "Price analysis", time: "8 min ago" },
    { id: 4, from: "IrrigationBot", to: "SoilSense Pro", amount: 0.03, service: "Sensor reading", time: "12 min ago" }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiating': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Available Agents */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Available Agents
            </CardTitle>
            <CardDescription>
              AI agents offering specialized farming services in the marketplace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className={`${agent.bgColor} text-white font-semibold`}>
                        {agent.icon}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                        <Badge variant="outline" className={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Reputation: ⭐ {agent.reputation}</span>
                        <span>Services: {agent.servicesProvided}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">${agent.price}</div>
                    <div className="text-sm text-gray-500">per service</div>
                    <Button size="sm" className="mt-2" variant={agent.status === 'active' ? 'default' : 'secondary'}>
                      {agent.status === 'active' ? 'Hire Agent' : 'Join Queue'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Transaction Feed & Network Stats */}
      <div className="space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Live Transactions
            </CardTitle>
            <CardDescription>
              Recent agent-to-agent service exchanges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map((tx, index) => (
              <div key={tx.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{tx.service}</div>
                    <div className="text-xs text-gray-500">{tx.from} → {tx.to}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">${tx.amount}</div>
                    <div className="text-xs text-gray-400">{tx.time}</div>
                  </div>
                </div>
                {index < recentTransactions.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-500" />
              Network Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Agent Utilization</span>
                <span>87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Network Throughput</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Data Quality Score</span>
                <span>96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <Separator />
            <div className="text-center pt-2">
              <div className="text-2xl font-bold text-green-600">98.7%</div>
              <div className="text-sm text-gray-500">Network Uptime</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentMarketplace;
