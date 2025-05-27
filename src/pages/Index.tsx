
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LiveAgentMarketplace from '@/components/LiveAgentMarketplace';
import IoTDashboard from '@/components/IoTDashboard';
import InteractiveResourceAllocation from '@/components/InteractiveResourceAllocation';
import SmartContractPanel from '@/components/SmartContractPanel';
import AgentNetworkMap from '@/components/AgentNetworkMap';
import { Database, Cpu, Network, Zap } from 'lucide-react';

const Index = () => {
  const [connectedAgents, setConnectedAgents] = useState(24);
  const [activeTransactions, setActiveTransactions] = useState(156);
  const [totalValueLocked, setTotalValueLocked] = useState(48.5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AgriChain</h1>
                <p className="text-sm text-gray-600">Decentralized AI Agent Network for Smart Farming</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Network Active
              </Badge>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                Connect Farm
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Agents</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{connectedAgents}</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeTransactions}</div>
              <p className="text-xs text-muted-foreground">+23% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">${totalValueLocked}K</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="marketplace">Agent Marketplace</TabsTrigger>
            <TabsTrigger value="iot">IoT Sensors</TabsTrigger>
            <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
            <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="network">Network Map</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            <LiveAgentMarketplace />
          </TabsContent>

          <TabsContent value="iot" className="space-y-6">
            <IoTDashboard />
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <InteractiveResourceAllocation />
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <SmartContractPanel />
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <AgentNetworkMap />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
