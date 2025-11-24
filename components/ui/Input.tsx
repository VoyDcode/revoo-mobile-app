import { TextInput, StyleSheet } from 'react-native';
import React from 'react';

interface InputProps {
  /**
   * Placeholder text shown when the input is empty
   */
  placeholder?: string;
  /**
   * Current value of the input
   */
  value: string;
  /**
   * Callback invoked when the input text changes
   */
  onChangeText: (text: string) => void;
  /**
   * True if the input should obscure the text (e.g. for passwords)
   */
  secureTextEntry?: boolean;
  /**
   * Keyboard type (e.g. 'email-address')
   */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  /**
   * Optionally override additional styles
   */
  style?: any;
}

/**
 * Simple reusable text input component. Encapsulates styling so that
 * all inputs have a consistent look and feel. Accepts the same
 * props as a normal TextInput plus a couple of convenience props.
 */
export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  style,
}: InputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize="none"
      style={[styles.input, style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});