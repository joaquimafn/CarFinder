import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchInput } from '../atoms/SearchInput';

interface BrandFilterProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function BrandFilter({
  value,
  onChangeText,
  placeholder = 'Search by brand name...',
}: BrandFilterProps) {
  return (
    <View style={styles.container}>
      <SearchInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        testID="brand-search-input"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
  },
}); 