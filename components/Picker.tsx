import { useContext } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { router } from 'expo-router';

import Icon, { Ionicon } from "./Icon";
import AppContext, { initialPickerState } from "@/appContext";
import Button from "./Button";
import { RouteTemplate, StaticRoute } from "@/appContext/types";
import { Text, View } from "./Themed";
import { ColorScheme, useColorScheme } from "./useColorScheme";

export interface PickerOption {
  label: string;
  icon: Ionicon;
  action?: () => void;
}

export interface PickerProps {
  items: PickerOption[];
  prompt?: string;
  desc?: string;
  onChange?: (value: string) => void;
  onClose?: (isValueChanged: boolean) => void;
}

export default function Picker({ items, prompt, desc }: PickerProps) {
  const { setPicker } = useContext(AppContext);
  const theme = useColorScheme();
  const styles = getStyles(theme);

  const handleClose = () => {
    setPicker(initialPickerState);
  }

  return (
    <Modal
      visible={!!items.length}
      transparent
      animationType='none'
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerPrompt}>
            {prompt && <Text style={styles.pickerPromptText}>{prompt}</Text>}
            {desc && <Text style={styles.pickerPromptDesc}>{desc}</Text>}
          </View>

          {items.map((option, index) => (
            <Button
              key={`picker-option-${index}`}
              label={option.label}
              icon={option.icon}
              onPress={() => {
                if ('function' === typeof option.action) {
                  option.action();
                }
                handleClose();
              }}
              style={{ marginBottom: 16 }}
            />
          ))}

          <Icon
            name={Ionicon.Close}
            style={styles.pickerCloseIcon}
            color={theme === 'dark' ? 'white' : 'black'}
          />
        </View>
      </Pressable>
    </Modal>
  )
}

const getStyles = (theme: ColorScheme) => StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.5)'
  },
  pickerContainer: {
    paddingBottom: 20,
    paddingHorizontal: 64,
  },
  pickerPrompt: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 8
  },
  pickerPromptText: {
    fontSize: 22,
  },
  pickerPromptDesc: {
    marginTop: 8,
    fontSize: 12,
    color: 'grey'
  },
  pickerItemText: {
    fontSize: 18
  },
  pickerItemIcon: {
    position: 'absolute',
    right: 24
  },
  pickerCloseIcon: {
    position: 'absolute',
    right: 16,
    top: 20
  }
});