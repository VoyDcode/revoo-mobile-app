import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../lib/api';

interface Habito {
  id: number;
  /**
   * Title of the habit returned from the backend.  Note that on the
   * server side the entity uses the property `nome`, but the DTO
   * exposes it as `titulo`.  We mirror that here.
   */
  titulo: string;
  descricao?: string;
  categoria?: any;
  pontosBase?: number;
  ativo?: boolean;
}

/**
 * Lista de hábitos cadastrados. Esta tela obtém os dados da API e
 * apresenta uma lista. O usuário pode tocar em um item para editar
 * ou no botão de adicionar para criar um novo hábito.
 */
export default function HabitosListScreen() {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const router = useRouter();

  async function carregarHabitos() {
    try {
      // The Java backend returns a `Page<HabitoResponse>` when
      // listing habits.  The list of items is in the `content` field,
      // so we normalise the response here to always be an array.  If
      // the backend is configured to return a simple array, this
      // still works because `content` would be undefined and we'll
      // fall back to the root data.
      const response = await api.get('/habitos');
      const data = response.data;
      const items = Array.isArray(data) ? data : data?.content;
      setHabitos(items || []);
    } catch (error) {
      console.error('Erro ao carregar hábitos', error);
    }
  }

  useEffect(() => {
    carregarHabitos();
  }, []);

  function renderItem({ item }: { item: Habito }) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push({ pathname: '/habitos/editar', params: { id: String(item.id) } })
        }
      >
        <Text style={styles.itemTitle}>{item.titulo}</Text>
        {item.descricao ? (
          <Text style={styles.itemDescription}>{item.descricao}</Text>
        ) : null}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hábitos</Text>
      <FlatList
        data={habitos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={habitos.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum hábito cadastrado.</Text>}
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/habitos/novo')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#1e90ff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 32,
  },
});