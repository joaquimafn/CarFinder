import React from 'react';
import { View, StyleSheet, ActivityIndicator, VirtualizedList } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';

interface DataListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onRefresh?: () => void;
  estimatedItemSize?: number;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
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
}: DataListProps<T>) {
  if (isLoading && !data.length) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      contentContainerStyle={styles.listContainer}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    padding: 16,
  },
  errorText: {
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    minWidth: 120,
  },
}); 