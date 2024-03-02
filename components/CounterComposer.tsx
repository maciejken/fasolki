import React, { createRef } from "react";
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

interface CounterComposerProps {
  onExit?: () => void;
}

const getIconName = (canSave: boolean, loading: boolean) => {
  if (loading) return 'time-outline';

  return canSave ? 'save-outline' : 'close-outline';
}

export default function CounterComposer({ onExit }: CounterComposerProps) {

  const [counterTitle, setCounterTitle] = React.useState("");
  const [counterContent, setCounterContent] = React.useState("");
  const [canSave, setCanSave] = React.useState(false);
  const contentInputRef = createRef<TextInput>();

  const [commitMutation, isMutationInFlight] = useMutation(CounterComposerMutation);

  const handleChangeTitle = (value: string) => {
    setCounterTitle(value);
    setCanSave(!!counterContent);
  };

  const handleChangeContent = (value: string) => {
    setCounterContent(value);
    setCanSave(!!value);
  };

  const handleSubmitTitle = () => {
    contentInputRef.current?.focus();
  }

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

    if ('function' === typeof onExit) onExit();
  }

  return (
    <View style={styles.counter}>
      <View style={styles.counterData}>
        <TextInput
          value={counterTitle}
          style={styles.counterTitle}
          inputMode="text"
          onChangeText={handleChangeTitle}
          onSubmitEditing={handleSubmitTitle}
          placeholder="Tytuł"
          autoFocus
          enterKeyHint="next"
        />
        <TextInput
          ref={contentInputRef}
          value={counterContent}
          style={styles.counterContent}
          inputMode="numeric"
          onChangeText={handleChangeContent}
          onSubmitEditing={handleSubmitUpdate}
          placeholder="n"
          enterKeyHint="done"
        />
      </View>
      <View style={styles.actions}>
        <Ionicons
          name={getIconName(canSave, isMutationInFlight)}
          size={24}
          color="black"
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
    marginTop: -8,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#faf489'
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
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});