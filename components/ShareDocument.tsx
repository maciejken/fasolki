import Button from "@/components/Button";
import { Ionicon } from "@/components/Icon";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { graphql, useMutation } from "react-relay";
import { View } from "./Themed";
import { ColorScheme, useColorScheme } from "./useColorScheme";

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
}

export default function ShareDocument({ id, onClose }: DeleteDocumentProps) {
  const [permissionKey, setPermissionKey] = useState("");
  const [permissionValue, setPermissionValue] = useState(1);
  const [commitMutation, isMutationInFlight] = useMutation(ShareDocumentMutation);
  const theme = useColorScheme();
  const styles = getStyles(theme);

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
          placeholderTextColor="#aaa"
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
              primary={option.value === permissionValue}
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
          primary
        />
      </View>
    </View>
  );
}

const getStyles = (theme: ColorScheme) => StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300
  },
  permissionKeyInput: {
    color: theme === 'dark' ? 'white' : 'black',
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