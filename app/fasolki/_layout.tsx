import React from 'react';
import { StatusBar } from 'expo-status-bar';

import RelayEnvironment from '@/relay/RelayEnvironment';
import Fasolki from '@/components/Fasolki';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function FasolkiScreen() {
  return (
    <RelayEnvironment>
      <StatusBar />
      <React.Suspense fallback={<LoadingSpinner />}>
        <Fasolki />
      </React.Suspense>
    </RelayEnvironment>
  );
}