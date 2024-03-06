import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { FasolkiViewerFragment$key } from "./__generated__/FasolkiViewerFragment.graphql";
import { Button, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Counter from "./Counter";
import { useState } from "react";
import CounterComposer from "./CounterComposer";

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

interface FasolkiViewProps {
  viewer: FasolkiViewerFragment$key;
  refreshing: boolean;
  refresh: () => void;
}

export default function FasolkiView({ viewer, refreshing, refresh }: FasolkiViewProps) {
  const [creating, setCreating] = useState(false);
  const data = useFragment(FasolkiViewerFragment, viewer);

  const renderCounter = ({ item }: any) => <Counter document={item} />

  const refreshControl = <RefreshControl refreshing={refreshing} onRefresh={refresh} />;

  return (
    <View style={styles.screen}>
      <View style={styles.listContainer}>
        <FlatList
          data={data?.documents?.edges?.map(edge => edge?.node) || []}
          renderItem={renderCounter}
          refreshControl={refreshControl}
        />
        {creating && <CounterComposer viewerId={data.id} onExit={() => {
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