import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { SignIn } from './src/screens/SignIn';

const Stack = createStackNavigator();

function Navigation() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen 
          name="SignIn" 
          component={SignIn} 
          options={{ headerShown: false }}
        />
      ) : (
        // Add authenticated screens here
        <Stack.Screen name="Home" component={() => null} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
