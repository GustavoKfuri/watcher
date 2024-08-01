'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Event } from '../../lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  events: Event[];
}

const EventsPieChart: React.FC<Props> = ({ events }) => {
  console.log('Events:', events);

  // Função para formatar a duração
  const formatDuration = (durationInMinutes: number) => {
    if (durationInMinutes < 1) {
      const seconds = durationInMinutes * 60;
      return `${seconds.toFixed(2)} segundos`;
    } else if (durationInMinutes < 60) {
      return `${durationInMinutes.toFixed(2)} minutos`;
    } else {
      const hours = durationInMinutes / 60;
      return `${hours.toFixed(2)} horas`;
    }
  };

  // Agregação dos eventos por um identificador ou outro campo
  const aggregatedData = events.reduce((acc: Record<string, number>, event: Event) => {
    console.log('Processing event:', event);

    // Use o título ou outro campo se 'app' não estiver presente
    const app = event.data?.app || event.data?.title || 'Unknown';
    const duration = event.duration || 0;

    // Converte a duração de segundos para minutos
    const durationInMinutes = duration / 60;

    acc[app] = (acc[app] || 0) + durationInMinutes;
    return acc;
  }, {});

  console.log('Aggregated Data:', aggregatedData);

  const data = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        data: Object.values(aggregatedData),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const label = data.labels[tooltipItem.dataIndex];
            const value = data.datasets[0].data[tooltipItem.dataIndex] as number;
            return `${label}: ${formatDuration(value)}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">Distribuição de Eventos</h3>
      {data.labels.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <p>Nenhum dado disponível para exibir.</p>
      )}
    </div>
  );
};

export default EventsPieChart;
