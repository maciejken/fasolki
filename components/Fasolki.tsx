import React, { useContext } from "react";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery, useRelayEnvironment } from "react-relay";
import type { FasolkiQuery as FasolkiQueryType } from './__generated__/FasolkiQuery.graphql';
import { fetchQuery } from "relay-runtime";
import FasolkiView from "./FasolkiView";
import LoadingSpinner from "./LoadingSpinner";
import CustomPicker from './Picker';
import AppContext from '@/appContext';

const FasolkiQuery = graphql`
  query FasolkiQuery {
    viewer {
      ...FasolkiViewerFragment
    }
  }
`;

export default function Fasolki() {
  const [fetchKey, setFetchKey] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const environment = useRelayEnvironment();
  const { picker } = useContext(AppContext);

  let data = useLazyLoadQuery<FasolkiQueryType>(
    FasolkiQuery,
    {},
    { fetchKey, fetchPolicy: 'network-only' }
  );

  const refresh = React.useCallback(() => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);

    fetchQuery(environment, FasolkiQuery, {})
      .subscribe({
        complete: () => {
          setRefreshing(false);
          setFetchKey(prev => prev + 1);
        },
        error: () => {
          setRefreshing(false);
        }
      });
  }, [fetchKey]);

  React.useEffect(() => {
    if (!fetchKey) {
      refresh();
    }
  }, []);

  if (!data.viewer) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <FasolkiView
        viewer={data.viewer}
        refresh={refresh}
        refreshing={refreshing}
      />
      <CustomPicker {...picker} />
    </>
  );
}