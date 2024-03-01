import * as React from "react";
import { graphql } from "relay-runtime";
import { useFragment, useLazyLoadQuery, useRelayEnvironment } from "react-relay";
import { Button, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import type { FasolkiQuery as FasolkiQueryType } from './__generated__/FasolkiQuery.graphql';
import { fetchQuery } from "relay-runtime";
import Counter from "./Counter";
import CounterComposer from "./CounterComposer";
import { FasolkiViewerFragment$data } from "./__generated__/FasolkiViewerFragment.graphql";

const FasolkiViewerFragment = graphql`
  fragment FasolkiViewerFragment on Viewer {
    id
    firstName
    documents {
      ...CounterDocumentFragment       
    }
  }
`;

const FasolkiQuery = graphql`
  query FasolkiQuery {
    viewer {
      ...FasolkiViewerFragment
    }
  }
`;

const getTypeFilter = (type: string) => (d: any) => d?.type === type;

export default function Fasolki() {
  const [fetchKey, setFetchKey] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const environment = useRelayEnvironment();

  let data = useLazyLoadQuery<FasolkiQueryType>(
    FasolkiQuery,
    {},
    { fetchKey, fetchPolicy: `${fetchKey ? 'network' : 'store'}-only` },
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

  const viewer = useFragment(FasolkiViewerFragment, data.viewer) as FasolkiViewerFragment$data;

  const renderCounter = ({ item }: any) => <Counter document={item} />

  const refreshControl = <RefreshControl refreshing={refreshing} onRefresh={refresh} />;

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <FlatList
          data={viewer.documents}
          renderItem={renderCounter}
          refreshControl={refreshControl}
        />
        {/* {creating && <CounterComposer />}
        {!creating && <Button title="Dodaj" onPress={() => {
          setCreating(true);
        }} />} */}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 18,
  },
  list: {
    paddingVertical: 12,
    marginVertical: 12,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center'
  },
});