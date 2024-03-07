import React, { createRef, useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";

import { CounterFragment$key } from "./__generated__/CounterFragment.graphql";
import getCounterOptions from "./getCounterOptions";
import AppContext, { initialPickerState } from "@/appContext";

const CounterFragment = graphql`
  fragment CounterFragment on Document {
    id
    type
    title
    content
    accessLevel
  }
`;

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
      viewer {
        ...FasolkiViewerFragment
      }
    }
  }
`;

const CounterDeleteMutation = graphql`
  mutation CounterDeleteMutation(
    $id: String!
  ) {
  deleteDocument(id: $id)
    {
      viewer {
        ...FasolkiViewerFragment
      }
    }
  }
`;

interface CounterProps {
  document: CounterFragment$key;
}

const getIconColor = (enabled: boolean) => enabled ? 'black' : 'white';

type IconName =
  | "lock-closed-outline"
  | "pencil-outline"
  | "share-social-outline"
  | "ellipsis-vertical-outline"
  | "time-outline"
  | "save-outline";

const icons: Record<string, IconName> = {
  1: "lock-closed-outline",
  2: "pencil-outline",
  3: "share-social-outline",
  4: "ellipsis-vertical-outline",
  time: "time-outline",
  save: "save-outline"
}


const getIconName = ({ accessLevel, canSave, isLoading }: {
  accessLevel: number,
  canSave: boolean,
  isLoading: boolean,
}) => {
  if (isLoading) {
    return icons.time;
  }
  return canSave ? icons.save : icons[accessLevel.toString()];
}

export default function Counter({
  document,
}: CounterProps) {
  const { id, title, content, accessLevel } = useFragment(CounterFragment, document)
  const [commitMutation, isUpdateInFlight] = useMutation(CounterMutation);
  const [commitRemoval, isRemovalInFlight] = useMutation(CounterDeleteMutation);
  const [counterTitle, setCounterTitle] = React.useState(title || "");
  const [counterContent, setCounterContent] = React.useState(content);
  const [canSave, setCanSave] = React.useState(false);
  const [canEdit, canShare, canDelete] = [1, 2, 3].map((level: number) => (accessLevel ?? 0) > level);
  const { setPicker } = useContext(AppContext);
  const titleInputRef = createRef<TextInput>();
  const contentInputRef = createRef<TextInput>();
  const isLoading = isUpdateInFlight || isRemovalInFlight;

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
  };

  const handleDelete = () => {
    if (canDelete) {
      commitRemoval({
        variables: { id }
      });
    }
  };

  const handleValueChange = (value: string) => {
    const executePickerAction = pickerActions[value];
    if ('function' === typeof executePickerAction) {
      executePickerAction();
    }
  };

  const pickerActions: Record<string, () => void> = {
    edit: () => titleInputRef.current?.focus(),
    share: () => undefined,
    delete: handleDelete,
  }

  const handlePickerClose = (isValueChanged: boolean) => {
    if (!isValueChanged) {
      console.debug('title ref:', titleInputRef.current)
      titleInputRef.current?.focus();
    }
    setPicker(initialPickerState);
  };

  const handleActions = () => {
    const hasPicker = canDelete && !(canSave || isLoading);
    const shouldSave = !isLoading && canSave;
    const shouldShare = !isLoading && canShare;
    const shouldEdit = !isLoading && canEdit;

    if (hasPicker) {
      setPicker({
        items: getCounterOptions(id),
        prompt: title || id,
        onChange: handleValueChange,
        onClose: handlePickerClose,
      });
    } else if (shouldSave) {
      handleSubmitUpdate();
    } else if (shouldShare) {
      console.warn("To be implemented");
    } else if (shouldEdit) {
      titleInputRef.current?.focus();
    }
  };

  return (
    <View style={styles.counter}>
      <View style={styles.counterData}>
        <TextInput
          ref={titleInputRef}
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
          name={getIconName({
            accessLevel: accessLevel || 0,
            canSave,
            isLoading,
          })}
          size={24}
          color={canEdit ? 'black' : '#aaa'}
          onPress={handleActions}
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
    marginRight: 16
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 24
  },
  picker: {
    display: 'none'
  },
  iconContainer: {
    top: 14,

  }
});