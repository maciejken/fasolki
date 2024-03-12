import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import Icon, { Ionicon } from "./Icon";

interface ButtonProps {
  icon: Ionicon;
  label?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  selected?: boolean;
}

export default function Button({ label, icon, onPress, selected, style }: ButtonProps) {
  return (
    <Pressable
      style={[styles.button, (selected ? styles.selected : {}), style]}
      onPress={onPress}
    >
      {label && <Text style={styles.buttonText}>{label}</Text>}
      <Icon name={icon} style={label ? styles.icon : undefined} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingVertical: 16,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderWidth: 1,
    borderColor: 'black'
  },
  icon: {
    position: 'absolute',
    right: 24
  },
  buttonText: {
    fontSize: 24,
  },
});