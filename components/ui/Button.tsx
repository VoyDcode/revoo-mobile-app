import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

interface ButtonProps {
  /**
   * Text displayed inside the button
   */
  title: string;
  /**
   * Function called when the button is pressed
   */
  onPress: () => void;
  /**
   * Optionally disable the button
   */
  disabled?: boolean;
}

/**
 * Simple reusable button component. Encapsulates styling and
 * provides a consistent look across screens. Accepts a `title` and
 * `onPress` handler.
 */
export default function Button({ title, onPress, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});