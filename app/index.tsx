import * as Linking from "expo-linking";
import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

import AppContext from "@/appContext";
import { Ionicon } from "@/components/Icon";
import Button from "@/components/Button";
import {
  decrypt,
  getPublicKey,
  restoreToken,
  saveToken,
} from "@/appContext/secureStore";
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
        decrypt(token)
          .then((decrypted) => {
            if (decrypted) {
              setToken(decrypted);
              saveToken(decrypted);
            }
          })
          .catch(() => {
            console.error("Failed to decrypt token.");
          });
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
          onPress={async () => {
            const url = `${process.env
              .EXPO_PUBLIC_LOGIN_URL!}?${new URLSearchParams({
              mobile: "true",
              publicKey: encodeURIComponent(await getPublicKey()),
            })}`;
            WebBrowser.openBrowserAsync(url);
          }}
          style={{ marginBottom: 24 }}
        />

        <Button
          label="Rejestracja"
          icon={Ionicon.Signup}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              `${process.env.EXPO_PUBLIC_SIGNUP_URL!}?mobile=true`
            );
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
