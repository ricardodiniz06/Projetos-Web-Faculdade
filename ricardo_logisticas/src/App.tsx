import { AppShell } from '@mantine/core';
import Header from './components/Header';
import Home from './pages/Home';
import { DeliveryProvider } from './components/DelieveryContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Documentacao from './pages/Documentacao';

function App() {
  return (
    <Router>
      <DeliveryProvider>
        <AppShell header={{ height: 60 }}>
          <AppShell.Header>
            <Header />
          </AppShell.Header>
          <AppShell.Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/documentacao" element={<Documentacao />} />
            </Routes>
          </AppShell.Main>
        </AppShell>
      </DeliveryProvider>
    </Router>
  );
}

export default App;
