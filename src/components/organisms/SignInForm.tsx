import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { FormInput } from '../atoms/FormInput';

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
  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    defaultValues: {
      user: '',
      password: '',
    },
  });

  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.title}>Sign In</Text>

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
            secureTextEntry
            editable={!isLoading}
            error={errors.password?.message}
          />
        )}
      />

      {error && <Text variant="caption" style={styles.errorText}>{error}</Text>}

      <Button
        title="Sign In"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
      />

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
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 10,
  },
  testCredentials: {
    marginTop: 30,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
}); 