import React from 'react';
import { View, StyleSheet, ActivityIndicator, VirtualizedList, StyleProp, ViewStyle } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { colors, spacing } from '../../utils/theme';

interface DataListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onRefresh?: () => void;
  estimatedItemSize?: number;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export function DataList<T>({
  data,
  renderItem,
  isLoading,
  error,
  onRetry,
  onRefresh,
  estimatedItemSize = 100,
  ListHeaderComponent,
  ListEmptyComponent,
  contentContainerStyle,
}: DataListProps<T>) {
  if (isLoading && !data.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error && !data.length) {
    return (
      <View style={styles.container}>
        <Text variant="body" style={styles.errorText}>{error}</Text>
        {onRetry && (
          <Button
            title="Retry"
            onPress={onRetry}
            variant="secondary"
            style={styles.retryButton}
          />
        )}
      </View>
    );
  }

  const getItem = (data: T[], index: number) => data[index];
  const getItemCount = (data: T[]) => data.length;
  const getItemLayout = (_: any, index: number) => ({
    length: estimatedItemSize,
    offset: estimatedItemSize * index,
    index,
  });

  const EmptyComponent = () => {
    if (data.length === 0 && !isLoading && !error && ListEmptyComponent) {
      return ListEmptyComponent;
    }
    return null;
  };

  return (
    <VirtualizedList
      data={data}
      getItem={getItem}
      getItemCount={getItemCount}
      getItemLayout={getItemLayout}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(_, index) => index.toString()}
      refreshing={isLoading}
      onRefresh={onRefresh}
      contentContainerStyle={[styles.listContainer, contentContainerStyle]}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={EmptyComponent()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: spacing.md,
  },
  errorText: {
    marginBottom: spacing.md,
    textAlign: 'center',
    color: colors.danger,
  },
  retryButton: {
    minWidth: 120,
  },
}); 