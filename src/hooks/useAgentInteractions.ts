
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Agent {
  id: string;
  name: string;
  type: string;
  price: number;
  reputation: number;
  status: 'active' | 'busy' | 'offline';
  services: string[];
}

interface Contract {
  id: string;
  agentId: string;
  service: string;
  duration: number;
  price: number;
  status: 'negotiating' | 'active' | 'completed';
  startTime: Date;
}

export const useAgentInteractions = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const { toast } = useToast();

  const hireAgent = useCallback(async (agent: Agent, service: string, duration: number) => {
    setIsNegotiating(true);
    
    // Simulate negotiation process
    toast({
      title: "Initiating Contract Negotiation",
      description: `Starting negotiation with ${agent.name} for ${service}`,
    });

    // Simulate network delay and negotiation
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    const success = Math.random() > 0.2; // 80% success rate

    if (success) {
      const newContract: Contract = {
        id: `contract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        agentId: agent.id,
        service,
        duration,
        price: agent.price * duration,
        status: 'active',
        startTime: new Date()
      };

      setContracts(prev => [...prev, newContract]);

      toast({
        title: "Contract Executed Successfully!",
        description: `${agent.name} is now providing ${service}. Contract value: $${newContract.price.toFixed(3)}`,
      });

      // Auto-complete contract after duration
      setTimeout(() => {
        setContracts(prev => prev.map(c => 
          c.id === newContract.id ? { ...c, status: 'completed' } : c
        ));
        
        toast({
          title: "Service Completed",
          description: `${agent.name} has completed ${service}`,
        });
      }, duration * 1000);

    } else {
      toast({
        title: "Negotiation Failed",
        description: `${agent.name} is currently unavailable or terms could not be agreed upon`,
        variant: "destructive",
      });
    }

    setIsNegotiating(false);
  }, [toast]);

  const cancelContract = useCallback((contractId: string) => {
    setContracts(prev => prev.filter(c => c.id !== contractId));
    toast({
      title: "Contract Cancelled",
      description: "The service contract has been terminated",
    });
  }, [toast]);

  return {
    contracts,
    isNegotiating,
    hireAgent,
    cancelContract
  };
};
