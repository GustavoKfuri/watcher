// src/api/api.ts
import api from './axios';
import { Bucket, Event } from '@/lib/types';

// Função para obter todos os buckets
export const getBuckets = async (): Promise<Record<string, Bucket>> => {
  try {
    const response = await api.get('/0/buckets/');
    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar buckets:", error);
    throw error;
  }
};

// Função para exportar um bucket pelo ID
export const exportBucket = async (bucketId: string): Promise<any> => {
  try {
    const response = await api.get(`/0/buckets/${bucketId}/export`);
    return response.data;
  } catch (error) {
    console.error("Erro ao exportar o bucket:", error);
    throw error;
  }
};

// Função para obter eventos de um bucket pelo ID
export const getEvents = async (
  bucketId: string, 
  startDate?: Date, 
  endDate?: Date
): Promise<Event[]> => {
  try {
    const params: { [key: string]: any } = {};
    if (startDate) params.start = startDate.toISOString();
    if (endDate) params.end = endDate.toISOString();
    
    const response = await api.get(`/0/buckets/${bucketId}/events`, { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos do bucket:", error);
    throw error;
  }
};

// Função para exportar eventos de um bucket pelo ID
export const exportEvents = async (bucketId: string): Promise<any> => {
  try {
    const response = await api.get(`/0/buckets/${bucketId}/events/export`);
    return response.data;
  } catch (error) {
    console.error("Erro ao exportar eventos do bucket:", error);
    throw error;
  }
};

// Função para obter eventos do dia atual
export const getTodayEvents = async (bucketId: string): Promise<Event[]> => {
  try {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    return getEvents(bucketId, startOfDay, endOfDay);
  } catch (error) {
    console.error("Erro ao buscar eventos do dia atual:", error);
    throw error;
  }
};
