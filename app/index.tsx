import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Home screen. Provides simple navigation to the various sections of
 * the application. This screen does not require authentication.
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Revoo Mobile</Text>
      <Link href="/login" style={styles.link}>
        Ir para Login
      </Link>
      <Link href="/habitos" style={styles.link}>
        Hábitos
      </Link>
      <Link href="/metas" style={styles.link}>
        Metas Semanais
      </Link>
      <Link href="/progresso" style={styles.link}>
        Registro de Progresso
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  link: {
    fontSize: 18,
    color: '#1e90ff',
    marginVertical: 8,
  },
});