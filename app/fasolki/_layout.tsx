import React from 'react';

import RelayEnvironment from '@/relay/RelayEnvironment';
import Fasolki from '@/components/Fasolki';
import LoadingSpinner from '@/components/LoadingSpinner';
import { StatusBar } from 'expo-status-bar';

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