import Button from "@/components/Button";
import { Ionicon } from "@/components/Icon";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { graphql, useMutation } from "react-relay";

const ShareDocumentMutation = graphql`
  mutation ShareDocumentMutation(
    $id: String!
    $permissions: [Permission]!
  ) {
  updateDocumentPermissions(
    id: $id,
    permissions: $permissions
    )
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
  canDelete?: boolean;
}

export default function ShareDocument({ id, canDelete, onClose }: DeleteDocumentProps) {
  const [permissionKey, setPermissionKey] = useState("");
  const [permissionValue, setPermissionValue] = useState(1);
  const [commitMutation, isMutationInFlight] = useMutation(ShareDocumentMutation);

  const handleShare = () => {
    if (permissionKey) {
      commitMutation({
        variables: {
          id,
          permissions: [{ key: permissionKey, value: permissionValue }]
        },
        onCompleted: onClose,
        onError(msg) {
          console.warn(msg)
        }
      });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <TextInput
          value={permissionKey}
          style={styles.permissionKeyInput}
          inputMode="email"
          onChangeText={setPermissionKey}
          enterKeyHint="done"
          autoFocus
          placeholder="email lub nazwa grupy"
        />
        <View style={styles.permissionValues}>
          {[
            { icon: Ionicon.Eye, value: 1 },
            { icon: Ionicon.Pencil, value: 2 },
            { icon: Ionicon.Share, value: 3 },
            { icon: Ionicon.Trash, value: 4 },
          ].map((option) =>
            <Button
              key={`permission-value-${option.value}`}
              icon={option.icon}
              selected={option.value === permissionValue}
              onPress={() => setPermissionValue(option.value)}
            />)}
        </View>
        <Button
          label="Potwierdź"
          icon={isMutationInFlight ? Ionicon.Time : Ionicon.Share}
          onPress={handleShare}
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
    backgroundColor: 'white'
  },
  container: {
    width: 300
  },
  permissionKeyInput: {
    padding: 8,
    fontSize: 18,
    marginBottom: 24
  },
  permissionValues: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 24
  },
  icon: {
    position: 'absolute',
    right: 24
  },
  buttonText: {
    fontSize: 24,
  },
});