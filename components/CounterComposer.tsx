import { createRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ConnectionHandler, graphql } from "relay-runtime";
import { useMutation } from "react-relay";
import { Ionicon } from "./Icon";

const CounterComposerMutation = graphql`
  mutation CounterComposerMutation(
    $type: String!,
    $title: String,
    $content: String!,
    $connections: [ID!]!,
  ) {
    addDocument(
      type: $type,
      title: $title,
      content: $content
    ) {
      documentEdge
        @prependEdge(connections: $connections)
      {
        node {
          ...CounterFragment
        }
      }
    }
  }
`;

interface CounterComposerProps {
  viewerId: string;
}

const getIconName = (canSave: boolean, loading: boolean) => {
  if (loading) return Ionicon.Time;

  return canSave ? Ionicon.Save : Ionicon.Close;
}

export default function CounterComposer({ viewerId }: CounterComposerProps) {

  const [counterTitle, setCounterTitle] = useState("");
  const [counterContent, setCounterContent] = useState("");
  const [canSave, setCanSave] = useState(false);
  const titleInputRef = createRef<TextInput>();
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
      const connectionId = ConnectionHandler.getConnectionID(
        viewerId,
        'FasolkiViewerFragment_documents',
      );
      commitMutation({
        variables: {
          type: 'counter',
          title: counterTitle,
          content: counterContent,
          connections: [connectionId],
        },
        onCompleted() {
          setCounterTitle("");
          setCounterContent("");
        }
      })
      setCanSave(false);
    }
    titleInputRef.current?.blur();
    contentInputRef.current?.blur();
  }

  const iconName: Ionicon = getIconName(canSave, isMutationInFlight);

  return (
    <View style={styles.counter}>
      <View style={styles.counterData}>
        <TextInput
          ref={titleInputRef}
          value={counterTitle}
          style={styles.counterTitle}
          inputMode="text"
          onChangeText={handleChangeTitle}
          onSubmitEditing={handleSubmitTitle}
          placeholder="Tytuł"
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
          name={iconName}
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
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#faf489',
  },
  counterTitle: {
    fontSize: 16,
    minWidth: 150
  },
  counterContent: {
    fontSize: 24,
    minWidth: 150,
    textAlign: 'right'
  },
  counterData: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 16
  },
  actions: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});