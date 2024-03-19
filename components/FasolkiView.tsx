import { usePaginationFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { FasolkiViewerFragment$key } from "./__generated__/FasolkiViewerFragment.graphql";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Counter from "./Counter";
import CounterComposer from "./CounterComposer";
import { page } from "@/constants";

const FasolkiViewerFragment = graphql`
  fragment FasolkiViewerFragment on Viewer
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 10 }
    cursor: { type: "String" }
  )
  @refetchable(queryName: "FasolkiPaginationQuery") {
    id
    documents(first: $count, after: $cursor)
      @connection(key: "FasolkiViewerFragment_documents") {
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

export default function FasolkiView({
  viewer,
  refreshing,
  refresh,
}: FasolkiViewProps) {
  const { data, loadNext } = usePaginationFragment(
    FasolkiViewerFragment,
    viewer
  );
  const handleEndReached = () => {
    loadNext(page);
  };

  const renderCounter = ({ item }: any) => <Counter document={item} />;

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
  );

  return (
    <View style={styles.screen}>
      <CounterComposer viewerId={data.id} />
      <FlatList
        data={data?.documents?.edges?.map((edge) => edge?.node) || []}
        renderItem={renderCounter}
        refreshControl={refreshControl}
        contentContainerStyle={styles.listContainer}
        removeClippedSubviews={false}
        onEndReached={handleEndReached}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "white",
    alignItems: "center",
  },
  listContainer: {
    flexGrow: 1,
  },
  button: {
    paddingVertical: 16,
    marginVertical: 12,
    width: 300,
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
  },
  icon: {
    position: "absolute",
    right: 24,
  },
});
