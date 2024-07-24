// utils/formatDuration.ts

/**
 * Converte a duração em segundos para um formato legível (horas, minutos e segundos).
 * @param duration - Duração em segundos.
 * @returns Duração formatada como uma string.
 */
export const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  