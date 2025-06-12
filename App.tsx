import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { SignIn } from './src/screens/SignIn';
import { Home } from './src/screens/Home';
import { Model } from './src/screens/Model';

type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  Model: {
    brandCode: number;
    brandName: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

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
        <>
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={{ 
              title: 'Home',
              headerShown: true,
            }}
          />
          <Stack.Screen 
            name="Model" 
            component={Model}
            options={({ route }) => ({ 
              title: `Modelos ${route.params?.brandName || ''}`,
              headerShown: true,
            })}
          />
        </>
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
