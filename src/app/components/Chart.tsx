'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Event } from '@/lib/types';// Atualize o caminho para o arquivo correto
import { formatDuration } from '../../utils/formatDuration'; // Atualize o caminho para a função formatDuration

ChartJS.register(ArcElement, Tooltip, Legend);

interface EventsPieChartProps {
  events: Event[];
}

const EventsPieChart: React.FC<EventsPieChartProps> = ({ events }) => {
  const data = {
    labels: events.map(event => `ID: ${event.id}`),
    datasets: [
      {
        data: events.map(event => event.duration),
        backgroundColor: events.map((_, index) => `hsl(${(index * 360) / events.length}, 70%, 70%)`),
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${formatDuration(value)}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Gráfico de Pizza dos Eventos</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default EventsPieChart;
