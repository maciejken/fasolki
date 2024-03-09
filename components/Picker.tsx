import { createRef, useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon, { Ionicon } from "./Icon";
import AppContext, { initialPickerState } from "@/appContext";

interface PickerOption {
  label: string;
  value: string;
  icon: Ionicon;
}

export interface PickerProps {
  items: PickerOption[];
  prompt?: string;
  onChange?: (value: string) => void;
  onClose?: (isValueChanged: boolean) => void;
}

export default function Picker({ items, prompt, onChange }: PickerProps) {
  const { setPicker } = useContext(AppContext);

  const handleClose = () => {
    setPicker(initialPickerState);
  }

  const handleChange = (value: string) => {
    if ('function' === typeof onChange) {
      onChange(value);
    }
    handleClose();
  };

  return (
    <Modal
      visible={!!items.length}
      transparent
      animationType='none'
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerPrompt}>
            <Text style={styles.pickerPromptText}>{prompt}</Text>
          </View>

          {items.map((option) => (
            <Pressable
              key={`picker-item-${option.value}`}
              style={styles.pickerItem}
              onPress={() => handleChange(option.value)}
            >
              <Text style={styles.pickerItemText}>{option.label}</Text>
              <Icon name={option.icon} style={styles.pickerItemIcon} />
            </Pressable>
          ))}

          <Icon name={Ionicon.Close} style={styles.pickerCloseIcon} />
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  pickerContainer: {
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingHorizontal: 64,
  },
  pickerPrompt: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 16
  },
  pickerPromptText: {
    fontSize: 22,
    color: 'black'
  },
  pickerItem: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#eee'
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