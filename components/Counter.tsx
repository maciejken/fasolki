import React, { createRef, useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";

import { CounterFragment$key } from "./__generated__/CounterFragment.graphql";
import getCounterOptions from "./getCounterOptions";
import AppContext, { initialPickerState } from "@/appContext";
import { Ionicon } from "./Icon";

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

const icons: Record<string, Ionicon> = {
  1: Ionicon.Lock,
  2: Ionicon.Pencil,
  3: Ionicon.Share,
  4: Ionicon.Dots,
}


const getIconName = ({ accessLevel, canSave, isLoading }: {
  accessLevel: number,
  canSave: boolean,
  isLoading: boolean,
}) => {
  if (isLoading) {
    return Ionicon.Time;
  }
  return canSave ? Ionicon.Save : icons[accessLevel.toString()];
}

export default function Counter({
  document,
}: CounterProps) {
  const { id, title, content, accessLevel } = useFragment(CounterFragment, document)
  const [commitMutation, isUpdateInFlight] = useMutation(CounterMutation);
  const [commitRemoval, isRemovalInFlight] = useMutation(CounterDeleteMutation);
  const [counterTitle, setCounterTitle] = useState(title || "");
  const [counterContent, setCounterContent] = useState(content);
  const [canSave, setCanSave] = React.useState(false);
  const [canEdit, canShare, canDelete] = [1, 2, 3].map((level: number) => (accessLevel ?? 0) > level);
  const [titleFocused, setTitleFocused] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);
  const { setPicker } = useContext(AppContext);
  const titleInputRef = createRef<TextInput>();
  const contentInputRef = createRef<TextInput>();
  const isLoading = isUpdateInFlight || isRemovalInFlight;
  const editing = titleFocused || contentFocused;

  const handlePressTitle = () => {
    if (canEdit) {
      setCounterTitle(title || "");
      setCounterContent(content);
      setTitleFocused(true);
    }
  };

  const handlePressContent = () => {
    if (canEdit) {
      setCounterTitle(title || "");
      setCounterContent(content);
      setContentFocused(true);
    }
  };

  const handleTitleFocus = () => {
    if (!titleFocused) {
      setTitleFocused(true);
    }
  };

  const handleContentFocus = () => {
    if (!contentFocused) {
      setContentFocused(true);
    }
  };

  const handleTitleBlur = () => {
    setTitleFocused(false);
  };

  const handleContentBlur = () => {
    setContentFocused(false);
  };

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
    setContentFocused(true);
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
      setContentFocused(false);
    }
  };

  const handleDelete = () => {
    if (canDelete) {
      commitRemoval({
        variables: { id }
      });
    }
  };

  const handleShare = () => {
    if (canShare) {
      console.warn("To be implemented");
    }
  }

  const handleValueChange = (value: string) => {
    const executePickerAction = pickerActions[value];
    if ('function' === typeof executePickerAction) {
      executePickerAction();
    }
  };

  const pickerActions: Record<string, () => void> = {
    share: handleShare,
    delete: handleDelete,
  }

  const handlePickerClose = () => {
    setPicker(initialPickerState);
  };

  const handleActions = () => {
    const hasPicker = canDelete && !(canSave || isLoading);
    const shouldSave = !isLoading && canSave;
    const shouldShare = !isLoading && canShare;
    const shouldEdit = !isLoading && canEdit;

    if (hasPicker) {
      setPicker({
        items: getCounterOptions(),
        prompt: title || id,
        onChange: handleValueChange,
        onClose: handlePickerClose,
      });
    } else if (shouldSave) {
      handleSubmitUpdate();
    } else if (shouldShare) {
      handleShare();
    } else if (shouldEdit) {
      titleInputRef.current?.focus();
    }
  };

  return (
    <View style={styles.counter}>
      <View style={styles.counterData}>
        {!editing && <Pressable onPress={handlePressTitle}>
          <Text style={styles.counterTitle}>{title}</Text>
        </Pressable>}
        {editing && <TextInput
          ref={titleInputRef}
          value={counterTitle}
          style={styles.counterTitle}
          editable={canEdit}
          inputMode="text"
          onChangeText={handleInputTitle}
          onSubmitEditing={handleSubmitTitle}
          enterKeyHint="next"
          autoFocus={titleFocused}
          onFocus={handleTitleFocus}
          onBlur={handleTitleBlur}
        />}
        {!editing && <Pressable onPress={handlePressContent}>
          <Text style={styles.counterContent}>{content}</Text>
        </Pressable>}
        {editing && <TextInput
          ref={contentInputRef}
          value={counterContent}
          style={styles.counterContent}
          editable={canEdit}
          inputMode="numeric"
          onChangeText={handleInputContent}
          onSubmitEditing={handleSubmitUpdate}
          enterKeyHint="done"
          autoFocus={contentFocused}
          onFocus={handleContentFocus}
          onBlur={handleContentBlur}
        />}
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
    minWidth: 150,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 24,
    marginTop: 2
  },
  picker: {
    display: 'none'
  },
  iconContainer: {
    top: 14,

  }
});