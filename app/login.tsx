import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { api, setAuthToken } from '../lib/api';

/**
 * Login screen. Allows the user to authenticate against the
 * backend API. On success, stores the JWT token and navigates
 * to the habit list.
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Erro', 'Informe e‑mail e senha.');
      return;
    }
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      // Assume the backend returns a JSON object with a `token` field
      const { token } = response.data;
      if (token) {
        await setAuthToken(token);
        // Navega para a lista de hábitos
        router.replace('/habitos');
      } else {
        Alert.alert('Erro', 'Token não encontrado na resposta.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Erro', 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        placeholder="E‑mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Aguarde...' : 'Entrar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});