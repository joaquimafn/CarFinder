import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { colors, spacing } from '../../utils/theme';

interface ListContainerProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  onRefresh?: () => void;
  onRetry?: () => void;
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T) => string;
  testID?: string;
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
}

export function ListContainer<T>({
  data,
  loading,
  error,
  onRefresh,
  onRetry,
  renderItem,
  keyExtractor,
  testID,
  ListHeaderComponent,
  ListEmptyComponent
}: ListContainerProps<T>) {
  if (loading && data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error && data.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="body" style={styles.errorText}>{error}</Text>
        {onRetry && (
          <Button
            title="Tentar novamente"
            onPress={onRetry}
            variant="primary"
            testID="retry-button"
          />
        )}
      </View>
    );
  }

  const EmptyComponent = () => {
    if (data.length === 0 && !loading && !error && ListEmptyComponent) {
      return ListEmptyComponent;
    }
    
    if (data.length === 0 && !loading && !error) {
      return (
        <View style={styles.emptyContainer}>
          <Text variant="subtitle" style={styles.emptyText}>Nenhum item encontrado</Text>
        </View>
      );
    }
    
    return null;
  };

  return (
    <View style={styles.container} testID={testID}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        refreshing={loading}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={<EmptyComponent />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
  listContent: {
    flexGrow: 1,
    paddingVertical: spacing.md,
  },
}); 