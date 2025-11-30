import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'edu.hocking.app',
  appName: 'Hocking App',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https',
    // For development, you can set a URL here
    // url: 'http://localhost:5173',
    // For production, leave it empty to use the bundled app
    cleartext: false
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

