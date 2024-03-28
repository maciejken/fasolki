import { router } from "expo-router";

type ActionName = "goHome" | "shareDocument" | "deleteDocument";

type NavParams = Record<string, string>;

export function useAppRouter(): Record<
  ActionName,
  (params?: NavParams) => void
> {
  return {
    goHome: () => {
      router.replace({
        pathname: "/fasolki/",
      });
    },
    shareDocument: (params?: NavParams) => {
      if (params?.id) {
        router.navigate({
          pathname: "/fasolki/[id]/share",
          params,
        });
      }
    },
    deleteDocument: (params?: NavParams) => {
      if (params?.id) {
        router.navigate({
          pathname: "/fasolki/[id]/delete",
          params,
        });
      }
    },
  };
}
