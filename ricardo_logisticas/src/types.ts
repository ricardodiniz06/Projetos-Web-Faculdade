export interface Delivery {
    id: number;
    description: string;
    status: 'Pendente' | 'Em Progresso' | 'Entregue';
    deadline: Date;
    timerDuration?: number; // Duração do timer em segundos (opcional)
  }
  
  export interface TimerState {
    timeLeft: number;
    isRunning: boolean;
  }
  
  export interface CepResponse {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
  }