import { useState, useEffect, useRef } from 'react';
import { TextInput, Button, Stack, Text, Card, Alert, Title } from '@mantine/core';
import { Delivery, CepResponse } from '../types';

const CepSearch = ({ onAddDelivery }: { onAddDelivery: (delivery: Delivery) => void }) => {
  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState<CepResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cepInputRef = useRef<HTMLInputElement>(null);
  const hasFetchedInitial = useRef(false);

  const isValidCep = (cepValue: string) => /^\d{8}$/.test(cepValue);

  
  const maskCep = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '').slice(0, 8); 
    return onlyDigits.replace(/(\d{5})(\d{0,3})/, '$1-$2'); 
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskCep(e.target.value);
    setCep(maskedValue);
  };

  useEffect(() => {
    if (hasFetchedInitial.current) return;

    cepInputRef.current?.focus();
    const defaultCep = '85806095';
    if (isValidCep(defaultCep)) {
      console.log('Iniciando requisição inicial para CEP:', defaultCep);
      fetch(`https://viacep.com.br/ws/${defaultCep}/json/`)
        .then(response => {
          if (!response.ok) throw new Error('Resposta inválida');
          return response.json();
        })
        .then(data => {
          console.log('Dados recebidos:', data);
          if (!data.erro) {
            setCepData(data);
            const newDelivery: Delivery = {
              id: Date.now(),
              description: `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`,
              status: 'Pendente',
              deadline: new Date(),
            };
            onAddDelivery(newDelivery);
          } else {
            setError('CEP padrão não encontrado!');
          }
          hasFetchedInitial.current = true;
        })
        .catch(() => {
          setError('Erro ao carregar CEP padrão!');
          hasFetchedInitial.current = true;
        });
    }
  }, [onAddDelivery]);

  const fetchCep = async () => {
    const cleanCep = cep.replace(/\D/g, ''); 
    if (!isValidCep(cleanCep)) {
      setError('CEP deve ter exatamente 8 dígitos!');
      setCepData(null);
      return;
    }

    try {
      console.log('Consultando CEP:', cleanCep);
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (!response.ok) throw new Error('Resposta inválida');
      const data = await response.json();

      console.log('Dados recebidos:', data);
      if (data.erro) {
        setError('CEP não encontrado!');
        setCepData(null);
      } else {
        setCepData(data);
        setError(null);
        const newDelivery: Delivery = {
          id: Date.now(),
          description: `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`,
          status: 'Pendente',
          deadline: new Date(),
        };
        onAddDelivery(newDelivery);
      }
    } catch {
      setError('Erro ao consultar o CEP!');
      setCepData(null);
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={3} mb="md">Consulta de CEP</Title>
      <Stack>
        <TextInput
          ref={cepInputRef}
          placeholder="Digite o CEP (ex: 99999-999)"
          label="CEP"
          value={cep}
          onChange={handleCepChange}
          onKeyPress={(e) => e.key === 'Enter' && fetchCep()}
          maxLength={9} 
        />
        <Button onClick={fetchCep} color="blue">Consultar</Button>
        {error && <Alert color="red" title="Erro">{error}</Alert>}
        {cepData && !error && (
          <Stack>
            <Text><strong>CEP:</strong> {cepData.cep}</Text>
            <Text><strong>Endereço:</strong> {cepData.logradouro}</Text>
            <Text><strong>Bairro:</strong> {cepData.bairro}</Text>
            <Text><strong>Cidade/UF:</strong> {cepData.localidade}/{cepData.uf}</Text>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default CepSearch;