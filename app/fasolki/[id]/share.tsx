import ShareDocument from "@/components/ShareDocument";
import { router, useLocalSearchParams } from "expo-router";

export default function ShareScreen() {
  const { id } = useLocalSearchParams();

  const handleClose = () => {
    router.replace('/fasolki/');
  };

  return <ShareDocument id={id as string} onClose={handleClose} />
}
