import * as SecureStore from "expo-secure-store";
import { Buffer } from "buffer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { genericTokenExpiryDateKey, genericTokenKey } from "./constants";
import { JwtPayload } from "./types";

function getTokenExpiry(token: string): Date | null {
  const [_, base64Payload] = token.split(".");
  const { exp }: JwtPayload = JSON.parse(
    Buffer.from(base64Payload, "base64").toString("ascii"),
  );
  return exp ? new Date(exp * 1000) : null;
}

export async function restoreToken() {
  const expiryDateISOString = await AsyncStorage.getItem(
    genericTokenExpiryDateKey,
  );
  let valid = false;

  if (expiryDateISOString) {
    const expiryDate = new Date(expiryDateISOString);
    valid = expiryDate.getTime() > new Date().getTime();
  }

  return valid ? SecureStore.getItemAsync(genericTokenKey) : null;
}

export async function saveToken(token: string): Promise<void> {
  const expiryDate: Date | null = getTokenExpiry(token);

  if (expiryDate) {
    await AsyncStorage.setItem(
      genericTokenExpiryDateKey,
      expiryDate.toISOString(),
    );

    return SecureStore.setItemAsync(genericTokenKey, token, {
      requireAuthentication: true,
    });
  }
}
