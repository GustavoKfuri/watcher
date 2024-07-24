export interface Event {
  id?: number | string;
  timestamp: string;
  name: string | null;
  type: string;  // Adicione o tipo aqui
  duration: number;
  data: { [key: string]: any };
}
  
  export interface Bucket {
    id: string;
    created: string;
    name: string | null;
    type: string;
    client: string;
}


export interface AggregatedEvent {
  id?: string | number;
  name: string | null;
  data: { [key: string]: any };
  totalDuration: number;
}
