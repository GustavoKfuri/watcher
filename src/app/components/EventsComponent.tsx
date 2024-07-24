'use client';

import React, { useState, useEffect } from 'react';
import { useBuckets } from '../../context/bucketContext';
import { useEvents } from '../../context/eventContext';
import { format, parseISO } from 'date-fns';
import EventsPieChart from './Chart';
import { EventsProvider }from '../../context/eventContext';

const EventsComponent: React.FC = () => {
  const { buckets, fetchBuckets } = useBuckets();
  const { events, fetchEvents } = useEvents();
  const [selectedBucket, setSelectedBucket] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('15min');

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  const handleBucketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBucket(event.target.value);
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(event.target.value);
  };

  const handleUpdateEvents = () => {
    if (selectedBucket) {
      let startDate: Date | undefined;
      const now = new Date();

      switch (timeRange) {
        case '15min':
          startDate = new Date(now.getTime() - 15 * 60 * 1000);
          break;
        case '30min':
          startDate = new Date(now.getTime() - 30 * 60 * 1000);
          break;
        case '1h':
          startDate = new Date(now.getTime() - 60 * 60 * 1000);
          break;
        case '2h':
          startDate = new Date(now.getTime() - 2 * 60 * 1000);
          break;
        case '4h':
          startDate = new Date(now.getTime() - 4 * 60 * 1000);
          break;
        case '6h':
          startDate = new Date(now.getTime() - 6 * 60 * 1000);
          break;
        case '12h':
          startDate = new Date(now.getTime() - 12 * 60 * 1000);
          break;
        case '24h':
          startDate = new Date(now.getTime() - 24 * 60 * 1000);
          break;
        default:
          startDate = undefined;
      }

      fetchEvents(selectedBucket, startDate, now);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Eventos</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Selecione o Bucket:
          <select
            value={selectedBucket}
            onChange={handleBucketChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecione...</option>
            {buckets.map(bucket => (
              <option key={bucket.id} value={bucket.id}>
                {bucket.name ?? bucket.id}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Selecione o Intervalo de Tempo:
          <select
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="15min">Últimos 15 minutos</option>
            <option value="30min">Últimos 30 minutos</option>
            <option value="1h">Última 1 hora</option>
            <option value="2h">Últimas 2 horas</option>
            <option value="4h">Últimas 4 horas</option>
            <option value="6h">Últimas 6 horas</option>
            <option value="12h">Últimas 12 horas</option>
            <option value="24h">Últimas 24 horas</option>
          </select>
        </label>
      </div>
      <button
        onClick={handleUpdateEvents}
        className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
      >
        Atualizar Eventos
      </button>
      <div className="mt-8">
        <EventsProvider>
        <EventsPieChart events={events} />
        </EventsProvider>
      </div>
    </div>
  );
};

export default EventsComponent;
