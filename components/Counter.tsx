import React, { createRef, useContext, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";

import { CounterFragment$key } from "./__generated__/CounterFragment.graphql";
import { useCounterOptions } from "./useCounterOptions";
import AppContext, { initialPickerState } from "@/appContext";
import Icon, { Ionicon } from "./Icon";
import { Text, View } from "./Themed";
import { ColorScheme, useColorScheme } from "./useColorScheme";
import { useAppRouter } from "./useAppRouter";

const CounterFragment = graphql`
  fragment CounterFragment on Document {
    id
    type
    title
    content
    accessLevel
  }
`;

const CounterUpdateFragment = graphql`
  fragment CounterUpdateFragment on DocumentsConnectionEdge {
    node {
      ...CounterFragment
    }
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
      documentEdge {
        ...CounterUpdateFragment
      }
    }
  }
`;

interface CounterProps {
  document: CounterFragment$key;
}

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
  const { id, title, content, accessLevel, type } = useFragment(CounterFragment, document)
  const [commitMutation, isUpdateInFlight] = useMutation(CounterMutation);
  const [counterTitle, setCounterTitle] = useState(title || "");
  const [counterContent, setCounterContent] = useState(content);
  const [canSave, setCanSave] = React.useState(false);
  const [canEdit, canShare, canDelete] = [1, 2, 3].map((level: number) => (accessLevel ?? 0) > level);
  const [titleFocused, setTitleFocused] = useState(false);
  const [contentFocused, setContentFocused] = useState(false);
  const { setPicker } = useContext(AppContext);
  const titleInputRef = createRef<TextInput>();
  const contentInputRef = createRef<TextInput>();
  const isLoading = isUpdateInFlight;
  const editing = titleFocused || contentFocused;
  const { shareDocument } = useAppRouter();

  const theme = useColorScheme();
  const styles = getStyles(theme);

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

  const handleShare = () => {
    if (canShare) {
      shareDocument({ id });
    }
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
        items: useCounterOptions(id),
        prompt: title || id,
        onClose: handlePickerClose,
      });
    } else if (shouldSave) {
      handleSubmitUpdate();
    } else if (shouldShare) {
      handleShare();
    } else if (shouldEdit) {
      setTitleFocused(true);
    }
  };

  if (type !== 'counter') {
    return null;
  }

  return (
    <View style={styles.counter}>
      <View style={styles.counterData}>
        {!editing && <Pressable onPress={handlePressTitle}>
          <Text style={styles.counterTitle}>{title}</Text>
        </Pressable>}
        {editing && <TextInput
          ref={titleInputRef}
          value={counterTitle}
          style={[styles.counterTitle, styles.counterInput]}
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
          style={[styles.counterContent, styles.counterInput]}
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
        <Icon
          name={getIconName({
            accessLevel: accessLevel || 0,
            canSave,
            isLoading,
          })}
          size={24}
          color={theme === 'dark' ? 'white' : 'black'}
          onPress={handleActions}
        />
      </View>
    </View>
  )
}

const getStyles = (theme: ColorScheme) => StyleSheet.create({
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
  counterInput: {
    color: theme === 'dark' ? 'white' : 'black',
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