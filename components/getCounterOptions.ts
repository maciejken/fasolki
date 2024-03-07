export type CounterAction = "share" | "delete";

interface CounterOption {
  id: string;
  value: CounterAction;
  label: string;
}

export default function getCounterOptions(id: string): CounterOption[] {
  return [
    { id: `${id}-share`, value: "share", label: "Udostępnij" },
    { id: `${id}-delete`, value: "delete", label: "Usuń" },
  ];
}
