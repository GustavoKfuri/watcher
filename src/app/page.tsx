import React from 'react';
import { BucketsProvider } from '@/context/bucketContext';
import { EventProvider } from '@/context/eventContext';
import EventList from './components/EventsComponent';

const App: React.FC = () => {
  return (
    <BucketsProvider>
      <EventProvider>
        <EventList />
      </EventProvider>
    </BucketsProvider>
  );
};

export default App;
