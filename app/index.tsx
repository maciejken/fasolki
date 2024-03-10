import * as Linking from 'expo-linking';
import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';

import { ExternalLink } from '@/components/ExternalLink';
import AppContext from '@/appContext';
import Icon, { Ionicon } from '@/components/Icon';

export default function WelcomeLayout() {
  const { setToken } = useContext(AppContext);
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
      <ExternalLink href={process.env.EXPO_PUBLIC_LOGIN_URL!} style={styles.externalLink}>
        <View style={styles.button}>
          <Icon name={Ionicon.Login} style={styles.icon} />
          <Text style={styles.buttonText}>Logowanie</Text>
        </View>
      </ExternalLink>

      <ExternalLink href={process.env.EXPO_PUBLIC_SIGNUP_URL!}>
        <View style={styles.button}>
          <Icon name={Ionicon.Signup} style={styles.icon} />
          <Text style={styles.buttonText}>Rejestracja</Text>
        </View>
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
  externalLink: {
    marginBottom: 12
  },
  button: {
    paddingVertical: 12,
    marginVertical: 12,
    width: 300,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    right: 24
  },
  buttonText: {
    fontSize: 24,
  },
});