import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getCarBrands, CarBrand } from '../services/api';
import { Header } from '../components/molecules/Header';
import { BrandList } from '../components/organisms/BrandList';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors, spacing } from '../utils/theme';

type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  Model: {
    brandCode: number;
    brandName: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCarBrands();
      setBrands(data);
    } catch (err) {
      setError('Failed to load car brands');
      console.error('Error loading brands:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleBrandPress = (brand: CarBrand) => {
    navigation.navigate('Model', {
      brandCode: parseInt(brand.code),
      brandName: brand.name
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        <Header
          title={`Welcome, ${user?.name || 'User'}`}
          onLogout={signOut}
        />
        <BrandList
          brands={brands}
          isLoading={loading}
          error={error}
          onRetry={loadBrands}
          onRefresh={loadBrands}
          onBrandPress={handleBrandPress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
}); 