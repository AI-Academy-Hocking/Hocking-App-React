// Biometric Authentication Service
// This service handles Face ID and fingerprint authentication for verified users

export interface BiometricCredentials {
  userId: string;
  biometricType: 'face' | 'fingerprint';
  isEnabled: boolean;
  lastUsed: Date;
}

class BiometricAuthService {
  private isSupported: boolean = false;
  private isAvailable: boolean = false;

  constructor() {
    this.checkSupport();
  }

  private async checkSupport() {
    // Check if WebAuthn is supported (for biometric authentication)
    if (window.PublicKeyCredential) {
      this.isSupported = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      this.isAvailable = this.isSupported;
    }
  }

  // Check if biometric authentication is available
  public async isBiometricAvailable(): Promise<boolean> {
    return this.isAvailable;
  }

  // Get available biometric types
  public async getAvailableBiometricTypes(): Promise<string[]> {
    const types: string[] = [];
    
    if (this.isAvailable) {
      // Check for Face ID (iOS) or fingerprint
      if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
        types.push('face', 'fingerprint');
      } else if (navigator.userAgent.includes('Android')) {
        types.push('fingerprint');
      } else {
        // Desktop browsers might support fingerprint
        types.push('fingerprint');
      }
    }
    
    return types;
  }

  // Enable biometric authentication for a user
  public async enableBiometric(userId: string, biometricType: 'face' | 'fingerprint'): Promise<boolean> {
    try {
      if (!this.isAvailable) {
        throw new Error('Biometric authentication is not available on this device');
      }

      // Create biometric credentials
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const publicKeyOptions: PublicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: 'Hocking College Campus Social Hub',
          id: window.location.hostname,
        },
        user: {
          id: new Uint8Array(16),
          name: userId,
          displayName: userId,
        },
        pubKeyCredParams: [
          {
            type: 'public-key',
            alg: -7, // ES256
          },
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
        },
        timeout: 60000,
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyOptions,
      }) as PublicKeyCredential;

      if (credential) {
        // Store the credential ID for later use
        const credentialId = credential.id;
        localStorage.setItem(`biometric_${userId}`, JSON.stringify({
          credentialId,
          biometricType,
          isEnabled: true,
          lastUsed: new Date().toISOString(),
        }));

        return true;
      }

      return false;
    } catch (error) {
      console.error('Error enabling biometric authentication:', error);
      return false;
    }
  }

  // Authenticate using biometric
  public async authenticateWithBiometric(userId: string): Promise<boolean> {
    try {
      const storedCredential = localStorage.getItem(`biometric_${userId}`);
      if (!storedCredential) {
        throw new Error('No biometric credentials found');
      }

      const credentialData = JSON.parse(storedCredential);
      if (!credentialData.isEnabled) {
        throw new Error('Biometric authentication is not enabled');
      }

      // Create authentication challenge
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      const assertionOptions: PublicKeyCredentialRequestOptions = {
        challenge,
        rpId: window.location.hostname,
        allowCredentials: [
          {
            type: 'public-key',
            id: this.base64ToArrayBuffer(credentialData.credentialId),
          },
        ],
        userVerification: 'required',
        timeout: 60000,
      };

      const assertion = await navigator.credentials.get({
        publicKey: assertionOptions,
      }) as PublicKeyCredential;

      if (assertion) {
        // Update last used timestamp
        credentialData.lastUsed = new Date().toISOString();
        localStorage.setItem(`biometric_${userId}`, JSON.stringify(credentialData));
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error during biometric authentication:', error);
      return false;
    }
  }

  // Disable biometric authentication
  public async disableBiometric(userId: string): Promise<boolean> {
    try {
      localStorage.removeItem(`biometric_${userId}`);
      return true;
    } catch (error) {
      console.error('Error disabling biometric authentication:', error);
      return false;
    }
  }

  // Check if biometric is enabled for a user
  public isBiometricEnabled(userId: string): boolean {
    try {
      const storedCredential = localStorage.getItem(`biometric_${userId}`);
      if (!storedCredential) return false;

      const credentialData = JSON.parse(storedCredential);
      return credentialData.isEnabled === true;
    } catch (error) {
      return false;
    }
  }

  // Get biometric credentials for a user
  public getBiometricCredentials(userId: string): BiometricCredentials | null {
    try {
      const storedCredential = localStorage.getItem(`biometric_${userId}`);
      if (!storedCredential) return null;

      const credentialData = JSON.parse(storedCredential);
      return {
        userId,
        biometricType: credentialData.biometricType,
        isEnabled: credentialData.isEnabled,
        lastUsed: new Date(credentialData.lastUsed),
      };
    } catch (error) {
      return null;
    }
  }

  // Helper function to convert base64 to ArrayBuffer
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Show biometric prompt with custom UI
  public async showBiometricPrompt(
    biometricType: 'face' | 'fingerprint',
    onSuccess: () => void,
    onError: (error: string) => void
  ): Promise<void> {
    // Create a modal for biometric prompt
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center">
        <div class="mb-6">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            ${biometricType === 'face' ? '👤' : '👆'}
          </div>
          <h3 class="text-lg font-semibold mb-2">Biometric Authentication</h3>
          <p class="text-gray-600">
            Please use your ${biometricType === 'face' ? 'Face ID' : 'fingerprint'} to continue
          </p>
        </div>
        <div class="flex gap-3">
          <button id="cancel-biometric" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button id="retry-biometric" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Try Again
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const cancelBtn = modal.querySelector('#cancel-biometric');
    const retryBtn = modal.querySelector('#retry-biometric');

    const cleanup = () => {
      document.body.removeChild(modal);
    };

    cancelBtn?.addEventListener('click', () => {
      cleanup();
      onError('Authentication cancelled');
    });

    retryBtn?.addEventListener('click', async () => {
      try {
        // This would trigger the actual biometric authentication
        // For now, we'll simulate success
        cleanup();
        onSuccess();
      } catch (error) {
        onError('Authentication failed');
      }
    });

    // Auto-trigger biometric prompt
    setTimeout(() => {
      // Simulate biometric authentication
      cleanup();
      onSuccess();
    }, 2000);
  }
}

// Export singleton instance
export const biometricAuth = new BiometricAuthService(); 