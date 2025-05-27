
import { useState, useEffect } from 'react';

interface SensorReading {
  id: string;
  type: 'temperature' | 'humidity' | 'soilMoisture' | 'lightIntensity' | 'ph' | 'nitrogen' | 'phosphorus' | 'potassium';
  value: number;
  timestamp: Date;
  location: string;
  agentId: string;
}

interface AgentTransaction {
  id: string;
  fromAgent: string;
  toAgent: string;
  service: string;
  amount: number;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  timestamp: Date;
}

export const useRealTimeData = () => {
  const [sensorReadings, setSensorReadings] = useState<SensorReading[]>([]);
  const [activeTransactions, setActiveTransactions] = useState<AgentTransaction[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Simulate real-time sensor data
  useEffect(() => {
    setIsConnected(true);
    
    const generateSensorReading = (): SensorReading => {
      const sensors = [
        { id: 'SOIL_001', type: 'soilMoisture' as const, location: 'North Field', agentId: 'SoilSense Pro' },
        { id: 'TEMP_002', type: 'temperature' as const, location: 'Greenhouse A', agentId: 'WeatherWise AI' },
        { id: 'HUM_003', type: 'humidity' as const, location: 'South Field', agentId: 'SoilSense Pro' },
        { id: 'LIGHT_004', type: 'lightIntensity' as const, location: 'West Field', agentId: 'WeatherWise AI' }
      ];

      const sensor = sensors[Math.floor(Math.random() * sensors.length)];
      let value: number;

      switch (sensor.type) {
        case 'temperature':
          value = 20 + Math.sin(Date.now() / 3600000) * 8 + (Math.random() - 0.5) * 4;
          break;
        case 'humidity':
          value = 60 + Math.cos(Date.now() / 3600000) * 15 + (Math.random() - 0.5) * 10;
          break;
        case 'soilMoisture':
          value = 45 + Math.sin(Date.now() / 7200000) * 15 + (Math.random() - 0.5) * 8;
          break;
        case 'lightIntensity':
          const hour = new Date().getHours();
          value = hour < 6 || hour > 19 ? Math.random() * 10 : 60 + Math.sin((hour - 12) * 0.5) * 30 + Math.random() * 15;
          break;
        default:
          value = Math.random() * 100;
      }

      return {
        id: `${sensor.id}_${Date.now()}`,
        type: sensor.type,
        value: Math.max(0, Math.min(100, value)),
        timestamp: new Date(),
        location: sensor.location,
        agentId: sensor.agentId
      };
    };

    const generateTransaction = (): AgentTransaction => {
      const services = [
        'Weather forecast', 'Soil analysis', 'Pest detection', 'Irrigation control',
        'Market analysis', 'Yield prediction', 'Equipment sharing', 'Resource optimization'
      ];
      
      const agents = ['SoilSense Pro', 'WeatherWise AI', 'ResourceRouter', 'MarketMind', 'FarmBot Alpha'];
      
      return {
        id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        fromAgent: agents[Math.floor(Math.random() * agents.length)],
        toAgent: agents[Math.floor(Math.random() * agents.length)],
        service: services[Math.floor(Math.random() * services.length)],
        amount: Math.random() * 0.5 + 0.05,
        status: Math.random() > 0.7 ? 'pending' : 'executing',
        timestamp: new Date()
      };
    };

    // Generate initial data
    const initialReadings = Array.from({ length: 10 }, generateSensorReading);
    setSensorReadings(initialReadings);

    const initialTransactions = Array.from({ length: 5 }, generateTransaction);
    setActiveTransactions(initialTransactions);

    // Real-time updates
    const sensorInterval = setInterval(() => {
      const newReading = generateSensorReading();
      setSensorReadings(prev => [newReading, ...prev].slice(0, 50));
    }, 2000 + Math.random() * 3000);

    const transactionInterval = setInterval(() => {
      const newTransaction = generateTransaction();
      setActiveTransactions(prev => [newTransaction, ...prev].slice(0, 20));
    }, 5000 + Math.random() * 10000);

    // Update transaction statuses
    const statusInterval = setInterval(() => {
      setActiveTransactions(prev => prev.map(tx => {
        if (tx.status === 'pending' && Math.random() > 0.7) {
          return { ...tx, status: 'executing' };
        }
        if (tx.status === 'executing' && Math.random() > 0.8) {
          return { ...tx, status: 'completed' };
        }
        return tx;
      }));
    }, 3000);

    return () => {
      clearInterval(sensorInterval);
      clearInterval(transactionInterval);
      clearInterval(statusInterval);
      setIsConnected(false);
    };
  }, []);

  return {
    sensorReadings,
    activeTransactions,
    isConnected
  };
};
