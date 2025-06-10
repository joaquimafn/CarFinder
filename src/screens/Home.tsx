import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getCarBrands, CarBrand } from '../services/api';
import { Header } from '../components/molecules/Header';
import { BrandList } from '../components/organisms/BrandList';

export function Home() {
  const { user, signOut } = useAuth();
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
    // Handle brand selection
    console.log('Selected brand:', brand);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={`Welcome, ${user?.name}!`}
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
  );
} 