
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Shield, Zap, Clock } from 'lucide-react';

const SmartContractPanel = () => {
  const [activeContracts] = useState([
    {
      id: 'SC001',
      type: 'Service Agreement',
      parties: ['WeatherWise AI', 'Farm Alpha'],
      service: '7-day weather forecasting',
      value: 0.12,
      status: 'active',
      duration: '30 days',
      autoRenew: true,
      reputation: 4.9
    },
    {
      id: 'SC002', 
      type: 'Data Purchase',
      parties: ['SoilSense Pro', 'ResourceRouter'],
      service: 'Soil moisture data stream',
      value: 0.05,
      status: 'executing',
      duration: '1 day',
      autoRenew: false,
      reputation: 4.8
    },
    {
      id: 'SC003',
      type: 'Equipment Sharing',
      parties: ['Farm Beta', 'Farm Gamma'],
      service: 'Harvester rental',
      value: 50.0,
      status: 'pending',
      duration: '4 hours',
      autoRenew: false,
      reputation: 4.7
    },
    {
      id: 'SC004',
      type: 'Resource Allocation',
      parties: ['IrrigationBot', 'North Field Sensors'],
      service: 'Automated irrigation control',
      value: 0.08,
      status: 'active',
      duration: '90 days',
      autoRenew: true,
      reputation: 4.9
    }
  ]);

  const [contractTemplates] = useState([
    {
      name: 'Data Sharing Agreement',
      description: 'Standard template for IoT sensor data sales',
      usage: 156,
      category: 'Data Exchange'
    },
    {
      name: 'Prediction Service Contract',
      description: 'AI forecasting and analysis services',
      usage: 89,
      category: 'AI Services'
    },
    {
      name: 'Equipment Rental Agreement',
      description: 'Machinery and tool sharing contracts',
      usage: 67,
      category: 'Resource Sharing'
    },
    {
      name: 'Resource Allocation Protocol',
      description: 'Automated resource distribution contracts',
      usage: 134,
      category: 'Automation'
    }
  ]);

  const [reputationData] = useState([
    { agent: 'WeatherWise AI', score: 4.9, contracts: 234, success: 98.5 },
    { agent: 'SoilSense Pro', score: 4.8, contracts: 189, success: 97.2 },
    { agent: 'ResourceRouter', score: 4.7, contracts: 156, success: 96.8 },
    { agent: 'MarketMind', score: 4.6, contracts: 98, success: 95.4 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'executing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReputationColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="contracts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="contracts">Active Contracts</TabsTrigger>
          <TabsTrigger value="templates">Contract Templates</TabsTrigger>
          <TabsTrigger value="reputation">Reputation System</TabsTrigger>
          <TabsTrigger value="escrow">Payment Escrow</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Active Smart Contracts
                  </CardTitle>
                  <CardDescription>Currently executing agreements on the AgriChain network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeContracts.map((contract) => (
                    <div key={contract.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{contract.type}</h3>
                          <Badge variant="outline" className={getStatusColor(contract.status)}>
                            {contract.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">
                            ${contract.value}
                          </div>
                          <div className="text-xs text-gray-500">Contract Value</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Service:</span>
                          <span className="font-medium ml-2">{contract.service}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <span className="font-medium ml-2">{contract.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {contract.parties[0]} ↔ {contract.parties[1]}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Rep:</span>
                          <span className={`font-medium ${getReputationColor(contract.reputation)}`}>
                            ⭐ {contract.reputation}
                          </span>
                          {contract.autoRenew && (
                            <Badge variant="outline" className="text-xs">Auto-renew</Badge>
                          )}
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
                  <CardTitle>Contract Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Execution Success Rate</span>
                      <span>97.8%</span>
                    </div>
                    <Progress value={97.8} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Total Contracts</span>
                      <span>1,247</span>
                    </div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Average Value</span>
                      <span>$12.50</span>
                    </div>
                    <div className="text-xs text-gray-500">Per contract</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Security Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Zero-knowledge proofs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Multi-signature escrow</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Reputation verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Automated dispute resolution</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Smart Contract Templates</CardTitle>
              <CardDescription>Pre-built contract templates for common AgriChain transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contractTemplates.map((template, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Used {template.usage} times</span>
                      <Button size="sm" variant="outline">Use Template</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reputation" className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Agent Reputation System</CardTitle>
              <CardDescription>Verifiable credentials and performance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reputationData.map((agent, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{agent.agent}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${getReputationColor(agent.score)}`}>
                          ⭐ {agent.score}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Contracts:</span>
                        <span className="font-medium ml-2">{agent.contracts}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Success Rate:</span>
                        <span className="font-medium ml-2 text-green-600">{agent.success}%</span>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" variant="outline">View Profile</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escrow" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Payment Escrow Status
                </CardTitle>
                <CardDescription>Secure payment management for ongoing contracts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-green-900">Active Escrows</h4>
                      <p className="text-sm text-green-700">$156.30 locked in 12 contracts</p>
                    </div>
                    <div className="text-2xl font-bold text-green-600">12</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Pending Releases</h4>
                      <p className="text-sm text-blue-700">Awaiting completion verification</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">3</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Total Released</h4>
                      <p className="text-sm text-gray-700">Successfully completed this month</p>
                    </div>
                    <div className="text-2xl font-bold text-gray-600">$2,847</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Latest escrow releases and payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Weather data purchase</div>
                    <div className="text-xs text-gray-500">Released to WeatherWise AI</div>
                  </div>
                  <div className="text-green-600 font-medium">+$0.12</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Soil sensor data stream</div>
                    <div className="text-xs text-gray-500">Released to SoilSense Pro</div>
                  </div>
                  <div className="text-green-600 font-medium">+$0.05</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Equipment rental deposit</div>
                    <div className="text-xs text-gray-500">Locked for Farm Beta</div>
                  </div>
                  <div className="text-yellow-600 font-medium">-$50.00</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Irrigation optimization</div>
                    <div className="text-xs text-gray-500">Released to ResourceRouter</div>
                  </div>
                  <div className="text-green-600 font-medium">+$0.08</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartContractPanel;
