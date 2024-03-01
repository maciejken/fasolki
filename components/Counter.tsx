import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";
import { CounterDocumentFragment$key } from "./__generated__/CounterDocumentFragment.graphql";

const CounterDocumentFragment = graphql`
  fragment CounterDocumentFragment on Document {
    id
    type
    title
    content
    accessLevel
  }
`;

const CounterUpdateMutation = graphql`
  mutation CounterUpdateMutation(
    $id: String!
    $title: String
    $content: String
  ) {
    updateDocument(
      id: $id,
      title: $title,
      content: $content
    ) {
      ...CounterDocumentFragment
    }
  }
`;

interface CounterProps {
  document: CounterDocumentFragment$key;
}

const getIconColor = (enabled: boolean) => enabled ? 'black' : 'white';

const getFirstIcon = (canSave: boolean, loading: boolean) => {
  if (loading) {
    return "time-outline";
  }
  return canSave ? "save-outline" : "pencil-outline"
}

export default function Counter({
  document,
}: CounterProps) {
  const { id, title, content, accessLevel } = useFragment(CounterDocumentFragment, document)
  const [commitMutation, isMutationInFlight] = useMutation(CounterUpdateMutation);
  const [counterTitle, setCounterTitle] = React.useState(title || "");
  const [counterContent, setCounterContent] = React.useState(content);
  const [canSave, setCanSave] = React.useState(false);
  const [canEdit, canShare] = [(accessLevel ?? 0) > 1, (accessLevel ?? 0) > 2];
  const loading = isMutationInFlight;
  const shouldShowShareIcon = !(loading || canSave) && canShare;

  const handlePressIn = () => {
    if (canEdit) {
      setCanSave(true);
    }
  }

  const handleSubmitUpdate = () => {
    if (canSave) {
      commitMutation({
        variables: {
          id,
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
          editable={canEdit}
          inputMode="text"
          onChangeText={setCounterTitle}
          onPressIn={handlePressIn}
          onSubmitEditing={handleSubmitUpdate}
        />
        <TextInput
          value={counterContent}
          style={styles.counterContent}
          editable={canEdit}
          inputMode="numeric"
          onChangeText={setCounterContent}
          onPressIn={handlePressIn}
          onSubmitEditing={handleSubmitUpdate}
        />
      </View>
      <View style={styles.actions}>
        <Ionicons
          name={getFirstIcon(canSave, isMutationInFlight)}
          size={24}
          color={getIconColor(canEdit)}
          onPress={handleSubmitUpdate}
        />
        <Ionicons
          name="share-social-outline"
          size={24}
          color={getIconColor(shouldShowShareIcon)}
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