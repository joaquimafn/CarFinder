import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';

interface ListContainerProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  onRefresh?: () => void;
  onRetry?: () => void;
  renderItem: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor: (item: T) => string;
  testID?: string;
}

export function ListContainer<T>({
  data,
  loading,
  error,
  onRefresh,
  onRetry,
  renderItem,
  keyExtractor,
  testID
}: ListContainerProps<T>) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        {onRetry && (
          <Button
            title="Tentar novamente"
            onPress={onRetry}
            variant="outline"
            testID="retry-button"
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container} testID={testID}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        refreshing={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 16,
  },
}); 