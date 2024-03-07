import { Picker as RNPicker } from "@react-native-picker/picker";
import { createRef, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface PickerOption {
  id: string;
  label: string;
  value: string;
}

export interface PickerProps {
  items: PickerOption[];
  prompt?: string;
  onChange?: (value: string) => void;
  onClose?: (isValueChanged: boolean) => void;
}

export default function Picker({ items, onChange, onClose, prompt }: PickerProps) {
  const pickerRef = createRef<any>();
  const [isValueChanged, setValueChanged] = useState(false);

  const handleClose = () => {
    if ('function' === typeof onClose) {
      onClose(isValueChanged);
    }
  }

  const handleChange = (value: string) => {
    if ('function' === typeof onChange) {
      onChange(value);
    }
    setValueChanged(true);
  }

  useEffect(() => {
    if (pickerRef.current) {
      pickerRef.current?.focus();
    }

  }, [pickerRef.current]);

  return (
    <TouchableOpacity style={[StyleSheet.absoluteFill, styles.overlay]}>
      <View style={styles.pickerContainer}>
        <RNPicker
          ref={pickerRef}
          prompt={prompt}
          style={{ display: "none" }}
          onValueChange={handleChange}
          onBlur={handleClose}
        >
          {items.map((option) =>
            <RNPicker.Item
              key={`${option.id}-${option.value}`}
              label={option.label}
              value={option.value}
            />
          )}
        </RNPicker>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    right: -100,
    backgroundColor: 'white',
    elevation: 5,
  },
  overlay: {
    position: "relative",
    backgroundColor: "#f06"
  }
});