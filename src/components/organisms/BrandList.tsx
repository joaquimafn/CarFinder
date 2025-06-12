import React, { useState, useMemo } from 'react';
import { CarBrand } from '../../services/api';
import { DataList } from '../molecules/DataList';
import { Card } from '../atoms/Card';
import { BrandFilter } from '../molecules/BrandFilter';

interface BrandListProps {
  brands: CarBrand[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onRefresh?: () => void;
  onBrandPress?: (brand: CarBrand) => void;
}

export function BrandList({
  brands,
  isLoading,
  error,
  onRetry,
  onRefresh,
  onBrandPress,
}: BrandListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) {
      return brands;
    }
    
    const normalizedQuery = searchQuery.toLowerCase().trim();
    return brands.filter(brand => 
      brand.name.toLowerCase().includes(normalizedQuery)
    );
  }, [brands, searchQuery]);

  const renderBrandItem = (brand: CarBrand) => (
    <Card
      title={brand.name}
      subtitle={`Code: ${brand.code}`}
      onPress={() => onBrandPress?.(brand)}
    />
  );

  const ListHeaderComponent = () => (
    <BrandFilter
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  );

  return (
    <DataList
      data={filteredBrands}
      renderItem={renderBrandItem}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      onRefresh={onRefresh}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
} 