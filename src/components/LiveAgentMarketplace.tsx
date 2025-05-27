
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, Zap, Users, TrendingUp } from 'lucide-react';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { useAgentInteractions } from '@/hooks/useAgentInteractions';

const agents = [
  {
    id: 'soilsense',
    name: "SoilSense Pro",
    type: "Sensor Agent",
    description: "High-precision soil monitoring with real-time analytics",
    price: 0.05,
    reputation: 4.8,
    status: "active" as const,
    icon: "SS",
    bgColor: "bg-green-500",
    services: ["Soil moisture monitoring", "Nutrient analysis", "pH tracking"]
  },
  {
    id: 'weatherwise',
    name: "WeatherWise AI",
    type: "Prediction Agent", 
    description: "Advanced weather forecasting and crop yield predictions",
    price: 0.12,
    reputation: 4.9,
    status: "active" as const,
    icon: "WW",
    bgColor: "bg-blue-500",
    services: ["Weather forecasting", "Yield prediction", "Climate analysis"]
  },
  {
    id: 'resourcerouter',
    name: "ResourceRouter",
    type: "Allocation Agent",
    description: "Optimal irrigation and fertilizer distribution planning",
    price: 0.08,
    reputation: 4.7,
    status: "active" as const,
    icon: "RR",
    bgColor: "bg-purple-500",
    services: ["Irrigation scheduling", "Resource optimization", "Equipment routing"]
  },
  {
    id: 'marketmind',
    name: "MarketMind",
    type: "Market Agent",
    description: "Real-time crop pricing and optimal selling strategies",
    price: 0.15,
    reputation: 4.6,
    status: "active" as const,
    icon: "MM",
    bgColor: "bg-orange-500",
    services: ["Price analysis", "Market trends", "Selling strategies"]
  }
];

const LiveAgentMarketplace = () => {
  const { activeTransactions, isConnected } = useRealTimeData();
  const { contracts, isNegotiating, hireAgent } = useAgentInteractions();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleHireAgent = async (agent: typeof agents[0], service: string) => {
    await hireAgent(agent, service, 30); // 30 second duration for demo
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Live Agent Network
              {isConnected && (
                <div className="flex items-center gap-2 ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              )}
            </CardTitle>
            <CardDescription>
              Real-time AI agents providing specialized farming services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
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
                        <Badge variant="outline" className="text-xs">
                          ⭐ {agent.reputation}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {agent.services.map((service, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">${agent.price}</div>
                    <div className="text-sm text-gray-500 mb-2">per service</div>
                    <div className="space-y-1">
                      {agent.services.slice(0, 2).map((service, idx) => (
                        <Button 
                          key={idx}
                          size="sm" 
                          className="w-full text-xs"
                          onClick={() => handleHireAgent(agent, service)}
                          disabled={isNegotiating}
                        >
                          {isNegotiating ? 'Negotiating...' : `Hire for ${service.split(' ')[0]}`}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Live Transactions
            </CardTitle>
            <CardDescription>
              Real-time agent-to-agent service exchanges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-64 overflow-y-auto">
            {activeTransactions.slice(0, 8).map((tx, index) => (
              <div key={tx.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{tx.service}</div>
                    <div className="text-xs text-gray-500">{tx.fromAgent} → {tx.toAgent}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          tx.status === 'completed' ? 'bg-green-50 text-green-700' :
                          tx.status === 'executing' ? 'bg-blue-50 text-blue-700' :
                          'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">${tx.amount.toFixed(3)}</div>
                    <div className="text-xs text-gray-400">
                      {Math.floor((Date.now() - tx.timestamp.getTime()) / 1000)}s ago
                    </div>
                  </div>
                </div>
                {index < activeTransactions.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              Active Contracts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contracts.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No active contracts</p>
            ) : (
              contracts.slice(0, 3).map((contract) => (
                <div key={contract.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{contract.service}</div>
                      <div className="text-xs text-gray-500">{contract.agentId}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">
                        ${contract.price.toFixed(3)}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          contract.status === 'completed' ? 'bg-green-50 text-green-700' :
                          contract.status === 'active' ? 'bg-blue-50 text-blue-700' :
                          'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {contract.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Network Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Agent Utilization</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Transaction Success Rate</span>
                <span>98.7%</span>
              </div>
              <Progress value={98.7} className="h-2" />
            </div>
            <div className="text-center pt-2">
              <div className="text-2xl font-bold text-green-600">
                {activeTransactions.filter(tx => tx.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-500">Completed Today</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveAgentMarketplace;
