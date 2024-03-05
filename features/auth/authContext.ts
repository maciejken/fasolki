import { createContext } from "react";

export const AuthContext = createContext({
  token: "",
  setToken: (value: string) => {},
});
