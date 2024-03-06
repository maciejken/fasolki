export type CounterAction = "edit" | "share" | "delete";

interface CounterOption {
  value: CounterAction;
  label: string;
  level: number;
}

const options: CounterOption[] = [
  { value: "edit", label: "Zmień", level: 2 },
  { value: "share", label: "Udostępnij", level: 3 },
  { value: "delete", label: "Usuń", level: 4 },
];

export default function getCounterOptions(
  accessLevel: number,
): CounterOption[] {
  return options.filter((o: CounterOption) => o.level <= accessLevel);
}
