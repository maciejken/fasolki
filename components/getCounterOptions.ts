import { Ionicon } from "./Icon";

export type CounterAction = "share" | "delete";

interface CounterOption {
  icon: Ionicon;
  value: CounterAction;
  label: string;
}

export default function getCounterOptions(): CounterOption[] {
  return [
    { icon: Ionicon.Share, value: "share", label: "Udostępnij" },
    { icon: Ionicon.Trash, value: "delete", label: "Usuń" },
  ];
}
