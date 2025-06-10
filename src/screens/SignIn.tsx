import React, { useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { SignInForm } from '../components/organisms/SignInForm';

interface SignInFormData {
  user: string;
  password: string;
}

export function SignIn() {
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: SignInFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      await signIn(data.user, data.password);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SignInForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </View>
  );
} 