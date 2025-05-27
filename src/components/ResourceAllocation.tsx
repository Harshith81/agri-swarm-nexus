
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Droplets, Truck, Calendar, Users } from 'lucide-react';

const ResourceAllocation = () => {
  const [irrigationSchedule] = useState([
    { zone: 'North Field', time: '06:00', duration: 45, water: 250, status: 'scheduled' },
    { zone: 'South Field', time: '07:30', duration: 60, water: 320, status: 'active' },
    { zone: 'Greenhouse A', time: '09:00', duration: 30, water: 150, status: 'scheduled' },
    { zone: 'Greenhouse B', time: '14:00', duration: 35, water: 180, status: 'scheduled' },
    { zone: 'West Field', time: '18:00', duration: 50, water: 280, status: 'scheduled' }
  ]);

  const [equipmentSharing] = useState([
    { equipment: 'Harvester X200', owner: 'Farm A', borrower: 'Farm C', cost: 50, duration: '4 hours', status: 'active' },
    { equipment: 'Fertilizer Spreader', owner: 'Farm B', borrower: 'Farm A', cost: 30, duration: '2 hours', status: 'completed' },
    { equipment: 'Pest Sprayer Pro', owner: 'Farm C', borrower: 'Farm D', cost: 40, duration: '3 hours', status: 'pending' },
    { equipment: 'Soil Cultivator', owner: 'Farm D', borrower: 'Farm B', cost: 35, duration: '5 hours', status: 'scheduled' }
  ]);

  const waterUsageData = [
    { name: 'North Field', usage: 1200, optimal: 1000, savings: 200 },
    { name: 'South Field', usage: 1500, optimal: 1400, savings: 100 },
    { name: 'Greenhouse A', usage: 800, optimal: 750, savings: 50 },
    { name: 'Greenhouse B', usage: 900, optimal: 850, savings: 50 },
    { name: 'West Field', usage: 1100, optimal: 950, savings: 150 }
  ];

  const resourceDistribution = [
    { name: 'Water', value: 35, color: '#3b82f6' },
    { name: 'Fertilizer', value: 25, color: '#10b981' },
    { name: 'Seeds', value: 20, color: '#f59e0b' },
    { name: 'Equipment', value: 15, color: '#8b5cf6' },
    { name: 'Labor', value: 5, color: '#ef4444' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="irrigation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="irrigation">Smart Irrigation</TabsTrigger>
          <TabsTrigger value="equipment">Equipment Sharing</TabsTrigger>
          <TabsTrigger value="analytics">Resource Analytics</TabsTrigger>
          <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="irrigation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  Today's Irrigation Schedule
                </CardTitle>
                <CardDescription>AI-optimized watering schedule based on soil sensors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {irrigationSchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <h3 className="font-medium text-gray-900">{schedule.zone}</h3>
                        <p className="text-sm text-gray-500">{schedule.time} • {schedule.duration} min</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={getStatusColor(schedule.status)}>
                        {schedule.status}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1">{schedule.water}L</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Water Usage Optimization</CardTitle>
                <CardDescription>Current vs. AI-recommended water usage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={waterUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#3b82f6" name="Current Usage (L)" />
                    <Bar dataKey="optimal" fill="#10b981" name="AI Optimal (L)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-orange-500" />
                    Equipment Sharing Network
                  </CardTitle>
                  <CardDescription>Collaborative equipment usage between connected farms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {equipmentSharing.map((share, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{share.equipment}</h3>
                        <Badge variant="outline" className={getStatusColor(share.status)}>
                          {share.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Owner:</span>
                          <span className="font-medium ml-2">{share.owner}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Borrower:</span>
                          <span className="font-medium ml-2">{share.borrower}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <span className="font-medium ml-2">{share.duration}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Cost:</span>
                          <span className="font-medium ml-2 text-green-600">${share.cost}</span>
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
                  <CardTitle>Sharing Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Equipment Utilization</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cost Savings</span>
                      <span>$2,340</span>
                    </div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Active Agreements</span>
                      <span>12</span>
                    </div>
                    <div className="text-xs text-gray-500">Across network</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" variant="outline">Request Equipment</Button>
                  <Button className="w-full" variant="outline">Offer Equipment</Button>
                  <Button className="w-full" variant="outline">View Marketplace</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Resource Distribution</CardTitle>
                <CardDescription>How resources are allocated across your operation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={resourceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {resourceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Efficiency Metrics</CardTitle>
                <CardDescription>Performance indicators and optimization potential</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Water Efficiency</span>
                    <span className="text-2xl font-bold text-blue-600">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">13% improvement potential</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Equipment Utilization</span>
                    <span className="text-2xl font-bold text-green-600">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Excellent utilization rate</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Cost Optimization</span>
                    <span className="text-2xl font-bold text-purple-600">74%</span>
                  </div>
                  <Progress value={74} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">$1,200 monthly savings potential</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Smart suggestions from your agent network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <h4 className="font-medium text-blue-900">Irrigation Optimization</h4>
                  <p className="text-sm text-blue-700 mt-1">Reduce water usage by 15% in North Field by adjusting schedule to early morning hours.</p>
                  <Button size="sm" className="mt-2" variant="outline">Apply Recommendation</Button>
                </div>

                <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                  <h4 className="font-medium text-green-900">Equipment Sharing</h4>
                  <p className="text-sm text-green-700 mt-1">Share harvester with Farm B next week to earn $200 while equipment is idle.</p>
                  <Button size="sm" className="mt-2" variant="outline">Create Offer</Button>
                </div>

                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                  <h4 className="font-medium text-yellow-900">Fertilizer Timing</h4>
                  <p className="text-sm text-yellow-700 mt-1">Weather agent predicts rain in 48 hours - optimal time for fertilizer application.</p>
                  <Button size="sm" className="mt-2" variant="outline">Schedule Task</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Optimization Impact</CardTitle>
                <CardDescription>Projected improvements from AI recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">$3,450</div>
                  <div className="text-sm text-gray-600">Monthly Savings Potential</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="text-xl font-bold text-blue-600">18%</div>
                    <div className="text-xs text-gray-500">Water Reduction</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-xl font-bold text-purple-600">25%</div>
                    <div className="text-xs text-gray-500">Cost Savings</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-xl font-bold text-green-600">12%</div>
                    <div className="text-xs text-gray-500">Yield Increase</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-xl font-bold text-orange-600">30%</div>
                    <div className="text-xs text-gray-500">Efficiency Gain</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceAllocation;
