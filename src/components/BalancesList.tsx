import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useStellarAccount, useWalletState } from '@stellar/react-native-wallet-kit';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, COMMON_STYLES } from '../styles/theme';

export const BalancesList: React.FC = () => {
  const { status } = useWalletState();
  const { balances, loading, error, refetch } = useStellarAccount();

  if (status !== 'connected') {
    return (
      <View style={COMMON_STYLES.card}>
        <Text style={TYPOGRAPHY.titleMedium}>Balances</Text>
        <Text style={[TYPOGRAPHY.bodyMedium, styles.placeholderText]}>
          Connect your wallet to view active token balances.
        </Text>
      </View>
    );
  }

  return (
    <View style={COMMON_STYLES.card}>
      <View style={styles.header}>
        <Text style={TYPOGRAPHY.titleMedium}>Balances</Text>
        <TouchableOpacity
          onPress={refetch}
          disabled={loading}
          style={styles.refreshButton}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.primary} size="small" />
          ) : (
            <Text style={styles.refreshButtonText}>Refresh</Text>
          )}
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error.message || 'Failed to fetch account balances.'}
          </Text>
        </View>
      )}

      {loading && !balances.length ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={COLORS.primary} size="large" />
          <Text style={[TYPOGRAPHY.bodySmall, { marginTop: SPACING.sm }]}>Loading asset balances...</Text>
        </View>
      ) : balances.length === 0 ? (
        <Text style={[TYPOGRAPHY.bodyMedium, styles.placeholderText]}>
          No balances found. Make sure this account is funded on the active network.
        </Text>
      ) : (
        <ScrollView style={styles.scrollContainer} nestedScrollEnabled>
          {balances.map((item, index) => {
            const isNative = item.asset_type === 'native';
            const assetCode = isNative ? 'XLM' : item.asset_code || 'Asset';
            const assetIssuer = isNative ? 'Stellar Network' : item.asset_issuer || '';

            return (
              <View
                key={`${item.asset_type}-${index}`}
                style={[
                  styles.balanceItem,
                  index === balances.length - 1 && styles.lastItem,
                ]}
              >
                <View>
                  <Text style={styles.assetCode}>{assetCode}</Text>
                  {!isNative && (
                    <Text numberOfLines={1} ellipsizeMode="middle" style={styles.assetIssuer}>
                      {assetIssuer}
                    </Text>
                  )}
                </View>
                <Text style={styles.balanceValue}>
                  {parseFloat(item.balance).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 7,
                  })}
                </Text>
              </View>
            );
          })}
        </ScrollView>
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
  refreshButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  refreshButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  scrollContainer: {
    maxHeight: 200,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  lastItem: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  assetCode: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  assetIssuer: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontFamily: TYPOGRAPHY.code.fontFamily,
    maxWidth: 150,
    marginTop: 2,
  },
  balanceValue: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: TYPOGRAPHY.code.fontFamily,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  },
  placeholderText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    paddingVertical: SPACING.lg,
  },
  errorContainer: {
    backgroundColor: COLORS.errorGlow,
    borderColor: COLORS.error,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
  },
});
