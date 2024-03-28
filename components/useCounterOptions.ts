import { Ionicon } from "./Icon";
import { PickerOption } from "./Picker";
import { useAppRouter } from "./useAppRouter";

export type CounterAction = "share" | "delete";

export function useCounterOptions(id: string): PickerOption[] {
  const { shareDocument, deleteDocument } = useAppRouter();
  return [
    {
      icon: Ionicon.Share,
      label: "Udostępnij",
      action: () => {
        shareDocument({ id });
      },
    },
    {
      icon: Ionicon.Trash,
      label: "Usuń",
      action: () => {
        deleteDocument({ id });
      },
    },
  ];
}
