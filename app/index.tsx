import * as Linking from "expo-linking";
import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

import AppContext from "@/appContext";
import { Ionicon } from "@/components/Icon";
import Button from "@/components/Button";
import { restoreToken, saveToken } from "@/appContext/secureStore";
import { useAppRouter } from "@/components/useAppRouter";

export default function WelcomeLayout() {
  const { setToken } = useContext(AppContext);
  const url = Linking.useURL();
  const { goHome } = useAppRouter();

  useEffect(() => {
    if (url) {
      const { queryParams } = Linking.parse(url);
      const token = queryParams?.token;

      if ("string" === typeof token) {
        setToken(token);
        saveToken(token);
      }
    }
  }, [url]);

  useEffect(() => {
    restoreToken().then((token: string | null) => {
      if (token) {
        setToken(token);
        goHome();
      }
    });
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Button
          label="Logowanie"
          icon={Ionicon.Login}
          onPress={() => {
            const url = process.env.EXPO_PUBLIC_LOGIN_URL;
            if (url) {
              WebBrowser.openBrowserAsync(
                `${url}?${new URLSearchParams({
                  mobile: "true",
                })}`
              );
            }
          }}
          style={{ marginBottom: 24 }}
        />

        <Button
          label="Rejestracja"
          icon={Ionicon.Signup}
          onPress={() => {
            const url = process.env.EXPO_PUBLIC_SIGNUP_URL;
            if (url) {
              WebBrowser.openBrowserAsync(
                `${url}?${new URLSearchParams({
                  mobile: "true",
                })}`
              );
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 300,
  },
});
