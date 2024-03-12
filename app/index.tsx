import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

import AppContext from '@/appContext';
import Icon, { Ionicon } from '@/components/Icon';
import Button from '@/components/Button';
import { restoreToken, saveToken } from '@/appContext/secureStore';

export default function WelcomeLayout() {
  const { setToken } = useContext(AppContext);
  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      const { queryParams } = Linking.parse(url);
      const token = queryParams?.token;

      if ('string' === typeof token) {
        setToken(token);
        saveToken(token);
      }
    }
  }, [url]);

  useEffect(() => {
    restoreToken().then((token: string | null) => {
      if (token) {
        setToken(token);
        router.replace('/fasolki/');
      }
    });
  }, []);

  return (
    <View style={styles.screen}>
      <Button
        label="Logowanie"
        icon={Ionicon.Login}
        onPress={() => {
          WebBrowser.openBrowserAsync(process.env.EXPO_PUBLIC_LOGIN_URL!);
        }}
        style={{ marginBottom: 24 }}
      />

      <Button
        label="Rejestracja"
        icon={Ionicon.Signup}
        onPress={() => {
          WebBrowser.openBrowserAsync(process.env.EXPO_PUBLIC_SIGNUP_URL!)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});