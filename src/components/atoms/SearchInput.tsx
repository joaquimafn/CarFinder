import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, borderRadius, spacing, shadows } from '../../utils/theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  testID?: string;
  debounceTime?: number;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search...',
  testID,
  debounceTime = 500 // Default debounce time of 500ms
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update the internal value when the external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChangeText = (text: string) => {
    setInputValue(text);
    
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set a new timer to trigger the actual search after debounce time
    debounceTimerRef.current = setTimeout(() => {
      onChangeText(text);
    }, debounceTime);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSubmitEditing = () => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    
    // Trigger search immediately on submit
    onChangeText(inputValue);
  };

  const handleClearText = () => {
    setInputValue('');
    onChangeText('');
  };

  return (
    <View style={[
      styles.container, 
      isFocused && styles.containerFocused
    ]}>
      <Feather name="search" size={20} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        testID={testID}
        returnKeyType="search"
        onSubmitEditing={handleSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {inputValue.length > 0 && (
        <TouchableOpacity onPress={handleClearText} style={styles.clearButton}>
          <Feather name="x" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  containerFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.background,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    height: '100%',
  },
  clearButton: {
    padding: spacing.xs,
  },
}); 