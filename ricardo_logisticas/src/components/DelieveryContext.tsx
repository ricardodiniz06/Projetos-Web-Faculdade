import { createContext, useContext, useState, ReactNode } from 'react';
import { Delivery } from '../types';

interface DeliveryContextType {
  deliveries: Delivery[];
  setDeliveries: React.Dispatch<React.SetStateAction<Delivery[]>>;
  activeTimerId: number | null; 
  setActiveTimerId: React.Dispatch<React.SetStateAction<number | null>>;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(() => {
    const saved = localStorage.getItem('deliveries');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTimerId, setActiveTimerId] = useState<number | null>(null);

  return (
    <DeliveryContext.Provider value={{ deliveries, setDeliveries, activeTimerId, setActiveTimerId }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => {
  const context = useContext(DeliveryContext);
  if (!context) throw new Error('useDelivery must be used within a DeliveryProvider');
  return context;
};