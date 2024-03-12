import React from 'react';
import { StatusBar } from 'expo-status-bar';

import RelayEnvironment from '@/relay/RelayEnvironment';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';

export default function FasolkiLayout() {
  return (
    <RelayEnvironment>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <React.Suspense fallback={<LoadingSpinner />}>
          <Slot />
        </React.Suspense>
      </SafeAreaView>
    </RelayEnvironment>
  );
}