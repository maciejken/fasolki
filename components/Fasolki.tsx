import * as React from "react";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import type { FasolkiQuery as FasolkiQueryType } from './__generated__/FasolkiQuery.graphql';

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
      }
      groups {
        id
        documents {
          id
          type
          title
          content
        }
      }
    }
  }
`;

interface Document {
  type: string;
  title: string;
  content: string;
}

interface FasolkiProps {
  queryRef: any;
  refresh: () => void;
}

const getTypeFilter = (type: string) => (d: any) => d?.type === type;

export default function Fasolki() {
  const [fetchKey, setFetchKey] = React.useState(0);

  let data = useLazyLoadQuery<FasolkiQueryType>(
    FasolkiQuery,
    {},
    { fetchKey, fetchPolicy: 'network-only' },
  );

  const refresh = React.useCallback(() => {
    setFetchKey(prev => prev + 1)
  }, []);

  const userDocuments = data.viewer?.documents.filter(getTypeFilter('counter')) || [];
  const groups = data.viewer?.groups || [];
  let groupDocuments: any[] = [];

  for (const g of groups) {
    if (g?.documents.length) {
      groupDocuments = [...groupDocuments, ...g.documents.filter(getTypeFilter('counter'))];
    }
  }

  const fasolki = [...userDocuments, ...groupDocuments];

  const renderCounter = ({ item }: any) => (
    <View style={styles.counter}>
      <Text style={styles.counterTitle}>{item.title}</Text>
      <Text style={styles.counterContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <FlatList data={fasolki} renderItem={renderCounter} />
      </View>
      <View>
        <Button title="Odśwież" onPress={refresh} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingVertical: 12,
    marginVertical: 12,
    width: 300,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  counter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 12
  },
  counterTitle: {
    fontSize: 16,
  },
  counterContent: {
    fontSize: 24,
  }
});