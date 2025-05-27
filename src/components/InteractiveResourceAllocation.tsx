
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Settings, Droplets, Clock } from 'lucide-react';
import { useResourceControl } from '@/hooks/useResourceControl';

const InteractiveResourceAllocation = () => {
  const { 
    irrigationZones, 
    optimizations, 
    updateIrrigation, 
    startIrrigation, 
    implementOptimization 
  } = useResourceControl();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      default: return <Pause className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="irrigation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="irrigation">Smart Irrigation Control</TabsTrigger>
          <TabsTrigger value="optimization">AI Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Resource Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="irrigation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  Irrigation Zone Control
                </CardTitle>
                <CardDescription>Real-time irrigation management and scheduling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {irrigationZones.map((zone) => (
                  <div key={zone.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{zone.name}</h3>
                        <Badge variant="outline" className={getStatusColor(zone.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(zone.status)}
                            {zone.status}
                          </div>
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {zone.status === 'idle' && (
                          <Button 
                            size="sm" 
                            onClick={() => startIrrigation(zone.id)}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            Start Now
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-sm text-gray-500">Duration:</span>
                        <div className="font-medium">{zone.duration} min</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Water Amount:</span>
                        <div className="font-medium">{zone.waterAmount}L</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Soil Moisture</span>
                        <span>{zone.soilMoisture}%</span>
                      </div>
                      <Progress value={zone.soilMoisture} className="h-2" />
                    </div>

                    <div className="mt-3 space-y-2">
                      <label className="text-sm font-medium">Adjust Duration (minutes)</label>
                      <Slider
                        value={[zone.duration]}
                        onValueChange={([value]) => 
                          updateIrrigation(zone.id, { duration: value })
                        }
                        max={120}
                        min={15}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-xs text-gray-500">
                        Current: {zone.duration} minutes
                      </div>
                    </div>

                    {zone.status === 'scheduled' && (
                      <div className="mt-2 text-sm text-gray-600">
                        Scheduled: {zone.scheduledTime.toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Real-Time Monitoring</CardTitle>
                <CardDescription>Live sensor data from irrigation zones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {irrigationZones.map((zone) => (
                  <div key={`monitor-${zone.id}`} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{zone.name}</h4>
                      <div className={`w-3 h-3 rounded-full ${
                        zone.status === 'active' ? 'bg-green-500 animate-pulse' : 
                        zone.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Flow Rate:</span>
                        <div className="font-medium">
                          {zone.status === 'active' ? '5.2 L/min' : '0 L/min'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Pressure:</span>
                        <div className="font-medium">
                          {zone.status === 'active' ? '2.1 bar' : '0 bar'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Temperature:</span>
                        <div className="font-medium">24°C</div>
                      </div>
                      <div>
                        <span className="text-gray-500">pH Level:</span>
                        <div className="font-medium">6.8</div>
                      </div>
                    </div>

                    {zone.status === 'active' && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{Math.floor(Math.random() * 80 + 10)}%</span>
                        </div>
                        <Progress value={Math.floor(Math.random() * 80 + 10)} className="h-1" />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>AI-Powered Optimization Recommendations</CardTitle>
              <CardDescription>Smart suggestions to improve efficiency and reduce costs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {optimizations.map((opt) => (
                <div 
                  key={opt.id} 
                  className={`p-4 border rounded-lg ${
                    opt.implemented ? 'bg-green-50 border-green-200' : 'bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={
                          opt.type === 'water' ? 'bg-blue-50 text-blue-700' :
                          opt.type === 'fertilizer' ? 'bg-green-50 text-green-700' :
                          'bg-purple-50 text-purple-700'
                        }>
                          {opt.type}
                        </Badge>
                        {opt.implemented && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            ✓ Implemented
                          </Badge>
                        )}
                      </div>
                      
                      <h4 className="font-medium text-gray-900 mb-1">
                        {opt.recommendation}
                      </h4>
                      
                      <p className="text-sm text-gray-600 mb-2">{opt.impact}</p>
                      
                      <div className="text-sm">
                        <span className="text-gray-500">Estimated savings: </span>
                        <span className="font-semibold text-green-600">${opt.savings}</span>
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {!opt.implemented ? (
                        <Button 
                          size="sm"
                          onClick={() => implementOptimization(opt.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Apply Now
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Applied
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">New Recommendation Available</h4>
                <p className="text-sm text-blue-700 mb-2">
                  Weather agent predicts optimal conditions for pesticide application tomorrow at 6 AM
                </p>
                <Button size="sm" variant="outline" className="text-blue-700 border-blue-300">
                  Schedule Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Water Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">91%</div>
                <div className="text-sm text-gray-600 mb-2">+5% from last week</div>
                <Progress value={91} className="h-2" />
                <div className="text-xs text-gray-500 mt-2">Target: 95%</div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Cost Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">$127</div>
                <div className="text-sm text-gray-600 mb-2">This month</div>
                <div className="text-xs text-gray-500">
                  From optimization: $89<br/>
                  From scheduling: $38
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Automation Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
                <div className="text-sm text-gray-600 mb-2">of tasks automated</div>
                <Progress value={87} className="h-2" />
                <div className="text-xs text-gray-500 mt-2">Target: 90%</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveResourceAllocation;
