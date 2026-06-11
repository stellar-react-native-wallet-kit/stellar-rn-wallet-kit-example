import React from 'react';
import { View, Text, Switch, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, COMMON_STYLES } from '../styles/theme';

interface MockSettingsProps {
  isMockMode: boolean;
  setIsMockMode: (val: boolean) => void;
  mockPublicKey: string;
  setMockPublicKey: (val: string) => void;
  mockNetwork: 'testnet' | 'mainnet';
  setMockNetwork: (val: 'testnet' | 'mainnet') => void;
  mockSignResponse: string;
  setMockSignResponse: (val: string) => void;
}

export const MockSettings: React.FC<MockSettingsProps> = ({
  isMockMode,
  setIsMockMode,
  mockPublicKey,
  setMockPublicKey,
  mockNetwork,
  setMockNetwork,
  mockSignResponse,
  setMockSignResponse,
}) => {
  return (
    <View style={COMMON_STYLES.card}>
      <View style={styles.header}>
        <View>
          <Text style={TYPOGRAPHY.titleMedium}>Developer Controls</Text>
          <Text style={[TYPOGRAPHY.bodySmall, { color: COLORS.textMuted }]}>
            Simulate the SDK without Freighter Mobile
          </Text>
        </View>
        <Switch
          value={isMockMode}
          onValueChange={setIsMockMode}
          trackColor={{ false: COLORS.cardBorder, true: COLORS.primaryGlow }}
          thumbColor={isMockMode ? COLORS.primary : COLORS.textMuted}
        />
      </View>

      {isMockMode && (
        <View style={styles.settingsContent}>
          <View style={styles.divider} />

          <View style={styles.formGroup}>
            <Text style={styles.label}>Simulated Public Key</Text>
            <TextInput
              style={styles.input}
              value={mockPublicKey}
              onChangeText={setMockPublicKey}
              placeholder="G..."
              placeholderTextColor={COLORS.textMuted}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Simulated Network</Text>
            <View style={styles.networkToggleRow}>
              <TouchableOpacity
                style={[
                  styles.networkButton,
                  mockNetwork === 'testnet' && styles.activeNetworkButton,
                ]}
                onPress={() => setMockNetwork('testnet')}
              >
                <Text
                  style={[
                    styles.networkButtonText,
                    mockNetwork === 'testnet' && styles.activeNetworkText,
                  ]}
                >
                  TESTNET
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.networkButton,
                  mockNetwork === 'mainnet' && styles.activeNetworkButton,
                ]}
                onPress={() => setMockNetwork('mainnet')}
              >
                <Text
                  style={[
                    styles.networkButtonText,
                    mockNetwork === 'mainnet' && styles.activeNetworkText,
                  ]}
                >
                  MAINNET
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Simulated Sign Response (XDR or Error)</Text>
            <TextInput
              style={styles.input}
              value={mockSignResponse}
              onChangeText={setMockSignResponse}
              placeholder="Signed XDR envelope..."
              placeholderTextColor={COLORS.textMuted}
            />
          </View>
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
  },
  settingsContent: {
    marginTop: SPACING.md,
    gap: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginVertical: SPACING.xs,
  },
  formGroup: {
    gap: SPACING.xs,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
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
  networkToggleRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  networkButton: {
    flex: 1,
    height: 38,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeNetworkButton: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryGlow,
  },
  networkButtonText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  activeNetworkText: {
    color: COLORS.primary,
  },
});
