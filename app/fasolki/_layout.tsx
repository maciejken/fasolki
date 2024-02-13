import { StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { selectAuthToken } from '@/features/auth';

export default function FasolkiScreen() {
  const token = useAppSelector(selectAuthToken);

  return <View style={styles.screen}>
    <View style={styles.info}>
      <Text style={styles.infoText}>Token: {token}</Text>
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