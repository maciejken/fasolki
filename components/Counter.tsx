import React, { createRef } from "react";
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

const getIcon = (canEdit: boolean, canSave: boolean, loading: boolean) => {
  if (loading) {
    return "time-outline";
  }

  if (!canEdit) {
    return "lock-closed-outline"
  }

  return canSave ? "save-outline" : "ellipsis-vertical-outline"
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
  const contentInputRef = createRef<TextInput>();
  const shouldShowShareIcon = !(isMutationInFlight || canSave) && canShare;

  const handleInputTitle = (value: string) => {
    setCounterTitle(value);
    setCanSave(!!counterContent);
  };

  const handleInputContent = (value: string) => {
    setCounterContent(value);
    setCanSave(!!value);
  };

  const handleSubmitTitle = () => {
    contentInputRef.current?.focus();
    const end = counterTitle.length;
    contentInputRef.current?.setSelection(end, end);
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
          onChangeText={handleInputTitle}
          onSubmitEditing={handleSubmitTitle}
          enterKeyHint="next"
        />
        <TextInput
          ref={contentInputRef}
          value={counterContent}
          style={styles.counterContent}
          editable={canEdit}
          inputMode="numeric"
          onChangeText={handleInputContent}
          onSubmitEditing={handleSubmitUpdate}
          enterKeyHint="done"
        />
      </View>
      <View style={styles.actions}>
        <Ionicons
          name={getIcon(canEdit, canSave, isMutationInFlight)}
          size={24}
          color={canEdit ? 'black' : '#aaa'}
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
    // width: 32
  }
});