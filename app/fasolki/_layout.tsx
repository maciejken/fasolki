import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import RelayEnvironment from '@/relay/RelayEnvironment';
import Fasolki from '@/components/Fasolki';
import LoadingSpinner from '@/components/LoadingSpinner';
import AppContext from '@/appContext';
import CustomPicker from '@/components/Picker';

export default function FasolkiScreen() {
  const { picker } = useContext(AppContext);
  return (
    <RelayEnvironment>
      <StatusBar />
      <React.Suspense fallback={<LoadingSpinner />}>
        <Fasolki />
        {!!picker.items.length && <CustomPicker {...picker} />}
      </React.Suspense>
    </RelayEnvironment>
  );
}