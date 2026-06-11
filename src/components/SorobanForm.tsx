import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useContractCall, useWalletState, simulateContractCall } from '@stellar/react-native-wallet-kit';
import { nativeToScVal } from '@stellar/stellar-sdk';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, COMMON_STYLES } from '../styles/theme';

export const SorobanForm: React.FC = () => {
  const { status, publicKey, network } = useWalletState();
  const [contractId, setContractId] = useState('CDLZ4723QUR7OT5GRK5A2NRAOA4JYAHT6O4CBMAUA5NWO4265NN73H7B');
  const [recipient, setRecipient] = useState('GBDUYREB56F7ZJ622E6J4BFWQGLP4M7XED3RPA3J2VTLIHEUPRMDJ65B');
  const [amount, setAmount] = useState('10');
  
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<{ fee?: string; eventsCount?: number; raw?: string } | null>(null);
  const [simError, setSimError] = useState<string | null>(null);

  const { invoke, invoking, result: txResult, error: txError } = useContractCall(contractId);

  const getArgs = () => {
    if (!publicKey) return [];
    // Arguments: [from_address, to_address, amount_i128]
    // Amount is scaled as needed. For simplicity in the skeletal code, we pass scaled values or native types
    return [
      nativeToScVal(publicKey, { type: 'address' }),
      nativeToScVal(recipient, { type: 'address' }),
      nativeToScVal(BigInt(parseFloat(amount) * 10000000), { type: 'i128' }), // 7 decimals
    ];
  };

  const handleSimulate = async () => {
    if (!publicKey) return;
    setSimulating(true);
    setSimError(null);
    setSimResult(null);
    try {
      // Simulate contract call
      const res = await simulateContractCall({
        contractId,
        method: 'transfer',
        args: getArgs(),
        source: publicKey,
        network,
      });
      setSimResult({
        fee: res.minFee || '0.005 XLM',
        eventsCount: res.events?.length || 0,
        raw: JSON.stringify(res, null, 2),
      });
    } catch (err: any) {
      setSimError(err.message || 'Simulation failed');
    } finally {
      setSimulating(false);
    }
  };

  const handleTransfer = async () => {
    if (!publicKey) return;
    try {
      const res = await invoke({
        method: 'transfer',
        args: getArgs(),
      });
      console.log('Soroban Transfer Complete:', res);
    } catch (err) {
      console.error('Soroban Transfer Failed:', err);
    }
  };

  if (status !== 'connected') {
    return (
      <View style={COMMON_STYLES.card}>
        <Text style={TYPOGRAPHY.titleMedium}>Soroban Token Transfer</Text>
        <Text style={[TYPOGRAPHY.bodyMedium, styles.placeholderText]}>
          Connect your wallet to interact with Soroban contract methods.
        </Text>
      </View>
    );
  }

  return (
    <View style={COMMON_STYLES.card}>
      <Text style={[TYPOGRAPHY.titleMedium, { marginBottom: SPACING.md }]}>Soroban Token Transfer</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Contract ID</Text>
        <TextInput
          style={styles.input}
          value={contractId}
          onChangeText={setContractId}
          placeholder="C..."
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Recipient Address</Text>
        <TextInput
          style={styles.input}
          value={recipient}
          onChangeText={setRecipient}
          placeholder="G..."
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0.0"
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.simulateButton]}
          onPress={handleSimulate}
          disabled={simulating || invoking}
        >
          {simulating ? (
            <ActivityIndicator color={COLORS.secondary} size="small" />
          ) : (
            <Text style={styles.simulateButtonText}>Simulate</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.executeButton]}
          onPress={handleTransfer}
          disabled={simulating || invoking}
        >
          {invoking ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={COMMON_STYLES.buttonText}>Submit Transfer</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Simulation Result */}
      {simResult && (
        <View style={styles.simResultContainer}>
          <Text style={styles.sectionTitle}>Simulation Succeeded</Text>
          <Text style={TYPOGRAPHY.bodySmall}>Minimum Fee: {simResult.fee}</Text>
          <Text style={TYPOGRAPHY.bodySmall}>Contract Events: {simResult.eventsCount}</Text>
        </View>
      )}

      {simError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Simulation Error (S001)</Text>
          <Text style={styles.errorText}>{simError}</Text>
        </View>
      )}

      {/* Invocation Result */}
      {txResult && (
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>Transaction Executed</Text>
          <Text style={TYPOGRAPHY.bodySmall}>Decoded Result: Success</Text>
        </View>
      )}

      {txError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            Execution Error ({txError.code || 'InvokeFailed'})
          </Text>
          <Text style={styles.errorText}>{txError.message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    color: COLORS.textPrimary,
    fontFamily: TYPOGRAPHY.code.fontFamily,
    fontSize: 13,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simulateButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  simulateButtonText: {
    color: COLORS.secondary,
    fontWeight: '600',
    fontSize: 15,
  },
  executeButton: {
    backgroundColor: COLORS.primary,
  },
  placeholderText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    paddingVertical: SPACING.lg,
  },
  simResultContainer: {
    backgroundColor: COLORS.secondaryGlow,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  successContainer: {
    backgroundColor: COLORS.successGlow,
    borderColor: COLORS.success,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  errorContainer: {
    backgroundColor: COLORS.errorGlow,
    borderColor: COLORS.error,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    color: COLORS.secondary,
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 2,
  },
  successTitle: {
    color: COLORS.success,
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 2,
  },
  errorTitle: {
    color: COLORS.error,
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 2,
  },
  errorText: {
    color: COLORS.textPrimary,
    fontSize: 12,
  },
});
