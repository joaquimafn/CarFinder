import React from 'react';
import { FlatList, FlatListProps, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';

interface DataListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onRefresh?: () => void;
}

export function DataList<T>({
  data,
  renderItem,
  isLoading,
  error,
  onRetry,
  onRefresh,
  ...flatListProps
}: DataListProps<T>) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text variant="body" style={styles.errorText}>{error}</Text>
        {onRetry && (
          <Button
            title="Retry"
            onPress={onRetry}
            variant="primary"
            style={styles.retryButton}
          />
        )}
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(item, index) => index.toString()}
      refreshing={isLoading}
      onRefresh={onRefresh}
      contentContainerStyle={styles.listContainer}
      {...flatListProps}
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
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    minWidth: 120,
  },
}); 