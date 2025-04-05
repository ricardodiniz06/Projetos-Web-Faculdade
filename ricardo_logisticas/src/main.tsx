import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  fontFamily: 'Poppins, sans-serif', 
  primaryColor: 'indigo', 
  colors: {
    indigo: [
      '#E8ECEF', '#C9D1D9', '#A3BFFA', '#7F9CF5', '#667EEA',
      '#5A67D8', '#4C51BF', '#434190', '#373580', '#2C2E70', 
    ],
    gray: [
      '#F7FAFC', '#EDF2F7', '#E2E8F0', '#CBD5E0', '#A0AEC0',
      '#718096', '#4A5568', '#2D3748', '#1A202C', '#171923', 
    ],
    gold: [
      '#FFF5E6', '#FFE8B3', '#FFD980', '#FFCA4D', '#FFBB1A',
      '#E6A617', '#B38212', '#805B0D', '#4D3508', '#1A1203', 
    ],
  },
  shadows: {
    md: '0 4px 12px rgba(0, 0, 0, 0.1)', 
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md', 
      },
      styles: {
        root: {
          transition: 'all 0.2s ease', 
          '&:hover': {
            transform: 'translateY(-2px)', 
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'md',
        withBorder: false, 
      },
      styles: {
        root: {
          background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)', 
          color: '#E2E8F0', 
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)', 
          },
        },
      },
    },
    TextInput: {
      styles: {
        input: {
          backgroundColor: '#2D3748',
          color: '#E2E8F0',
          border: '1px solid #4A5568',
          '&:focus': {
            borderColor: '#667EEA',
            boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.2)',
          },
        },
        label: {
          color: '#A0AEC0',
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" /> 
      <App />
    </MantineProvider>
  </React.StrictMode>
);