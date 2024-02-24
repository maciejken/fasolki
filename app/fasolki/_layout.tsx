import React from 'react';

import RelayEnvironment from '@/relay/RelayEnvironment';
import Fasolki from '@/components/Fasolki';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function FasolkiScreen() {
  return (
    <RelayEnvironment>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Fasolki />
      </React.Suspense>
    </RelayEnvironment>
  );
}