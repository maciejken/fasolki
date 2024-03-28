import React from "react";
import { StatusBar } from "expo-status-bar";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import RelayEnvironment from "@/relay/RelayEnvironment";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function FasolkiLayout() {
  return (
    <RelayEnvironment>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </RelayEnvironment>
  );
}
