import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { CarBrand } from '../../services/api';
import { DataList } from '../molecules/DataList';
import { Card } from '../atoms/Card';
import { BrandFilter } from '../molecules/BrandFilter';
import { Text } from '../atoms/Text';
import { colors, spacing } from '../../utils/theme';

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
      icon="tag"
      rightIcon={true}
    />
  );

  const ListHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <Text variant="subtitle" style={styles.sectionTitle}>Available Brands</Text>
      <Text variant="caption" style={styles.sectionSubtitle}>
        {filteredBrands.length} brands found
      </Text>
      <BrandFilter
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text variant="subtitle" style={styles.emptyText}>
        No brands found
      </Text>
      <Text variant="caption" style={styles.emptySubtext}>
        Try adjusting your search
      </Text>
    </View>
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
      ListEmptyComponent={!isLoading && !error ? ListEmptyComponent : undefined}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  listContent: {
    flexGrow: 1,
    padding: spacing.md,
  },
}); 