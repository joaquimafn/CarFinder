import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { SignIn } from './src/screens/SignIn';
import { Home } from './src/screens/Home';
import { Model } from './src/screens/Model';
import { colors } from './src/utils/theme';

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
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        cardStyle: { backgroundColor: colors.background }
      }}
    >
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
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Model" 
            component={Model}
            options={({ route }) => ({ 
              title: `${route.params?.brandName || ''} Models`,
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
