// FIRST LINE: Import the WalletConnect compatibility layer
import '@walletconnect/react-native-compat';

import React, { useState } from 'react';
import { StellarWalletProvider } from '@stellar/react-native-wallet-kit';
import { MockWalletProvider } from '@stellar/react-native-wallet-kit/src/mock/MockWalletProvider';
import { AppContent } from './src/AppContent';

export default function App() {
  const [isMockMode, setIsMockMode] = useState(true);
  const [mockPublicKey, setMockPublicKey] = useState('GABC4723QUR7OT5GRK5A2NRAOA4JYAHT6O4CBMAUA5NWO4265NN73H7B');
  const [mockNetwork, setMockNetwork] = useState<'testnet' | 'mainnet'>('testnet');
  const [mockSignResponse, setMockSignResponse] = useState('AAAAAH+1hP...signed_xdr_envelope_placeholder...');

  // WalletConnect Project ID from cloud.walletconnect.com
  const WALLET_CONNECT_PROJECT_ID = 'YOUR_WALLETCONNECT_PROJECT_ID';

  const appContentProps = {
    isMockMode,
    setIsMockMode,
    mockPublicKey,
    setMockPublicKey,
    mockNetwork,
    setMockNetwork,
    mockSignResponse,
    setMockSignResponse,
  };

  if (isMockMode) {
    return (
      <MockWalletProvider
        publicKey={mockPublicKey}
        network={mockNetwork}
        signResponse={mockSignResponse}
        initialStatus="connected"
      >
        <AppContent {...appContentProps} />
      </MockWalletProvider>
    );
  }

  return (
    <StellarWalletProvider
      walletConnectProjectId={WALLET_CONNECT_PROJECT_ID}
      network={mockNetwork}
    >
      <AppContent {...appContentProps} />
    </StellarWalletProvider>
  );
}
