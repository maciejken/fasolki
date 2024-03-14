import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import Icon, { Ionicon } from "./Icon";

interface ButtonProps {
  icon: Ionicon;
  label?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  primary?: boolean;
}

export default function Button({ label, icon, onPress, primary, style }: ButtonProps) {
  return (
    <Pressable
      style={[styles.button, (primary ? styles.primary : {}), style]}
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
  primary: {
    backgroundColor: '#bbb'
  },
  icon: {
    position: 'absolute',
    right: 24
  },
  buttonText: {
    fontSize: 24,
  },
});