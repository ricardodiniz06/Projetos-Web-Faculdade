import { Flex, Grid, Card, Text, Title } from '@mantine/core';
import DeliveryList from '../components/DeliveryList';
import Timer from '../components/Timer';
import { useDelivery } from '../components/DelieveryContext';


const Home = () => {
  const { deliveries, activeTimerId } = useDelivery();
  const activeDelivery = deliveries.find(d => d.id === activeTimerId) || null;

  return (
    <Flex flex={1} direction='row' justify='center' align='center' bg='#171923' >
      <Grid>
        <Grid.Col span={8}>
          <DeliveryList />
        </Grid.Col>
        <Grid.Col span={4}>
          {activeDelivery ? (
            <Timer delivery={activeDelivery} />
          ) : (
            <Card>
              <Title order={3} c="gold.4">Nenhum Timer Ativo</Title>
              <Text c="gray.2">Selecione uma entrega para iniciar o timer.</Text>
            </Card>
          )}
        </Grid.Col>
      </Grid>
      </Flex>

  );
};

export default Home;