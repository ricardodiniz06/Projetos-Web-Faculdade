import { Button, Container, Text, Title, List, Space, Divider } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Documentacao = () => {
  const navigate = useNavigate();

  return (
    <Container mt="xl">
      <Title order={2} c="indigo.6">Documentação do Projeto</Title>
      <Text mt="md" c="black">
        Este documento descreve o funcionamento do sistema de gerenciamento de entregas, incluindo como ele foi construído, as práticas de React aplicadas e o propósito de cada componente. O projeto utiliza o Mantine para uma interface elegante e funcionalidades como timers, notificações e persistência de dados.
      </Text>

      <Divider my="lg" />

      <Title order={3} c="gold.4">Visão Geral do Sistema</Title>
      <Text mt="sm" c="black">
        O sistema permite gerenciar entregas logísticas com as seguintes funcionalidades:
      </Text>
      <List withPadding mt="sm" c="black">
        <List.Item>Adicionar entregas via consulta de CEP ou manualmente.</List.Item>
        <List.Item>Iniciar, pausar e resetar timers individuais para cada entrega.</List.Item>
        <List.Item>Atualizar automaticamente o status das entregas ("pending", "in-progress", "delivered").</List.Item>
        <List.Item>Exibir um resumo das entregas e notificações visuais quando timers terminam.</List.Item>
        <List.Item>Persistir dados no <code>localStorage</code> para manter o estado entre sessões.</List.Item>
      </List>

      <Divider my="lg" />

      <Title order={3} c="gold.4">Práticas de React Aplicadas</Title>
      <Text mt="sm" c="black">
        O projeto utiliza as principais práticas do React para garantir modularidade, performance e reatividade. Abaixo, explico cada uma delas e como foram aplicadas:
      </Text>

      <Space h="md" />
      <Text fw={700} c="indigo.5">useState</Text>
      <Text mt="xs" c="black">
        Gerencia estados locais e globais para reatividade na UI. Exemplos:
      </Text>
      <List withPadding c="black">
        <List.Item>
          <code>CepSearch.tsx</code>: <code>useState</code> para <code>cep</code>, <code>cepData</code> e <code>error</code>, controlando o input e os dados da API.
        </List.Item>
        <List.Item>
          <code>DeliveryList.tsx</code>: <code>useState</code> para <code>filter</code>, <code>newDeliveryManual</code> e estados do modal de edição.
        </List.Item>
        <List.Item>
          <code>Timer.tsx</code>: <code>useState</code> para <code>timeLeft</code>, <code>isRunning</code> e <code>customTime</code>, gerenciando o timer.
        </List.Item>
        <List.Item>
          <code>DeliveryContext.tsx</code>: Estado global <code>deliveries</code> e <code>activeTimerId</code> para compartilhar entre componentes.
        </List.Item>
      </List>
      <Text mt="xs" c="black">
        <strong>Por quê</strong>: Permite atualizações dinâmicas da interface com base em interações do usuário ou lógica interna.
      </Text>

      <Space h="md" />
      <Text fw={700} c="indigo.5">useEffect</Text>
      <Text mt="xs" c="black">
        Controla efeitos colaterais e simula ciclos de vida (montagem, atualização, desmontagem). Exemplos:
      </Text>
      <List withPadding c="black">
        <List.Item>
          <code>CepSearch.tsx</code>: Faz uma consulta inicial ao CEP "01001000" na montagem, focando o input com <code>cepInputRef.current?.focus()</code>.
        </List.Item>
        <List.Item>
          <code>DeliveryList.tsx</code>: Salva <code>deliveries</code> no <code>localStorage</code> sempre que mudam, emulando <code>componentDidUpdate</code>.
        </List.Item>
        <List.Item>
          <code>Timer.tsx</code>: Dois <code>useEffect</code>:
          <List withPadding>
            <List.Item>Contagem regressiva do timer com <code>setInterval</code>, limpando na desmontagem.</List.Item>
            <List.Item>Atualiza o <code>status</code> da entrega com base em <code>isRunning</code> e <code>timeLeft</code>.</List.Item>
          </List>
        </List.Item>
      </List>
      <Text mt="xs" c="black">
        <strong>Por quê</strong>: Sincroniza o componente com eventos externos (API, timers) e gerencia efeitos colaterais adequadamente.
      </Text>

      <Space h="md" />
      <Text fw={700} c="indigo.5">useMemo</Text>
      <Text mt="xs" c="black">
        Otimiza cálculos pesados para evitar re-renderizações desnecessárias. Exemplo:
      </Text>
      <List withPadding c="black">
        <List.Item>
          <code>DeliveryList.tsx</code>: <code>useMemo</code> calcula <code>filteredDeliveries</code> com base em <code>deliveries</code> e <code>filter</code>, só atualizando quando necessário.
        </List.Item>
      </List>
      <Text mt="xs" c="black">
        <strong>Por quê</strong>: Melhora a performance em listas grandes, evitando recalcular a filtragem a cada render.
      </Text>

      <Space h="md" />
      <Text fw={700} c="indigo.5">useRef</Text>
      <Text mt="xs" c="black">
        Armazena referências persistentes sem causar re-renderizações. Exemplo:
      </Text>
      <List withPadding c="black">
        <List.Item>
          <code>CepSearch.tsx</code>:
          <List withPadding>
            <List.Item><code>cepInputRef</code>: Foca o input na montagem.</List.Item>
            <List.Item><code>hasFetchedInitial</code>: Evita múltiplas consultas iniciais.</List.Item>
          </List>
        </List.Item>
      </List>
      <Text mt="xs"c="black">
        <strong>Por quê</strong>: Manipula o DOM diretamente e mantém valores entre renderizações sem afetar o estado.
      </Text>

      <Space h="md" />
      <Text fw={700} c="indigo.5">Ciclo de Vida</Text>
      <Text mt="xs" c="black">
        Simulado via <code>useEffect</code> para ações em momentos específicos:
      </Text>
      <List withPadding c="black">
        <List.Item><strong>Montagem</strong>: Consulta inicial em <code>CepSearch</code>, carregamento do <code>localStorage</code> em <code>DeliveryContext</code>.</List.Item>
        <List.Item><strong>Atualização</strong>: Persistência no <code>localStorage</code> em <code>DeliveryList</code>, contagem e status em <code>Timer</code>.</List.Item>
        <List.Item><strong>Desmontagem</strong>: Limpeza de intervalos em <code>Timer</code>.</List.Item>
      </List>
      <Text mt="xs" c="black">
        <strong>Por quê</strong>: Garante que o comportamento do componente seja previsível e alinhado ao ciclo de vida.
      </Text>

      <Space h="md" />
      <Text fw={700} c="indigo.5">Componentização</Text>
      <Text mt="xs" c="black">
        Divide a lógica em componentes reutilizáveis e independentes:
      </Text>
      <List withPadding c="black">
        <List.Item><code>CepSearch</code>: Consulta de CEP e adição de entregas.</List.Item>
        <List.Item><code>DeliveryList</code>: Exibição e gerenciamento da lista.</List.Item>
        <List.Item><code>Timer</code>: Controle do timer por entrega.</List.Item>
        <List.Item><code>DeliverySummary</code>: Resumo das entregas.</List.Item>
        <List.Item><code>Header</code>: Cabeçalho com logo.</List.Item>
      </List>
      <Text mt="xs" c="black">
        <strong>Por quê</strong>: Facilita manutenção, testes e escalabilidade do código.
      </Text>

      <Space h="md" />
      <Text fw={700} c="indigo.5">Props</Text>
      <Text mt="xs" c="black">
        Passa dados e funções entre componentes para comunicação:
      </Text>
      <List withPadding c="black">
        <List.Item><code>CepSearch</code>: Recebe <code>onAddDelivery</code> para adicionar entregas.</List.Item>
        <List.Item><code>Timer</code>: Recebe <code>delivery</code> para operar em uma entrega específica.</List.Item>
        <List.Item><code>DeliverySummary</code>: Recebe <code>deliveries</code> para calcular o resumo.</List.Item>
      </List>
      <Text mt="xs" c="black">
        <strong>Por quê</strong>: Permite que componentes sejam reutilizáveis e interajam sem dependências rígidas.
      </Text>
      <Divider my="lg" />

      <Title order={3} c="gold.4">Como Instalar e Usar</Title>
      <Text mt="sm" c="black">Para rodar o projeto localmente:</Text>
      <List withPadding c="black">
        <List.Item>Clone o repositório: <code>git clone [URL]</code></List.Item>
        <List.Item>Instale as dependências: <code>npm install</code></List.Item>
        <List.Item>Inicie o servidor: <code>npm run dev</code></List.Item>
        <List.Item>Acesse em <code>http://localhost:5173</code>.</List.Item>
      </List>
      <Text mt="sm" c="black">Como usar:</Text>
      <List withPadding c="black">
        <List.Item>Adicione entregas via CEP ou manualmente na seção "Lista de Entregas".</List.Item>
        <List.Item>Clique no ícone de relógio para iniciar um timer.</List.Item>
        <List.Item>Defina o tempo no campo "Definir tempo" e controle o timer (Iniciar, Pausar, Resetar).</List.Item>
        <List.Item>Veja o resumo das entregas e receba notificações quando o tempo acabar.</List.Item>
      </List>
      <Button mt="xl" color="indigo" onClick={() => navigate('/')}>
        Voltar para o Início
      </Button>
    </Container>
  );
};

export default Documentacao;