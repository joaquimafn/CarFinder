import React from 'react';
import { CarBrand } from '../../services/api';
import { DataList } from '../molecules/DataList';
import { Card } from '../atoms/Card';

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
  const renderBrandItem = (brand: CarBrand) => (
    <Card
      title={brand.name}
      subtitle={`Code: ${brand.code}`}
      onPress={() => onBrandPress?.(brand)}
    />
  );

  return (
    <DataList
      data={brands}
      renderItem={renderBrandItem}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      onRefresh={onRefresh}
    />
  );
} 