import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CounterProps {
  id: string;
  type: string;
  title: string;
  content: string;
}

export default function Counter({ id, title, content }: CounterProps) {
  const [editing, setEditing] = React.useState(false);
  return (
    <View style={styles.counter}>
      <Text style={styles.counterTitle}>{title}</Text>
      <Text style={styles.counterContent}>{content}</Text>
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
  }
});