export interface Event {
  id?: number | string;
  timestamp: string;
  name: string | null;
  type: string;  // Tipo do evento
  duration: number;
  data: { [key: string]: any };
}

export interface Bucket {
  id: string; // Unique identifier for the bucket
  created: string; // ISO8601 formatted timestamp
  name: string | null; // Descriptive human readable bucket name
  type: string; // Type of events in the bucket
  client: string; // Identifier of the client software
  hostname?: string; // Optional hostname
}


export interface AggregatedEvent {
  id?: string | number;
  name: string | null;
  data: { [key: string]: any };
  totalDuration: number;
}
