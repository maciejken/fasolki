import { PickerProps } from "@/components/Picker";
import { createContext } from "react";

export const initialPickerState: PickerProps = {
  items: [],
};

const AppContext = createContext({
  token: "",
  setToken(value: string) {},
  picker: initialPickerState,
  setPicker(picker: PickerProps) {},
});

export default AppContext;
