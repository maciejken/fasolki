import { useLocalSearchParams } from "expo-router";

import DeleteDocument from "@/components/DeleteDocument";
import { useAppRouter } from "@/components/useAppRouter";

export default function DeleteScreen() {
  const { id } = useLocalSearchParams();
  const { goHome } = useAppRouter();

  return <DeleteDocument id={id as string} onClose={goHome} />;
}