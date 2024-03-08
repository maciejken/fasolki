import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { FasolkiViewerFragment$key } from "./__generated__/FasolkiViewerFragment.graphql";
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import Counter from "./Counter";
import { useState } from "react";
import CounterComposer from "./CounterComposer";
import Icon, { Ionicon } from "./Icon";

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
          <Pressable
            onPress={() => {
              setCreating(true);
            }}
            style={styles.button}
          >
            <Icon name={Ionicon.Add} style={styles.icon} />
            <Text style={styles.buttonText}>Dodaj</Text>
          </Pressable>
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
  },
  list: {
    justifyContent: 'flex-start'
  },
  button: {
    paddingVertical: 16,
    marginVertical: 12,
    width: 300,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'absolute',
    bottom: 0
  },
  buttonText: {
    fontSize: 18
  },
  icon: {
    position: 'absolute',
    right: 24
  },
});