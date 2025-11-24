import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { api } from '../../lib/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Representa uma meta semanal retornada pelo backend. Cada meta possui
// identificadores do colaborador e do hábito, o título do hábito e a
// quantidade da meta. Campos adicionais (como datas e status) são
// ignorados nesta tela.
interface MetaSemanal {
  id: number;
  idColaborador: number;
  nomeColaborador?: string;
  idHabito: number;
  tituloHabito: string;
  quantidadeMeta: number;
}

/**
 * Tela para registrar progresso de uma meta semanal. O usuário pode
 * selecionar uma meta cadastrada, informar a data, a quantidade de progresso
 * e uma observação opcional. Os dados são enviados para o endpoint
 * `/api/registros-progresso` do backend Java.
 */
export default function ProgressoScreen() {
  // Lista de metas disponíveis para seleção no Picker
  const [metas, setMetas] = useState<MetaSemanal[]>([]);
  // ID da meta selecionada
  const [metaId, setMetaId] = useState<number | null>(null);
  // Data do registro no formato YYYY-MM-DD
  const [dataRegistro, setDataRegistro] = useState('');
  // Quantidade de progresso realizada
  const [quantidadeProgresso, setQuantidadeProgresso] = useState('');
  // Observação opcional sobre o registro
  const [observacao, setObservacao] = useState('');
  // Estado de carregamento para desabilitar botões
  const [loading, setLoading] = useState(false);
  // Router do Expo Router para navegação
  const router = useRouter();

  // Carrega todas as metas semanais ao montar o componente
  useEffect(() => {
    async function carregarMetas() {
      try {
        const response = await api.get('/metas-semanais');
        setMetas(response.data || []);
      } catch (error) {
        console.error('Erro ao carregar metas semanais', error);
      }
    }
    carregarMetas();
  }, []);

  // Função para salvar o registro de progresso
  async function salvar() {
    if (!metaId) {
      Alert.alert('Erro', 'Selecione uma meta semanal.');
      return;
    }
    if (!dataRegistro) {
      Alert.alert('Erro', 'Informe a data de registro (AAAA-MM-DD).');
      return;
    }
    const quantidade = parseFloat(quantidadeProgresso);
    if (isNaN(quantidade) || quantidade <= 0) {
      Alert.alert('Erro', 'Informe a quantidade de progresso (número positivo).');
      return;
    }
    setLoading(true);
    try {
      await api.post('/registros-progresso', {
        idMetaSemanal: metaId,
        dataRegistro,
        quantidadeProgresso: quantidade,
        observacao,
      });
      // Após salvar, volta à tela anterior
      router.back();
    } catch (error) {
      console.error('Erro ao registrar progresso', error);
      Alert.alert('Erro', 'Não foi possível registrar o progresso.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Progresso</Text>
      {metas.length > 0 ? (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={metaId}
            onValueChange={(itemValue) => setMetaId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma meta" value={null} />
            {metas.map((m) => (
              <Picker.Item
                key={m.id}
                label={`${m.tituloHabito} (${m.quantidadeMeta})`}
                value={m.id}
              />
            ))}
          </Picker>
        </View>
      ) : (
        <Text style={styles.emptyText}>
          Nenhuma meta semanal encontrada. Cadastre uma primeiro.
        </Text>
      )}
      <Input
        placeholder="Data do registro (AAAA-MM-DD)"
        value={dataRegistro}
        onChangeText={setDataRegistro}
      />
      <Input
        placeholder="Quantidade de progresso"
        value={quantidadeProgresso}
        onChangeText={setQuantidadeProgresso}
        keyboardType="numeric"
      />
      <Input
        placeholder="Observação (opcional)"
        value={observacao}
        onChangeText={setObservacao}
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  emptyText: {
    color: '#888',
    marginBottom: 16,
  },
});