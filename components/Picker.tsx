import { useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from 'expo-router';

import Icon, { Ionicon } from "./Icon";
import AppContext, { initialPickerState } from "@/appContext";
import Button from "./Button";
import { RouteTemplate, StaticRoute } from "@/appContext/types";

export interface PickerOption {
  label: string;
  icon: Ionicon;
  route: StaticRoute | RouteTemplate;
  routeParams?: Record<'id', string>;
}

export interface PickerProps {
  items: PickerOption[];
  prompt?: string;
  desc?: string;
  onChange?: (value: string) => void;
  onClose?: (isValueChanged: boolean) => void;
}

export default function Picker({ items, prompt, desc, onChange }: PickerProps) {
  const { setPicker } = useContext(AppContext);

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

          {items.map((option) => (
            <Button
              key={option.route}
              label={option.label}
              icon={option.icon}
              onPress={() => {
                router.navigate({
                  pathname: option.route,
                  params: option.routeParams
                });
                handleClose();
              }}
              style={{ marginBottom: 16 }}
            />
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
    marginBottom: 8
  },
  pickerPromptText: {
    fontSize: 22,
    color: 'black'
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