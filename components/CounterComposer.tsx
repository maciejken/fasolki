import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";

const CounterComposerFragment = graphql`
  fragment CounterComposerFragment on Document {
    id
  }
`;

const CounterComposerMutation = graphql`
  mutation CounterComposerMutation(
    $type: String!
    $title: String
    $content: String!
  ) {
    addDocument(
      type: $type,
      title: $title,
      content: $content
    ) {
      ...CounterComposerFragment
    }
  }
`;

export default function CounterComposer() {

  const [counterTitle, setCounterTitle] = React.useState("");
  const [counterContent, setCounterContent] = React.useState("");
  const [canSave, setCanSave] = React.useState(false);

  const [commitMutation, isMutationInFlight] = useMutation(CounterComposerMutation);

  const handleSubmitUpdate = () => {
    if (canSave) {
      commitMutation({
        variables: {
          type: 'counter',
          title: counterTitle,
          content: counterContent
        }
      })
      setCanSave(false);
    }
  }

  return (
    <View style={styles.counter}>
      <View style={styles.counterData}>
        <TextInput
          value={counterTitle}
          style={styles.counterTitle}
          inputMode="text"
          onChangeText={setCounterTitle}
          onSubmitEditing={handleSubmitUpdate}
        />
        <TextInput
          value={counterContent}
          style={styles.counterContent}
          inputMode="numeric"
          onChangeText={setCounterContent}
          onSubmitEditing={handleSubmitUpdate}
        />
      </View>
      <View style={styles.actions}>
        <Ionicons
          name={`${isMutationInFlight ? 'time' : 'save'}-outline`}
          size={24}
          color={canSave ? 'black' : 'white'}
          onPress={handleSubmitUpdate}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    width: '100%',
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
  },
  counterData: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 32
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 64
  }
});