import { router, useLocalSearchParams } from "expo-router";

import DeleteDocument from "@/components/DeleteDocument";

export default function DeleteScreen() {
  const { id } = useLocalSearchParams();

  const handleClose = () => {
    router.replace('/fasolki/');
  };

  return <DeleteDocument id={id as string} onClose={handleClose} />;
}