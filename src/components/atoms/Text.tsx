import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

interface TextProps extends RNTextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
}

export function Text({ variant = 'body', style, ...props }: TextProps) {
  return <RNText style={[styles[variant], style]} {...props} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  body: {
    fontSize: 16,
    color: '#333',
  },
  caption: {
    fontSize: 14,
    color: '#666',
  },
}); 