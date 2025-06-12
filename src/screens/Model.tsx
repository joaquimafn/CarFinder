import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fipeApi } from '../services/api';
import { ListContainer } from '../components/molecules/ListContainer';
import { ListItem } from '../components/atoms/ListItem';
import { ScreenHeader } from '../components/molecules/ScreenHeader';

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

  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader title={`Modelos ${brandName}`} />
      <ListContainer
        data={models}
        loading={loading}
        error={error}
        onRefresh={fetchModels}
        onRetry={fetchModels}
        renderItem={({ item }) => (
          <ListItem
            title={item.nome}
            onPress={() => handleModelPress(item)}
            testID={`model-item-${item.codigo}`}
          />
        )}
        keyExtractor={(item) => item.codigo.toString()}
        testID="models-list"
      />
    </View>
  );
} 