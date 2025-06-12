import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#666" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        testID={testID}
        clearButtonMode="while-editing"
        returnKeyType="search"
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
}); 