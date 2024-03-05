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
  fragment FasolkiViewerFragment on Viewer
    @argumentDefinitions(
      cursor: { type: "String" }
      count: { type: "Int", defaultValue: 10 }
    )
  {
    id
    firstName
    documents(first: $count, after: $cursor)
      @connection(key: "FasolkiViewerFragment_documents")
    {
      edges {
        node {
          ...CounterFragment
        }        
      }
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
    { fetchKey, fetchPolicy: 'network-only' }
  );

  const refresh = React.useCallback(() => {
    if (refreshing) {
      return;
    }

    setRefreshing(true);

    fetchQuery(environment, FasolkiQuery, {}, {})
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
      <View style={styles.listContainer}>
        <FlatList
          data={viewer?.documents?.edges?.map(edge => edge?.node) || []}
          renderItem={renderCounter}
          refreshControl={refreshControl}
        />
        {creating && <CounterComposer viewerId={viewer.id} onExit={() => {
          setCreating(false);
        }} />}
        {!creating && (
          <View style={styles.actionCreate}>
            <Button title="Dodaj" onPress={() => {
              setCreating(true);
            }} />
          </View>
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 24,
    backgroundColor: 'white'
  },
  listContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 48,
  },
  list: {
    justifyContent: 'flex-start'
  },
  actionCreate: {
    width: 100,
    marginBottom: 24,
  }
});