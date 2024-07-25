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
    
    console.log('Fetching events with params:', { bucketId, startDate, endDate });

    if (cache && cache[cacheKey]) {
      console.log('Using cached events');
      setEvents(cache[cacheKey]);
    } else {
      try {
        const response = await getEvents(bucketId, startDate, endDate);
        console.log('Fetched events data:', response);

        // Convert response to an array of events if it's not already
        const eventsArray = Array.isArray(response) ? response : Object.values(response);

        if (Array.isArray(eventsArray)) {
          const typedEventsArray = eventsArray as Event[];
          setEvents(typedEventsArray);

          setCache(prevCache => ({
            ...prevCache,
            [cacheKey]: typedEventsArray,
          }));
        } else {
          console.error('Unexpected format of API response for events:', eventsArray);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
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
        // Logic for auto-refreshing events if necessary.
      }, 60000); // Refresh every 60 seconds.
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
