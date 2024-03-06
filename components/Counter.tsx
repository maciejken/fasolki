import React, { createRef, useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";
import { Picker } from "@react-native-picker/picker";

import { CounterFragment$key } from "./__generated__/CounterFragment.graphql";
import getCounterOptions, { CounterAction } from "./getCounterOptions";

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

interface CounterProps {
  document: CounterFragment$key;
}

const getIconColor = (enabled: boolean) => enabled ? 'black' : 'white';

const getIconName = ({ canEdit, canSave, canShare, isLoading }: {
  canEdit: boolean,
  canSave: boolean,
  canShare: boolean,
  isLoading: boolean,
}) => {
  if (isLoading) {
    return "time-outline";
  }

  if (!canEdit) {
    return "lock-closed-outline"
  }

  if (canShare && !canSave) {
    return "ellipsis-vertical-outline";
  }

  return canSave ? "save-outline" : "pencil-outline";
}

export default function Counter({
  document,
}: CounterProps) {
  const { id, title, content, accessLevel } = useFragment(CounterFragment, document)
  const [commitMutation, isMutationInFlight] = useMutation(CounterMutation);
  const [counterTitle, setCounterTitle] = React.useState(title || "");
  const [counterContent, setCounterContent] = React.useState(content);
  const [canSave, setCanSave] = React.useState(false);
  const [canEdit, canShare] = [(accessLevel ?? 0) > 1, (accessLevel ?? 0) > 2];
  const counterOptions = getCounterOptions(accessLevel as number);
  const [isPickerOpen, setPickerOpen] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<CounterAction>("edit");
  const titleInputRef = createRef<TextInput>();
  const contentInputRef = createRef<TextInput>();
  const pickerRef = createRef<any>();

  useEffect(() => {
    if (isPickerOpen && pickerRef.current) {
      pickerRef.current.focus();
    }
  }, [isPickerOpen, pickerRef.current]);

  const pickerActions: Record<"edit" | "share" | "delete", () => void> = {
    edit: () => undefined,
    share: () => undefined,
    delete: () => undefined,
  }

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

  const handleActions = () => {
    const hasPicker = canShare && !(canSave || isMutationInFlight);
    const shouldSave = !isMutationInFlight && canSave;
    const shouldEdit = !isMutationInFlight && canEdit;

    if (hasPicker) {
      setPickerOpen(true);
    } else if (shouldSave) {
      handleSubmitUpdate();
    } else if (shouldEdit) {
      titleInputRef.current?.focus();
    }
  };

  const handleValueChange = (value: CounterAction) => {
    setSelectedAction(value);
  };

  const handlePickerClose = () => {
    const executePickerAction = pickerActions[selectedAction];
    executePickerAction();
    setPickerOpen(false);
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
            canEdit,
            canSave,
            canShare,
            isLoading: isMutationInFlight,
          })}
          size={24}
          color={canEdit ? 'black' : '#aaa'}
          onPress={handleActions}
        />
        {isPickerOpen && <Picker
          ref={pickerRef}
          prompt={title || id}
          style={{ display: "none" }}
          onValueChange={handleValueChange}
          onBlur={handlePickerClose}
        >
          {counterOptions.map((option) =>
            <Picker.Item
              key={`${id}-${option.value}`}
              label={option.label}
              value={option.value}
            />
          )}
        </Picker>}
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