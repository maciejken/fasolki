import { Ionicons } from "@expo/vector-icons";
import { StyleProp, View, ViewStyle } from "react-native";

export enum Ionicon {
  Add = "add-outline",
  Close = "close-outline",
  Dots = "ellipsis-vertical-outline",
  Lock = "lock-closed-outline",
  Login = "log-in-outline",
  Pencil = "pencil-outline",
  Save = "save-outline",
  Share = "share-social-outline",
  Signup = "person-add-outline",
  Time = "time-outline",
  Trash = "trash-outline"
}

interface IconProps {
  name: Ionicon;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function Icon({ name, color, size, onPress, style }: IconProps) {
  return (
    <View style={style}>
      <Ionicons
        name={name}
        size={size || 24}
        color={color || 'black'}
        onPress={onPress}
      />
    </View>
  )
}