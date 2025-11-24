import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../lib/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

/**
 * Tela de criação de meta semanal. Permite ao usuário informar um
 * título e descrição e salva via API. Após o cadastro, retorna
 * à lista de metas.
 */
export default function MetaNovoScreen() {
  // Campos necessários para criar uma meta semanal de acordo com o backend:
  // idColaborador, idHabito, semanaInicio, semanaFim e quantidadeMeta.
  const [idColaborador, setIdColaborador] = useState('');
  const [idHabito, setIdHabito] = useState('');
  const [semanaInicio, setSemanaInicio] = useState('');
  const [semanaFim, setSemanaFim] = useState('');
  const [quantidadeMeta, setQuantidadeMeta] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function salvar() {
    // validação básica
    if (!idColaborador || isNaN(parseInt(idColaborador, 10))) {
      Alert.alert('Erro', 'Informe o ID do colaborador (número).');
      return;
    }
    if (!idHabito || isNaN(parseInt(idHabito, 10))) {
      Alert.alert('Erro', 'Informe o ID do hábito (número).');
      return;
    }
    if (!semanaInicio || !semanaFim) {
      Alert.alert('Erro', 'Informe as datas de início e fim da semana no formato AAAA-MM-DD.');
      return;
    }
    const quantidade = parseFloat(quantidadeMeta);
    if (isNaN(quantidade) || quantidade <= 0) {
      Alert.alert('Erro', 'Informe a quantidade da meta (número positivo).');
      return;
    }
    setLoading(true);
    try {
      await api.post('/metas-semanais', {
        idColaborador: parseInt(idColaborador, 10),
        idHabito: parseInt(idHabito, 10),
        semanaInicio,
        semanaFim,
        quantidadeMeta: quantidade,
      });
      router.back();
    } catch (error) {
      console.error('Erro ao salvar meta', error);
      Alert.alert('Erro', 'Não foi possível cadastrar a meta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Meta Semanal</Text>
      <Input
        placeholder="ID do colaborador"
        value={idColaborador}
        onChangeText={setIdColaborador}
        keyboardType="numeric"
      />
      <Input
        placeholder="ID do hábito"
        value={idHabito}
        onChangeText={setIdHabito}
        keyboardType="numeric"
      />
      <Input
        placeholder="Semana início (AAAA-MM-DD)"
        value={semanaInicio}
        onChangeText={setSemanaInicio}
      />
      <Input
        placeholder="Semana fim (AAAA-MM-DD)"
        value={semanaFim}
        onChangeText={setSemanaFim}
      />
      <Input
        placeholder="Quantidade da meta"
        value={quantidadeMeta}
        onChangeText={setQuantidadeMeta}
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