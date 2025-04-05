import { Card, Stack, Text, Title } from '@mantine/core';
import { Delivery } from '../types';

interface DeliverySummaryProps {
  deliveries: Delivery[];
}

const DeliverySummary = ({ deliveries }: DeliverySummaryProps) => {
  const totalDeliveries = deliveries.length;
  const pendingDeliveries = deliveries.filter(d => d.status === 'Pendente').length;
  const inProgressDeliveries = deliveries.filter(d => d.status === 'Em Progresso').length;
  const deliveredDeliveries = deliveries.filter(d => d.status === 'Entregue').length;

  return (
    <Card>
      <Title order={4} c="gold.4">Resumo das Entregas</Title>
      <Stack gap="xs" mt="sm">
        <Text c="gray.2">Total de Entregas: <strong>{totalDeliveries}</strong></Text>
        <Text c="gray.2">Entregas Pendentes: <strong>{pendingDeliveries}</strong></Text>
        <Text c="gray.2">Entregas em Progresso: <strong>{inProgressDeliveries}</strong></Text>
        <Text c="gray.2">Entregas Concluídas: <strong>{deliveredDeliveries}</strong></Text>
      </Stack>
    </Card>
  );
};

export default DeliverySummary;