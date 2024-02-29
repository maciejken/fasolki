import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";

const CounterMutation = graphql`
  mutation CounterMutation(
    $id: String!
    $title: String
    $content: String
  ) {
    updateDocument(
      id: $id,
      title: $title,
      content: $content
    ) {
      id
      title
      content
    }
  }
`;

interface CounterProps {
  id: string;
  type: string;
  title: string;
  content: string;
  accessLevel: number;
}

const getIconColor = (enabled: boolean) => enabled ? 'black' : 'white';

const getFirstIcon = (canSave: boolean, loading: boolean) => {
  if (loading) {
    return "time-outline";
  }
  return canSave ? "save-outline" : "pencil-outline"
}

export default function Counter({ id, title, content, accessLevel }: CounterProps) {
  const [commitMutation, isMutationInFlight] = useMutation(CounterMutation);
  const [counterTitle, setCounterTitle] = React.useState(title);
  const [counterContent, setCounterContent] = React.useState(content);
  const [canSave, setCanSave] = React.useState(false);
  const [canEdit, canShare] = [accessLevel > 1, accessLevel > 2];
  const shouldShowShareIcon = !(isMutationInFlight || canSave) && canShare;

  const handlePressIn = () => {
    if (canEdit) {
      setCanSave(true);
    }
  }

  const handleSubmit = () => {
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
          onSubmitEditing={handleSubmit}
        />
        <TextInput
          value={counterContent}
          style={styles.counterContent}
          editable={canEdit}
          inputMode="numeric"
          onChangeText={setCounterContent}
          onPressIn={handlePressIn}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.actions}>
        <Ionicons
          name={getFirstIcon(canSave, isMutationInFlight)}
          size={24}
          color={getIconColor(canEdit)}
          onPress={() => {
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
          }}
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