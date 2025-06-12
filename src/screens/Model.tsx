import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fipeApi } from '../services/api';
import { ListContainer } from '../components/molecules/ListContainer';
import { ListItem } from '../components/atoms/ListItem';
import { ScreenHeader } from '../components/molecules/ScreenHeader';
import { Text } from '../components/atoms/Text';
import { colors, spacing } from '../utils/theme';

interface Model {
  codigo: number;
  nome: string;
}

export function Model() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  const { brandCode, brandName } = route.params as { brandCode: number; brandName: string };

  async function fetchModels() {
    try {
      setLoading(true);
      setError(null);
      const response = await fipeApi.get(`/carros/marcas/${brandCode}/modelos`);
      setModels(response.data.modelos);
    } catch (error) {
      setError('Erro ao carregar modelos');
      console.error('Error fetching models:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchModels();
  }, []);

  const handleModelPress = (model: Model) => {
    // Navigation to next screen will be implemented later
    console.log('Selected model:', model);
  };

  const ListHeaderComponent = (
    <View style={styles.headerContainer}>
      <Text variant="subtitle" style={styles.sectionTitle}>
        {models.length} modelos encontrados
      </Text>
      <Text variant="caption" style={styles.sectionSubtitle}>
        Selecione um modelo para ver mais detalhes
      </Text>
    </View>
  );

  const ListEmptyComponent = (
    <View style={styles.emptyContainer}>
      <Text variant="subtitle" style={styles.emptyText}>
        Nenhum modelo encontrado
      </Text>
      <Text variant="caption" style={styles.emptySubtext}>
        Tente novamente mais tarde
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        <ScreenHeader title={brandName} />
        <ListContainer
          data={models}
          loading={loading}
          error={error}
          onRefresh={fetchModels}
          onRetry={fetchModels}
          renderItem={({ item }) => (
            <ListItem
              title={item.nome}
              subtitle={`Código: ${item.codigo}`}
              onPress={() => handleModelPress(item)}
              testID={`model-item-${item.codigo}`}
              icon="info"
            />
          )}
          keyExtractor={(item) => item.codigo.toString()}
          testID="models-list"
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={ListEmptyComponent}
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
}); 