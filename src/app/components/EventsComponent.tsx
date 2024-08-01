'use client';

import React, { useState, useEffect } from 'react';
import { useBuckets } from '../../context/bucketContext';
import { useEvents } from '../../context/eventContext';
import EventsPieChart from './Chart';  // Verifique o caminho correto para o seu componente Chart

const EventsComponent: React.FC = () => {
  const { buckets, fetchBuckets } = useBuckets();
  const { events, fetchEvents } = useEvents();
  const [selectedBucket, setSelectedBucket] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  const handleBucketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBucket(event.target.value);
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeRange = event.target.value;
    setTimeRange(newTimeRange);
    if (newTimeRange === '') {
      setStartDate('');
      setEndDate('');
    }
  };

  const handleUpdateEvents = () => {
    if (selectedBucket) {
      let start: Date | undefined;
      let end: Date | undefined;
      const now = new Date();

      if (startDate && endDate) {
        start = new Date(startDate);
        end = new Date(endDate);
      } else if (timeRange) {
        switch (timeRange) {
          case '15min':
            start = new Date(now.getTime() - 15 * 60 * 1000);
            break;
          case '30min':
            start = new Date(now.getTime() - 30 * 60 * 1000);
            break;
          case '1h':
            start = new Date(now.getTime() - 60 * 60 * 1000);
            break;
          case '2h':
            start = new Date(now.getTime() - 2 * 60 * 60 * 1000);
            break;
          case '4h':
            start = new Date(now.getTime() - 4 * 60 * 60 * 1000);
            break;
          case '6h':
            start = new Date(now.getTime() - 6 * 60 * 60 * 1000);
            break;
          case '12h':
            start = new Date(now.getTime() - 12 * 60 * 60 * 1000);
            break;
          case '24h':
            start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            break;
          default:
            start = undefined;
        }
        end = now;
      }

      console.log('Updating events with params:', { selectedBucket, start, end });
      fetchEvents(selectedBucket, start, end);
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
            <option value="">Selecionar...</option>
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
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Data de Início:
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Data de Fim:
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>
      </div>
      <button
        onClick={handleUpdateEvents}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        Atualizar Eventos
      </button>
      <div className="mt-6">
        <EventsPieChart events={events} />
      </div>
    </div>
  );
};

export default EventsComponent;
