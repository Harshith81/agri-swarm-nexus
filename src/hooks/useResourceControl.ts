
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface IrrigationZone {
  id: string;
  name: string;
  status: 'idle' | 'scheduled' | 'active' | 'completed';
  scheduledTime: Date;
  duration: number;
  waterAmount: number;
  soilMoisture: number;
}

interface ResourceOptimization {
  id: string;
  type: 'water' | 'fertilizer' | 'equipment';
  recommendation: string;
  impact: string;
  savings: number;
  implemented: boolean;
}

export const useResourceControl = () => {
  const [irrigationZones, setIrrigationZones] = useState<IrrigationZone[]>([
    {
      id: 'north_field',
      name: 'North Field',
      status: 'scheduled',
      scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      duration: 45,
      waterAmount: 250,
      soilMoisture: 38
    },
    {
      id: 'south_field',
      name: 'South Field',
      status: 'active',
      scheduledTime: new Date(),
      duration: 60,
      waterAmount: 320,
      soilMoisture: 42
    },
    {
      id: 'greenhouse_a',
      name: 'Greenhouse A',
      status: 'idle',
      scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
      duration: 30,
      waterAmount: 150,
      soilMoisture: 55
    }
  ]);

  const [optimizations, setOptimizations] = useState<ResourceOptimization[]>([
    {
      id: 'opt_1',
      type: 'water',
      recommendation: 'Reduce North Field irrigation by 15% based on soil moisture levels',
      impact: 'Save 37L water daily',
      savings: 2.5,
      implemented: false
    },
    {
      id: 'opt_2',
      type: 'fertilizer',
      recommendation: 'Delay fertilizer application by 2 days due to predicted rainfall',
      impact: 'Improve nutrient absorption',
      savings: 15,
      implemented: false
    }
  ]);

  const { toast } = useToast();

  const updateIrrigation = useCallback((zoneId: string, updates: Partial<IrrigationZone>) => {
    setIrrigationZones(prev => prev.map(zone => 
      zone.id === zoneId ? { ...zone, ...updates } : zone
    ));

    toast({
      title: "Irrigation Updated",
      description: `Irrigation schedule for ${updates.name || zoneId} has been modified`,
    });
  }, [toast]);

  const startIrrigation = useCallback((zoneId: string) => {
    const zone = irrigationZones.find(z => z.id === zoneId);
    if (!zone) return;

    updateIrrigation(zoneId, { 
      status: 'active', 
      scheduledTime: new Date() 
    });

    toast({
      title: "Irrigation Started",
      description: `${zone.name} irrigation system activated`,
    });

    // Simulate irrigation completion
    setTimeout(() => {
      updateIrrigation(zoneId, { status: 'completed' });
      toast({
        title: "Irrigation Completed",
        description: `${zone.name} irrigation cycle finished`,
      });

      // Reset to idle after a short delay
      setTimeout(() => {
        updateIrrigation(zoneId, { status: 'idle' });
      }, 5000);
    }, zone.duration * 100); // Accelerated for demo
  }, [irrigationZones, updateIrrigation, toast]);

  const implementOptimization = useCallback((optimizationId: string) => {
    setOptimizations(prev => prev.map(opt =>
      opt.id === optimizationId ? { ...opt, implemented: true } : opt
    ));

    const optimization = optimizations.find(opt => opt.id === optimizationId);
    if (optimization) {
      toast({
        title: "Optimization Applied",
        description: `${optimization.recommendation} - Estimated savings: $${optimization.savings}`,
      });
    }
  }, [optimizations, toast]);

  return {
    irrigationZones,
    optimizations,
    updateIrrigation,
    startIrrigation,
    implementOptimization
  };
};
