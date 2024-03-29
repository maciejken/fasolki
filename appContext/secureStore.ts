import * as SecureStore from "expo-secure-store";
import { Buffer } from "buffer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RSA } from "react-native-rsa-native";

import {
  genericTokenExpiryDateKey,
  genericTokenKey,
  rsaBits,
  rsaPrivateKeyKey,
  rsaPublicKeyKey,
} from "./constants";
import { JwtPayload } from "./types";

function getTokenExpiry(token: string): Date | null {
  const [_, base64Payload] = token.split(".");
  const { exp }: JwtPayload = JSON.parse(
    Buffer.from(base64Payload, "base64").toString("ascii")
  );
  return exp ? new Date(exp * 1000) : null;
}

export async function restoreToken() {
  const expiryDateISOString = await AsyncStorage.getItem(
    genericTokenExpiryDateKey
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
      expiryDate.toISOString()
    );

    return SecureStore.setItemAsync(genericTokenKey, token, {
      requireAuthentication: true,
    });
  }
}

function pemToUrlParamFormat(pem: string, del: string = "\n") {
  const lines = pem.split(del);
  const base64Lines = lines.filter(
    (line) => !(line.startsWith("-----BEGIN") || line.startsWith("-----END"))
  );
  return base64Lines.join("");
}

export async function generateKeys() {
  const keys = await RSA.generateKeys(rsaBits);
  const publicKey = pemToUrlParamFormat(keys.public);
  await Promise.all([
    SecureStore.setItemAsync(rsaPrivateKeyKey, keys.private),
    SecureStore.setItemAsync(rsaPublicKeyKey, publicKey),
  ]);
  return publicKey;
}

export async function getPublicKey() {
  const publicKey = await SecureStore.getItemAsync(rsaPublicKeyKey);
  return publicKey || generateKeys();
}

export function getPrivateKey() {
  return SecureStore.getItemAsync(rsaPrivateKeyKey);
}

export async function decrypt(value: string) {
  const privateKey = await SecureStore.getItemAsync(rsaPrivateKeyKey);
  let decryptedValue = null;

  if (privateKey) {
    decryptedValue = await RSA.decrypt(value, privateKey);
  }

  return decryptedValue;
}
