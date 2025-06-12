import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { FormInput } from '../atoms/FormInput';
import { colors, spacing, borderRadius, shadows } from '../../utils/theme';
import { Feather } from '@expo/vector-icons';

interface SignInFormData {
  user: string;
  password: string;
}

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export function SignInForm({ onSubmit, isLoading, error }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    defaultValues: {
      user: '',
      password: '',
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text variant="title" style={styles.title}>Welcome</Text>
        <Text variant="caption" style={styles.subtitle}>to CarFinder</Text>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="user"
          rules={{ required: 'Username is required' }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Username"
              placeholder="Enter your username"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              editable={!isLoading}
              error={errors.user?.message}
              leftIcon={<Feather name="user" size={20} color={colors.textSecondary} />}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Password"
              placeholder="Enter your password"
              onChangeText={onChange}
              value={value}
              secureTextEntry={!showPassword}
              editable={!isLoading}
              error={errors.password?.message}
              leftIcon={<Feather name="lock" size={20} color={colors.textSecondary} />}
              rightIcon={
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Feather 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
              }
            />
          )}
        />

        {error && <Text variant="caption" color={colors.danger} style={styles.errorText}>{error}</Text>}

        <Button
          title="Log in"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
          size="large"
        />
      </View>

      <Text variant="caption" style={styles.testCredentials}>
        Test credentials:{'\n'}
        Username: teste{'\n'}
        Password: 123
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: spacing.md,
  },
  title: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  formContainer: {
    marginTop: spacing.lg,
  },
  button: {
    marginTop: spacing.md,
  },
  errorText: {
    marginBottom: spacing.md,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: spacing.md,
  },
  forgotPassword: {
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  registerText: {
    marginRight: spacing.xs,
  },
  registerLink: {
    fontWeight: '500',
  },
  socialLogin: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  orText: {
    marginBottom: spacing.md,
    color: colors.textSecondary,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.round,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    ...shadows.small,
  },
  testCredentials: {
    marginTop: spacing.xl,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 20,
  },
}); 