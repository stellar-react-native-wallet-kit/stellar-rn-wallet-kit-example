import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Clipboard } from 'react-native';
import { useWalletState } from '@stellar/react-native-wallet-kit';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, COMMON_STYLES } from '../styles/theme';

export const StatusCard: React.FC = () => {
  const { status, publicKey, network, connect, disconnect } = useWalletState();

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleCopy = () => {
    if (publicKey) {
      Clipboard.setString(publicKey);
    }
  };

  return (
    <View style={COMMON_STYLES.card}>
      <View style={styles.header}>
        <Text style={TYPOGRAPHY.titleMedium}>Wallet Session</Text>
        <View
          style={[
            styles.statusBadge,
            status === 'connected'
              ? styles.connectedBadge
              : status === 'connecting'
              ? styles.connectingBadge
              : styles.disconnectedBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              status === 'connected'
                ? styles.connectedText
                : status === 'connecting'
                ? styles.connectingText
                : styles.disconnectedText,
            ]}
          >
            {status.toUpperCase()}
          </Text>
        </View>
      </View>

      {status === 'connected' && publicKey ? (
        <View style={styles.connectedContainer}>
          <View style={styles.infoRow}>
            <Text style={TYPOGRAPHY.bodySmall}>Address</Text>
            <View style={styles.addressRow}>
              <Text style={styles.addressText}>{formatAddress(publicKey)}</Text>
              <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={TYPOGRAPHY.bodySmall}>Network</Text>
            <Text style={styles.networkText}>{network.toUpperCase()}</Text>
          </View>

          <TouchableOpacity style={[styles.actionButton, styles.disconnectButton]} onPress={disconnect}>
            <Text style={COMMON_STYLES.buttonText}>Disconnect Wallet</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.disconnectedContainer}>
          <Text style={[TYPOGRAPHY.bodyMedium, styles.infoText]}>
            Connect Freighter Mobile to start interacting with Soroban smart contracts on the Stellar network.
          </Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={connect}
            disabled={status === 'connecting'}
          >
            {status === 'connecting' ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={COMMON_STYLES.buttonText}>Connect Freighter</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  connectedBadge: {
    backgroundColor: COLORS.successGlow,
  },
  connectingBadge: {
    backgroundColor: COLORS.primaryGlow,
  },
  disconnectedBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  connectedText: {
    color: COLORS.success,
  },
  connectingText: {
    color: COLORS.primary,
  },
  disconnectedText: {
    color: COLORS.textMuted,
  },
  connectedContainer: {
    gap: SPACING.md,
  },
  disconnectedContainer: {
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
    marginBottom: SPACING.lg,
    color: COLORS.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    paddingBottom: SPACING.sm,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  addressText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.code.fontFamily,
  },
  copyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  copyButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  networkText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  actionButton: {
    ...COMMON_STYLES.button,
    width: '100%',
    marginTop: SPACING.xs,
  },
  disconnectButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.error,
  },
});
