import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'edu.hocking.app',
  appName: 'Hocking App',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https',
    // Allow HTTP connections for development (10.0.2.2 = host machine from emulator)
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1e40af",
      showSpinner: false,
    }
  }
};

export default config;

