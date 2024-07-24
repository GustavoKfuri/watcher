import React from 'react';
import { BucketsProvider } from '@/context/bucketContext';
import { EventsProvider } from '@/context/eventContext';
import EventList from './components/EventsComponent';

const App: React.FC = () => {
  return (
    <BucketsProvider>
      <EventsProvider>
      
        <EventList />
      </EventsProvider>
    </BucketsProvider>
  );
};

export default App;
