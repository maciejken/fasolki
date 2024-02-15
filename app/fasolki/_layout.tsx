import { StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { selectAuthenticatedUserId } from '@/features/auth';

export default function FasolkiScreen() {
  const userId = useAppSelector(selectAuthenticatedUserId);

  return <View style={styles.screen}>
    <View style={styles.info}>
      <Text style={styles.infoText}>{userId}</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    paddingVertical: 12,
    marginVertical: 12,
    width: 300,
    backgroundColor: 'white',
  },
  infoText: {
    fontSize: 24,
  },
});