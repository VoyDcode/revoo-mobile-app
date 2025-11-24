import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Root layout for the application. The Expo Router automatically
 * registers any files within the `app` directory as routes. The
 * `<Stack />` component handles the navigation stack for us.
 */
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/*
        The Stack component renders a navigation stack. Each file
        in the `app` folder becomes a screen. We don't explicitly
        declare individual screens here; Expo Router will do it
        automatically based on the filesystem. See:
        https://docs.expo.dev/router/file-system-routing/
      */}
      <Stack />
    </SafeAreaProvider>
  );
}