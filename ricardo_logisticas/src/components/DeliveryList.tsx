import { useState, useEffect, useMemo } from 'react';
import { TextInput, Button, Stack, Table, Badge, Title, Card, Modal, Group, ActionIcon, MantineStyleProp, Flex } from '@mantine/core';
import { IconEdit, IconTrash, IconClock } from '@tabler/icons-react';
import { Delivery } from '../types';
import CepSearch from './CepSearch';
import DeliverySummary from './DeliverySummary';
import { useDelivery } from './DelieveryContext';


const tableStyle: MantineStyleProp = {
  backgroundColor: '#2D3748',
  borderRadius: '8px',
  overflow: 'hidden',
};

const DeliveryList = () => {
  const { deliveries, setDeliveries, setActiveTimerId } = useDelivery();
  const [filter, setFilter] = useState('');
  const [newDeliveryManual, setNewDeliveryManual] = useState('');
  const [editDelivery, setEditDelivery] = useState<Delivery | null>(null);
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    localStorage.setItem('deliveries', JSON.stringify(deliveries));
  }, [deliveries]);

  const filteredDeliveries = useMemo(() => {
    return deliveries.filter(d => d.description.toLowerCase().includes(filter.toLowerCase()));
  }, [deliveries, filter]);

  const addDeliveryManually = () => {
    if (newDeliveryManual) {
      setDeliveries([...deliveries, { id: Date.now(), description: newDeliveryManual, status: 'Pendente', deadline: new Date() }]);
      setNewDeliveryManual('');
    }
  };

  const handleAddDelivery = (delivery: Delivery) => {
    setDeliveries([...deliveries, delivery]);
  };

  const removeDelivery = (id: number) => {
    setDeliveries(deliveries.filter(d => d.id !== id));
  };

  const openEditModal = (delivery: Delivery) => {
    setEditDelivery(delivery);
    setEditDescription(delivery.description);
  };

  const saveEdit = () => {
    if (editDelivery) {
      setDeliveries(deliveries.map(d =>
        d.id === editDelivery.id ? { ...d, description: editDescription } : d
      ));
      setEditDelivery(null);
    }
  };

  const startTimerForDelivery = (id: number) => {
    setActiveTimerId(id);
  };

  return (
    <Card>
      <Title order={3} mb="md" c="gold.4">Lista de Entregas</Title>
      <Stack>
        <CepSearch onAddDelivery={handleAddDelivery} />
        <TextInput
          placeholder="Adicionar entrega manualmente"
          value={newDeliveryManual}
          onChange={(e) => setNewDeliveryManual(e.target.value)}
          label="Nova Entrega"
        />
        <Button onClick={addDeliveryManually} color="indigo">Adicionar Manualmente</Button>
        <TextInput
          placeholder="Filtrar entregas"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filtro"
        />
        <Flex miw='100%'>
        <Table style={tableStyle} highlightOnHover>
          <Table.Thead style={{ backgroundColor: '#1A202C' }}>
            <Table.Tr>
              <Table.Th w={150} style={{ color: '#E2E8F0' }}>ID</Table.Th>
              <Table.Th w={150} style={{ color: '#E2E8F0' }}>Descrição</Table.Th>
              <Table.Th w={150} style={{ color: '#E2E8F0' }}>Status</Table.Th>
              <Table.Th w={150} style={{ color: '#E2E8F0' }}>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody >
            {filteredDeliveries.map(delivery => (
              <Table.Tr key={delivery.id} style={{ color: '#CBD5E0' }}>
                <Table.Td w={150}>{delivery.id}</Table.Td>
                <Table.Td w={150}>{delivery.description}</Table.Td>
                <Table.Td w={150}>
                  <Badge
                    color={delivery.status === 'Pendente' ? 'yellow' : delivery.status === 'Em Progresso' ? 'indigo' : 'green'}
                    variant="light"
                  >
                    {delivery.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon color="indigo" onClick={() => openEditModal(delivery)}>
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon color="red" onClick={() => removeDelivery(delivery.id)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="green"
                      onClick={() => startTimerForDelivery(delivery.id)}
                      disabled={delivery.status === 'Entregue'}
                    >
                      <IconClock size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        </Flex>
        <DeliverySummary deliveries={deliveries} />
      </Stack>

      <Modal
        opened={!!editDelivery}
        onClose={() => setEditDelivery(null)}
        title="Editar Entrega"
        overlayProps={{ color: 'rgba(0, 0, 0, 0.5)', blur: 3 }}
      >
        <TextInput
          label="Descrição"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
        <Button onClick={saveEdit} color="indigo" mt="md">Salvar</Button>
      </Modal>
    </Card>
  );
};

export default DeliveryList;