import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors, typography } from '../../utils/theme';

interface TextProps extends RNTextProps {
  variant?: 'title' | 'subtitle' | 'body' | 'caption' | 'button';
  weight?: 'normal' | 'medium' | 'bold';
  color?: string;
}

export function Text({ 
  variant = 'body', 
  weight, 
  color,
  style, 
  ...props 
}: TextProps) {
  const textStyle = [
    styles[variant],
    weight && styles[weight],
    color && { color },
    style
  ];
  
  return <RNText style={textStyle} {...props} />;
}

const styles = StyleSheet.create({
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight as '700',
    lineHeight: typography.title.lineHeight,
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: typography.subtitle.fontWeight as '600',
    lineHeight: typography.subtitle.lineHeight,
    color: colors.text,
  },
  body: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight as '400',
    lineHeight: typography.body.lineHeight,
    color: colors.text,
  },
  caption: {
    fontSize: typography.caption.fontSize,
    fontWeight: typography.caption.fontWeight as '400',
    lineHeight: typography.caption.lineHeight,
    color: colors.textSecondary,
  },
  button: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight as '600',
    lineHeight: typography.button.lineHeight,
    color: colors.text,
  },
  normal: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  bold: {
    fontWeight: '700',
  },
}); 