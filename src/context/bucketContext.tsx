'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getBuckets } from '../api/api';
import { Bucket } from '../lib/types';

interface BucketsContextProps {
  buckets: Bucket[];
  fetchBuckets: () => void;
}

const BucketsContext = createContext<BucketsContextProps | undefined>(undefined);

export const BucketsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [cache, setCache] = useState<Bucket[] | null>(null);

  const fetchBuckets = async () => {
    if (cache) {
      setBuckets(cache);
    } else {
      try {
        const response = await getBuckets();
        if (response && typeof response === 'object' && !Array.isArray(response)) {
          const bucketsArray = Object.keys(response).map(key => ({
            id: key,
            name: response[key].name,
            created: response[key].created || '',
            type: response[key].type || '',
            client: response[key].client || '',
          }));
          setBuckets(bucketsArray);
          setCache(bucketsArray);  // Cache the result
        } else {
          console.error('Formato inesperado da resposta da API para buckets:', response);
          setBuckets([]);
        }
      } catch (error) {
        console.error('Erro ao listar buckets:', error);
        setBuckets([]);
      }
    }
  };

  useEffect(() => {
    fetchBuckets();
  }, []);

  return (
    <BucketsContext.Provider value={{ buckets, fetchBuckets }}>
      {children}
    </BucketsContext.Provider>
  );
};

export const useBuckets = () => {
  const context = useContext(BucketsContext);
  if (context === undefined) {
    throw new Error('useBuckets must be used within a BucketsProvider');
  }
  return context;
};
