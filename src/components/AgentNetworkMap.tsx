
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Network, Cpu, Database, Zap, Users, Activity } from 'lucide-react';

const AgentNetworkMap = () => {
  const [networkNodes] = useState([
    { id: 1, name: 'SensorHub Alpha', type: 'IoT Gateway', x: 20, y: 30, status: 'active', connections: 8 },
    { id: 2, name: 'WeatherWise AI', type: 'Prediction Agent', x: 60, y: 15, status: 'active', connections: 12 },
    { id: 3, name: 'ResourceRouter', type: 'Allocation Agent', x: 80, y: 50, status: 'active', connections: 15 },
    { id: 4, name: 'MarketMind', type: 'Market Agent', x: 40, y: 70, status: 'active', connections: 9 },
    { id: 5, name: 'SoilSense Pro', type: 'Sensor Agent', x: 15, y: 80, status: 'active', connections: 6 },
    { id: 6, name: 'CropTracker', type: 'Monitoring Agent', x: 70, y: 20, status: 'active', connections: 11 },
    { id: 7, name: 'IrrigationBot', type: 'Control Agent', x: 30, y: 50, status: 'negotiating', connections: 7 },
    { id: 8, name: 'PestDetector AI', type: 'Detection Agent', x: 85, y: 80, status: 'active', connections: 5 }
  ]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [connectionPaths, setConnectionPaths] = useState([]);

  const [networkStats] = useState({
    totalAgents: 24,
    activeConnections: 89,
    dataTransfers: 1247,
    avgLatency: 45,
    networkUptime: 99.7,
    throughput: 2.4
  });

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'IoT Gateway': return '#3b82f6';
      case 'Prediction Agent': return '#10b981';
      case 'Allocation Agent': return '#8b5cf6';
      case 'Market Agent': return '#f59e0b';
      case 'Sensor Agent': return '#06b6d4';
      case 'Monitoring Agent': return '#ef4444';
      case 'Control Agent': return '#84cc16';
      case 'Detection Agent': return '#f97316';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiating': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    // Generate connection paths between nodes
    const paths = [];
    for (let i = 0; i < networkNodes.length; i++) {
      for (let j = i + 1; j < networkNodes.length; j++) {
        if (Math.random() > 0.7) { // Random connections for demo
          paths.push({
            from: networkNodes[i],
            to: networkNodes[j],
            strength: Math.random()
          });
        }
      }
    }
    setConnectionPaths(paths);
  }, [networkNodes]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-500" />
                Agent Network Topology
              </CardTitle>
              <CardDescription>Real-time visualization of agent connections and data flows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  {connectionPaths.map((path, index) => (
                    <line
                      key={index}
                      x1={`${path.from.x}%`}
                      y1={`${path.from.y}%`}
                      x2={`${path.to.x}%`}
                      y2={`${path.to.y}%`}
                      stroke="#94a3b8"
                      strokeWidth={Math.max(1, path.strength * 3)}
                      strokeOpacity={0.4}
                      className="animate-pulse"
                    />
                  ))}
                </svg>

                {/* Network Nodes */}
                {networkNodes.map((node) => (
                  <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ 
                      left: `${node.x}%`, 
                      top: `${node.y}%`,
                      zIndex: 2
                    }}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform"
                      style={{ backgroundColor: getNodeColor(node.type) }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                        {node.name}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Data Flow Animation */}
                <div className="absolute inset-0" style={{ zIndex: 0 }}>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
                  <span>IoT Gateway</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                  <span>Prediction</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8b5cf6' }}></div>
                  <span>Allocation</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
                  <span>Market</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Node Details & Network Stats */}
        <div className="space-y-6">
          {selectedNode ? (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">{selectedNode.name}</CardTitle>
                <CardDescription>{selectedNode.type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant="outline" className={getStatusColor(selectedNode.status)}>
                    {selectedNode.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Connections</span>
                  <span className="font-medium">{selectedNode.connections}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Recent Activity</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>• Data exchange with 3 agents</div>
                    <div>• Contract negotiated: $0.12</div>
                    <div>• Service request completed</div>
                  </div>
                </div>
                <Button size="sm" className="w-full" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Node Information</CardTitle>
                <CardDescription>Click on a node to view details</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Network className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Select an agent node on the network map to see detailed information and connection data.</p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-500" />
                Network Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{networkStats.totalAgents}</div>
                  <div className="text-xs text-blue-700">Total Agents</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">{networkStats.activeConnections}</div>
                  <div className="text-xs text-green-700">Active Links</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">{networkStats.dataTransfers}</div>
                  <div className="text-xs text-purple-700">Data Transfers</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">{networkStats.avgLatency}ms</div>
                  <div className="text-xs text-yellow-700">Avg Latency</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Network Uptime</span>
                    <span className="font-medium">{networkStats.networkUptime}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${networkStats.networkUptime}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Throughput</span>
                    <span className="font-medium">{networkStats.throughput} MB/s</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(networkStats.throughput / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Agent Types Overview */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-500" />
            Agent Categories
          </CardTitle>
          <CardDescription>Overview of different agent types in the AgriChain network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-6 h-6 text-blue-500" />
                <h3 className="font-medium">Sensor Agents</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Collect and monetize IoT sensor data</p>
              <div className="text-xs text-gray-500">6 active • $0.03-0.08 per service</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Cpu className="w-6 h-6 text-green-500" />
                <h3 className="font-medium">Prediction Agents</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">AI forecasting and analysis services</p>
              <div className="text-xs text-gray-500">4 active • $0.10-0.25 per service</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-purple-500" />
                <h3 className="font-medium">Allocation Agents</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Resource optimization and distribution</p>
              <div className="text-xs text-gray-500">8 active • $0.05-0.15 per service</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-6 h-6 text-orange-500" />
                <h3 className="font-medium">Market Agents</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Price tracking and trading strategies</p>
              <div className="text-xs text-gray-500">6 active • $0.12-0.30 per service</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentNetworkMap;
