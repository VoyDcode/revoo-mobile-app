import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../lib/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

/**
 * Tela de criação de hábito. Permite ao usuário informar um nome e
 * descrição e salva via API. Após o cadastro, retorna à lista de
 * hábitos.
 */
export default function HabitoNovoScreen() {
  // Title (titulo) and description fields correspond to the DTO used
  // by the Java backend.  We also allow the user to specify the
  // points each habit is worth; if left blank it defaults to 1.
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pontosBase, setPontosBase] = useState('1');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function salvar() {
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
      await api.post('/habitos', {
        titulo,
        descricao,
        // sem categoria explícita; ajuste conforme necessário
        pontosBase: pontos,
        ativo: true,
      });
      // Após salvar, volta para a lista de hábitos
      router.back();
    } catch (error) {
      console.error('Erro ao salvar hábito', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o hábito.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Hábito</Text>
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
        placeholder="Pontos base (ex: 1)"
        value={pontosBase}
        onChangeText={setPontosBase}
        keyboardType="numeric"
      />
      <Button
        title={loading ? 'Salvando...' : 'Salvar'}
        onPress={salvar}
        disabled={loading}
      />
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