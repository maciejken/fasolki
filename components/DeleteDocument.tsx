import Button from "@/components/Button";
import Icon, { Ionicon } from "@/components/Icon";
import { StyleSheet, Text, View } from "react-native";
import { graphql, useMutation } from "react-relay";

const DeleteDocumentMutation = graphql`
  mutation DeleteDocumentMutation(
    $id: String!
  ) {
  deleteDocument(id: $id)
    {
      viewer {
        ...FasolkiViewerFragment
      }
    }
  }
`;

interface DeleteDocumentProps {
  id: string;
  onClose(): void;
}

export default function DeleteDocument({ id, onClose }: DeleteDocumentProps) {
  const [commitMutation, isMutationInFlight] = useMutation(DeleteDocumentMutation);

  const handleDelete = () => {
    commitMutation({
      variables: { id },
      onCompleted: onClose
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Button
          label="Potwierdź"
          icon={isMutationInFlight ? Ionicon.Time : Ionicon.Trash}
          onPress={handleDelete}
          style={{ marginBottom: 24 }}
        />
        <Button
          label="Odrzuć"
          icon={Ionicon.Cancel}
          onPress={onClose}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300
  },
  icon: {
    position: 'absolute',
    right: 24
  },
  buttonText: {
    fontSize: 24,
  },
});