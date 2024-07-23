'use client';

import React, { useState, useEffect } from 'react';
import { useBuckets } from '@/context/bucketContext';
import { useEvents } from '@/context/eventContext';

const EventsComponent: React.FC = () => {
  const { buckets } = useBuckets();
  const { events, fetchEvents } = useEvents();
  const [selectedBucketId, setSelectedBucketId] = useState<string | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<string>('1h');

  useEffect(() => {
    if (selectedBucketId) {
      const now = new Date();
      let startDate: Date;

      switch (timeRange) {
        case '15m':
          startDate = new Date(now.getTime() - 15 * 60 * 1000);
          break;
        case '30m':
          startDate = new Date(now.getTime() - 30 * 60 * 1000);
          break;
        case '1h':
          startDate = new Date(now.getTime() - 60 * 60 * 1000);
          break;
        case '2h':
          startDate = new Date(now.getTime() - 2 * 60 * 60 * 1000);
          break;
        case '4h':
          startDate = new Date(now.getTime() - 4 * 60 * 60 * 1000);
          break;
        case '6h':
          startDate = new Date(now.getTime() - 6 * 60 * 60 * 1000);
          break;
        case '12h':
          startDate = new Date(now.getTime() - 12 * 60 * 60 * 1000);
          break;
        case '24h':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 60 * 60 * 1000); // Default to 1 hour
      }

      fetchEvents(selectedBucketId, startDate, now);
    }
  }, [selectedBucketId, timeRange, fetchEvents]);

  return (
    <div>
      <h2>Eventos</h2>
      <div>
        <label>
          Bucket:
          <select
            value={selectedBucketId}
            onChange={(e) => setSelectedBucketId(e.target.value)}
          >
            <option value="">Selecione um bucket</option>
            {buckets.map((bucket) => (
              <option key={bucket.id} value={bucket.id}>
                {bucket.name || bucket.id}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Intervalo de tempo:
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
            <option value="15m">Últimos 15 minutos</option>
            <option value="30m">Últimos 30 minutos</option>
            <option value="1h">Última 1 hora</option>
            <option value="2h">Últimas 2 horas</option>
            <option value="4h">Últimas 4 horas</option>
            <option value="6h">Últimas 6 horas</option>
            <option value="12h">Últimas 12 horas</option>
            <option value="24h">Últimas 24 horas</option>
          </select>
        </label>
      </div>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div>Timestamp: {new Date(event.timestamp).toLocaleString()}</div>
            <div>Duração: {`${Math.floor(event.duration / 60)}m ${event.duration % 60}s`}</div>
            <div>Dados: {JSON.stringify(event.data)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsComponent;
