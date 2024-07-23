export interface Event {
    id?: number | string;
    timestamp: string;
    name: string | null;
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
