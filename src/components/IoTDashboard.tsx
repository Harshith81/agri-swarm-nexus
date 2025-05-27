
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import { Thermometer, Droplets, Zap, Wifi } from 'lucide-react';

const IoTDashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [currentReadings, setCurrentReadings] = useState({
    temperature: 24.5,
    humidity: 68,
    soilMoisture: 45,
    lightIntensity: 78,
    ph: 6.8,
    nitrogen: 42,
    phosphorus: 38,
    potassium: 55
  });

  const [connectedSensors] = useState([
    { id: 'SOIL_001', name: 'North Field Soil Sensor', status: 'active', battery: 87, lastUpdate: '30s ago', type: 'Soil Monitoring' },
    { id: 'TEMP_002', name: 'Greenhouse Climate Monitor', status: 'active', battery: 92, lastUpdate: '15s ago', type: 'Climate Control' },
    { id: 'PEST_003', name: 'Pest Detection Camera', status: 'active', battery: 76, lastUpdate: '1m ago', type: 'Pest Monitoring' },
    { id: 'IRRIG_004', name: 'Irrigation Flow Sensor', status: 'warning', battery: 34, lastUpdate: '45s ago', type: 'Water Management' },
    { id: 'LIGHT_005', name: 'Solar Radiation Meter', status: 'active', battery: 89, lastUpdate: '20s ago', type: 'Light Monitoring' }
  ]);

  // Generate realistic sensor data
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const data = [];
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        data.push({
          time: time.getHours() + ':00',
          temperature: 20 + Math.sin(i * 0.3) * 8 + Math.random() * 2,
          humidity: 60 + Math.cos(i * 0.2) * 15 + Math.random() * 5,
          soilMoisture: 40 + Math.sin(i * 0.1) * 10 + Math.random() * 3,
          lightIntensity: i < 6 || i > 18 ? Math.random() * 10 : 60 + Math.sin((i - 12) * 0.5) * 30 + Math.random() * 10
        });
      }
      
      setSensorData(data);
    };

    generateData();
    const interval = setInterval(generateData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 60) return 'text-green-600';
    if (battery > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Current Readings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{currentReadings.temperature}°C</div>
            <p className="text-xs text-blue-600">Optimal range: 20-28°C</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-700">{currentReadings.soilMoisture}%</div>
            <Progress value={currentReadings.soilMoisture} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Light Intensity</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">{currentReadings.lightIntensity}%</div>
            <p className="text-xs text-yellow-600">Peak: 95% at noon</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Soil pH</CardTitle>
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{currentReadings.ph}</div>
            <p className="text-xs text-green-600">Ideal: 6.0-7.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Environmental Trends (24h)</CardTitle>
            <CardDescription>Temperature and humidity monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} name="Temperature (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Soil & Light Conditions</CardTitle>
            <CardDescription>Moisture levels and light intensity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="soilMoisture" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Soil Moisture (%)" />
                <Area type="monotone" dataKey="lightIntensity" stackId="2" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Light Intensity (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Soil Nutrients */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Soil Nutrient Analysis</CardTitle>
          <CardDescription>NPK levels and recommendations from AI agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Nitrogen (N)</span>
                <span className="text-sm text-gray-600">{currentReadings.nitrogen}%</span>
              </div>
              <Progress value={currentReadings.nitrogen} className="h-3" />
              <p className="text-xs text-gray-500">Recommended: 40-60%</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Phosphorus (P)</span>
                <span className="text-sm text-gray-600">{currentReadings.phosphorus}%</span>
              </div>
              <Progress value={currentReadings.phosphorus} className="h-3" />
              <p className="text-xs text-gray-500">Recommended: 35-50%</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Potassium (K)</span>
                <span className="text-sm text-gray-600">{currentReadings.potassium}%</span>
              </div>
              <Progress value={currentReadings.potassium} className="h-3" />
              <p className="text-xs text-gray-500">Recommended: 45-65%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Sensors */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-blue-500" />
            Connected IoT Sensors
          </CardTitle>
          <CardDescription>Real-time status of field sensors and monitoring devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connectedSensors.map((sensor) => (
              <div key={sensor.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{sensor.name}</h3>
                    <p className="text-sm text-gray-500">{sensor.type} • ID: {sensor.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className={getStatusColor(sensor.status)}>
                    {sensor.status}
                  </Badge>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getBatteryColor(sensor.battery)}`}>
                      🔋 {sensor.battery}%
                    </div>
                    <div className="text-xs text-gray-400">{sensor.lastUpdate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IoTDashboard;
