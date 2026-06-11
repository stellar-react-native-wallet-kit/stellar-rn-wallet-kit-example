import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StatusCard } from './components/StatusCard';
import { BalancesList } from './components/BalancesList';
import { SorobanForm } from './components/SorobanForm';
import { EventsFeed } from './components/EventsFeed';
import { MockSettings } from './components/MockSettings';
import { COLORS, SPACING, TYPOGRAPHY } from './styles/theme';

interface AppContentProps {
  isMockMode: boolean;
  setIsMockMode: (val: boolean) => void;
  mockPublicKey: string;
  setMockPublicKey: (val: string) => void;
  mockNetwork: 'testnet' | 'mainnet';
  setMockNetwork: (val: 'testnet' | 'mainnet') => void;
  mockSignResponse: string;
  setMockSignResponse: (val: string) => void;
}

export const AppContent: React.FC<AppContentProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View>
          <Text style={TYPOGRAPHY.titleLarge}>Stellar RN Kit</Text>
          <Text style={[TYPOGRAPHY.bodySmall, { color: COLORS.textMuted }]}>
            Soroban Transfer Example
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {props.isMockMode ? 'MOCK MODE' : 'LIVE'}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <StatusCard />
        
        <BalancesList />
        
        <SorobanForm />
        
        <EventsFeed />

        <MockSettings {...props} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  badge: {
    backgroundColor: COLORS.primaryGlow,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
});
