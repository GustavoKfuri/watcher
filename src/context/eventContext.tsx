'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getEvents } from '../api/api';
import { Event } from '../lib/types';

interface EventsContextProps {
  events: Event[];
  fetchEvents: (bucketId: string, startDate?: Date, endDate?: Date) => void;
  refreshEvents: (bucketId: string, startDate?: Date, endDate?: Date) => void;
  autoRefreshEnabled: boolean;
  setAutoRefreshEnabled: (enabled: boolean) => void;
}

const EventsContext = createContext<EventsContextProps | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [cache, setCache] = useState<Record<string, Event[]> | null>(null);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);

  const fetchEvents = async (bucketId: string, startDate?: Date, endDate?: Date) => {
    const cacheKey = `${bucketId}-${startDate?.toISOString()}-${endDate?.toISOString()}`;
    
    if (cache && cache[cacheKey]) {
      setEvents(cache[cacheKey]);
    } else {
      try {
        const eventsData = await getEvents(bucketId, startDate, endDate);
        setEvents(eventsData);

        setCache(prevCache => ({
          ...prevCache,
          [cacheKey]: eventsData,
        }));
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    }
  };

  const refreshEvents = useCallback((bucketId: string, startDate?: Date, endDate?: Date) => {
    fetchEvents(bucketId, startDate, endDate);
  }, [fetchEvents]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (autoRefreshEnabled) {
      intervalId = setInterval(() => {
        // Lógica para atualizar eventos periodicamente, se necessário.
      }, 60000); // Atualiza a cada 60 segundos, por exemplo.
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefreshEnabled]);

  return (
    <EventsContext.Provider value={{ events, fetchEvents, refreshEvents, autoRefreshEnabled, setAutoRefreshEnabled }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
