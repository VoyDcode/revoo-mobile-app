import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../lib/api';

interface MetaSemanal {
  id: number;
  idColaborador: number;
  nomeColaborador?: string;
  idHabito: number;
  tituloHabito: string;
  semanaInicio: string;
  semanaFim: string;
  quantidadeMeta: number;
  status: string;
}

/**
 * Tela de listagem de metas semanais. Exibe todas as metas cadastradas
 * e permite navegar para a criação de uma nova meta. A edição pode ser
 * implementada de forma similar aos hábitos, mas não é obrigatória
 * para cumprir o requisito mínimo de telas.
 */
export default function MetasListScreen() {
  const [metas, setMetas] = useState<MetaSemanal[]>([]);
  const router = useRouter();

  async function carregarMetas() {
    try {
      // O backend retorna uma lista simples de metas semanais.
      const response = await api.get('/metas-semanais');
      setMetas(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar metas', error);
    }
  }

  useEffect(() => {
    carregarMetas();
  }, []);

  function renderItem({ item }: { item: MetaSemanal }) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{item.tituloHabito}</Text>
        <Text style={styles.itemDescription}>Colaborador: {item.nomeColaborador || item.idColaborador}</Text>
        <Text style={styles.itemDescription}>
          Meta: {item.quantidadeMeta} (de {item.semanaInicio} a {item.semanaFim})
        </Text>
        <Text style={styles.itemDescription}>Status: {item.status}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Metas Semanais</Text>
      <FlatList
        data={metas}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={metas.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma meta cadastrada.</Text>}
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/metas/novo')}>
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