import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../../lib/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface Habito {
  id: number;
  titulo: string;
  descricao?: string;
  pontosBase?: number;
  ativo?: boolean;
}

/**
 * Tela de edição de hábito. Recupera o ID a partir da rota, carrega
 * os dados do hábito e permite alterá‑los. Ao salvar, envia uma
 * requisição de atualização para a API.
 */
export default function HabitoEditarScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pontosBase, setPontosBase] = useState('1');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarHabito() {
    if (!id) return;
      try {
        const response = await api.get(`/habitos/${id}`);
        const habit: Habito = response.data;
        setTitulo(habit.titulo);
        setDescricao(habit.descricao || '');
        if (habit.pontosBase !== undefined && habit.pontosBase !== null) {
          setPontosBase(String(habit.pontosBase));
        }
      } catch (error) {
        console.error('Erro ao carregar hábito', error);
        Alert.alert('Erro', 'Não foi possível carregar o hábito.');
      }
    }
    carregarHabito();
  }, [id]);

  async function atualizar() {
    if (!titulo) {
      Alert.alert('Erro', 'Informe um título para o hábito.');
      return;
    }
    const pontos = parseInt(pontosBase, 10);
    if (isNaN(pontos) || pontos <= 0) {
      Alert.alert('Erro', 'Pontos base deve ser um número positivo.');
      return;
    }
    setLoading(true);
    try {
      await api.put(`/habitos/${id}`, {
        titulo,
        descricao,
        pontosBase: pontos,
        ativo: true,
      });
      router.back();
    } catch (error) {
      console.error('Erro ao atualizar hábito', error);
      Alert.alert('Erro', 'Não foi possível atualizar o hábito.');
    } finally {
      setLoading(false);
    }
  }

  async function remover() {
    // Confirmação simples de exclusão
    Alert.alert('Confirmar', 'Deseja remover este hábito?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/habitos/${id}`);
            router.replace('/habitos');
          } catch (error) {
            console.error('Erro ao remover hábito', error);
            Alert.alert('Erro', 'Não foi possível remover o hábito.');
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Hábito</Text>
      <Input
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <Input
        placeholder="Descrição (opcional)"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Input
        placeholder="Pontos base"
        value={pontosBase}
        onChangeText={setPontosBase}
        keyboardType="numeric"
      />
      <Button
        title={loading ? 'Atualizando...' : 'Salvar Alterações'}
        onPress={atualizar}
        disabled={loading}
      />
      <Button title="Remover" onPress={remover} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});