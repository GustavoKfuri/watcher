'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { getEvents } from '@/api/api';
import { Event } from '@/lib/types';

interface EventContextType {
  events: Event[];
  fetchEvents: (bucketId: string, startDate: Date, endDate: Date) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async (bucketId: string, startDate: Date, endDate: Date) => {
    try {
      const data = await getEvents(bucketId, startDate, endDate);
      setEvents(data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  return (
    <EventContext.Provider value={{ events, fetchEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
