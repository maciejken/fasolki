import * as React from "react";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery, useRelayEnvironment } from "react-relay";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import type { FasolkiQuery as FasolkiQueryType } from './__generated__/FasolkiQuery.graphql';
import { fetchQuery } from "relay-runtime";
import Counter from "./Counter";

const FasolkiQuery = graphql`
  query FasolkiQuery {
    viewer {
      id
      email
      documents {
        id
        type
        title
        content
        accessLevel
      }
      groups {
        id
        documents {
          id
          type
          title
          content
          accessLevel
        }
      }
    }
  }
`;

const getTypeFilter = (type: string) => (d: any) => d?.type === type;

export default function Fasolki() {
  const [fetchKey, setFetchKey] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
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

  const userDocuments = data.viewer?.documents.filter(getTypeFilter('counter')) || [];
  const userDocumentIds = userDocuments.map(d => d?.id).filter(Boolean);
  const groups = data.viewer?.groups || [];
  let groupDocuments: any[] = [];

  for (const g of groups) {
    if (g?.documents.length) {
      groupDocuments = [
        ...groupDocuments,
        ...g.documents
          .filter(d => !userDocumentIds.includes(d?.id))
          .filter(getTypeFilter('counter'))
      ];
    }
  }

  const fasolki = [...userDocuments, ...groupDocuments];

  const renderCounter = ({ item }: any) => (
    <Counter
      id={item.id}
      type={item.type}
      title={item.title}
      content={item.content}
      accessLevel={item.accessLevel}
    />
  );

  const refreshControl = <RefreshControl refreshing={refreshing} onRefresh={refresh} />;

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <FlatList
          data={fasolki}
          renderItem={renderCounter}
          refreshControl={refreshControl}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 18
  },
  list: {
    paddingVertical: 12,
    marginVertical: 12,
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
});