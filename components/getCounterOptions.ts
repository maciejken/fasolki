import { Ionicon } from "./Icon";
import { PickerOption } from "./Picker";

export type CounterAction = "share" | "delete";

export default function getCounterOptions(id: string): PickerOption[] {
  return [
    {
      icon: Ionicon.Share,
      label: "Udostępnij",
      route: `/fasolki/[id]/share`,
      routeParams: { id },
    },
    {
      icon: Ionicon.Trash,
      label: "Usuń",
      route: `/fasolki/[id]/delete`,
      routeParams: { id },
    },
  ];
}
