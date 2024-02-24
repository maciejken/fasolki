import * as React from "react";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";
import { StyleSheet, Text, View } from "react-native";
import type { FasolkiQuery as FasolkiQueryType } from './__generated__/FasolkiQuery.graphql';

const FasolkiQuery = graphql`
  query FasolkiQuery {
    viewer {
      id
      email
      documents {
        id
        title
        content
      }
    }
  }
`;

export default function Fasolki() {
  let data = useLazyLoadQuery<FasolkiQueryType>(
    FasolkiQuery,
    {}
  );

  const email = data.viewer.email;

  return (
    <View style={styles.screen}>
      <View style={styles.info}>
        <Text style={styles.infoText}>{email || 'loading...'}</Text>
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
  info: {
    paddingVertical: 12,
    marginVertical: 12,
    width: 300,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  infoText: {
    fontSize: 24,
  },
});