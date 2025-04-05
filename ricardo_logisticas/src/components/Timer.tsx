import { useState, useEffect } from 'react';
import { Button, Text, Card, Title, NumberInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Delivery } from '../types';
import { useDelivery } from './DelieveryContext';


interface TimerProps {
  delivery: Delivery;
}

const Timer = ({ delivery }: TimerProps) => {
  const { deliveries, setDeliveries, activeTimerId, setActiveTimerId } = useDelivery();
  const [timeLeft, setTimeLeft] = useState(delivery.timerDuration || 300);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState<number | ''>('');

  const isActive = activeTimerId === delivery.id;

  useEffect(() => {
    if (isActive) {
      if (isRunning && timeLeft > 0) {
        setDeliveries(deliveries.map(d =>
          d.id === delivery.id && d.status !== 'Entregue' ? { ...d, status: 'Em Progresso' } : d
        ));
      } else if (!isRunning && timeLeft > 0) {
        setDeliveries(deliveries.map(d =>
          d.id === delivery.id && d.status !== 'Entregue' ? { ...d, status: 'Em Progresso' } : d
        ));
      } else if (timeLeft === 0 && isRunning) {
        notifications.show({
          title: 'Tempo Esgotado',
          message: `O prazo para "${delivery.description}" terminou!`,
          color: 'green',
          autoClose: 5000,
          style: { backgroundColor: '#1A202C', color: '#E2E8F0', border: '1px solid #4A5568' },
        });
        setDeliveries(deliveries.map(d =>
          d.id === delivery.id ? { ...d, status: 'Entregue' } : d
        ));
        setIsRunning(false);
        setActiveTimerId(null);
      }
    }
  }, [isActive, isRunning, timeLeft, delivery.id, delivery.description, deliveries, setDeliveries, setActiveTimerId]);

  useEffect(() => {
    let interval: number;
    if (isActive && isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isRunning, timeLeft]);

  const startTimer = () => {
    if (customTime && customTime > 0) {
      setTimeLeft(customTime);
      setDeliveries(deliveries.map(d =>
        d.id === delivery.id ? { ...d, timerDuration: customTime } : d
      ));
      setCustomTime('');
    }
    setActiveTimerId(delivery.id);
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTimeLeft(delivery.timerDuration || 300);
    setIsRunning(false);
    setActiveTimerId(null);
  };

  return (
    <Card>
      <Title order={3} mb="md" c="gold.4">Timer: {delivery.description}</Title>
      <Text size="lg" c="gray.2">Tempo restante: {timeLeft} segundos</Text>
      <NumberInput
        label="Definir tempo (segundos)"
        value={customTime}
        onChange={(value) => {
          if (value === undefined || value === '') {
            setCustomTime('');
          } else {
            setCustomTime(typeof value === 'string' ? Number(value) : value);
          }
        }}
        min={1}
        placeholder="Ex: 600"
        mt="md"
        disabled={isRunning}
      />
      <Button.Group mt="md">
        <Button
          onClick={startTimer}
          color="indigo"
          disabled={isRunning || (isActive && timeLeft <= 0)}
        >
          {isActive && isRunning ? 'Iniciado' : 'Iniciar'}
        </Button>
        <Button onClick={pauseTimer} color="yellow" disabled={!isRunning}>
          Pausar
        </Button>
        <Button onClick={resetTimer} color="red" disabled={!isActive}>
          Resetar
        </Button>
      </Button.Group>
    </Card>
  );
};

export default Timer;