import { Group, Image, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Group
      h="100%"
      px="md"
      style={{
        background: 'linear-gradient(90deg, #171923 0%, #2C2E70 100%)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        justifyContent: 'space-between',
      }}
    >
      <Image
        src="/src/assets/lashes.png"
        alt="Logo Lashes"
        height={40}
        fit="contain"
      />
      <Button c="white"  variant='light' onClick={() => navigate('/documentacao')}>
        Documentação
      </Button>
    </Group>
  );
};

export default Header;
