import * as Linking from 'expo-linking';
import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';

import { ExternalLink } from '@/components/ExternalLink';
import { AuthContext } from '@/features/auth/authContext';

export default function WelcomeLayout() {
  const { setToken } = useContext(AuthContext);
  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      const { queryParams } = Linking.parse(url);
      const token = queryParams?.token;

      if ('string' === typeof token) {
        setToken(token);
      }
    }
  }, [url]);

  return (
    <View style={styles.screen}>
      <ExternalLink href={process.env.EXPO_PUBLIC_LOGIN_URL!} style={styles.button}>
        <Text style={styles.buttonText}>Logowanie</Text>
      </ExternalLink>

      <ExternalLink href={process.env.EXPO_PUBLIC_SIGNUP_URL!} style={styles.button}>
        <Text style={styles.buttonText}>Rejestracja</Text>
      </ExternalLink>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    marginVertical: 12,
    width: 300,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 24,
  },
});