import React from 'react';
import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { Text } from './Text';

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function FormInput({ label, error, style, ...props }: FormInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text variant="caption" style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#999"
        {...props}
      />
      {error && <Text variant="caption" style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    marginTop: 4,
  },
}); 