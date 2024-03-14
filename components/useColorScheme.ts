import { useColorScheme as useNativeColorScheme } from "react-native";

export type ColorScheme = "dark" | "light";

export function useColorScheme(): ColorScheme {
  return useNativeColorScheme() ?? "light";
}
