import ShareDocument from "@/components/ShareDocument";
import { useAppRouter } from "@/components/useAppRouter";
import { useLocalSearchParams } from "expo-router";

export default function ShareScreen() {
  const { id } = useLocalSearchParams();
  const { goHome } = useAppRouter();

  return <ShareDocument id={id as string} onClose={goHome} />
}
