import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../styles/theme";

interface HomePageProps {
  onNavigate: (screen: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={[TYPOGRAPHY.titleLarge, styles.heroTitle]}>
          Stellar Wallet Kit
        </Text>
        <Text style={[TYPOGRAPHY.bodyLarge, styles.heroSubtitle]}>
          A React Native wallet integration example powered by Soroban
        </Text>
      </View>

      {/* Feature Cards */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => onNavigate("dashboard")}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>💰</Text>
          </View>
          <Text
            style={[
              TYPOGRAPHY.bodyMedium,
              { fontWeight: "600", color: COLORS.textPrimary },
            ]}
          >
            Dashboard
          </Text>
          <Text style={[TYPOGRAPHY.bodySmall, styles.cardDescription]}>
            View your account status and balances
          </Text>
          <View style={styles.cardArrow}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => onNavigate("transfer")}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>🔄</Text>
          </View>
          <Text
            style={[
              TYPOGRAPHY.bodyMedium,
              { fontWeight: "600", color: COLORS.textPrimary },
            ]}
          >
            Transfer
          </Text>
          <Text style={[TYPOGRAPHY.bodySmall, styles.cardDescription]}>
            Execute Soroban smart contract transfers
          </Text>
          <View style={styles.cardArrow}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => onNavigate("events")}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>📋</Text>
          </View>
          <Text
            style={[
              TYPOGRAPHY.bodyMedium,
              { fontWeight: "600", color: COLORS.textPrimary },
            ]}
          >
            Events
          </Text>
          <Text style={[TYPOGRAPHY.bodySmall, styles.cardDescription]}>
            Track recent transactions and events
          </Text>
          <View style={styles.cardArrow}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => onNavigate("settings")}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Text style={styles.cardIcon}>⚙️</Text>
          </View>
          <Text
            style={[
              TYPOGRAPHY.bodyMedium,
              { fontWeight: "600", color: COLORS.textPrimary },
            ]}
          >
            Settings
          </Text>
          <Text style={[TYPOGRAPHY.bodySmall, styles.cardDescription]}>
            Configure wallet and network settings
          </Text>
          <View style={styles.cardArrow}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text
          style={[
            TYPOGRAPHY.bodyMedium,
            { fontWeight: "600", color: COLORS.textPrimary },
          ]}
        >
          About This App
        </Text>
        <Text style={[TYPOGRAPHY.bodySmall, styles.infoText]}>
          This is a demonstration of the @stellar/react-native-wallet-kit
          integration. It showcases how to connect to Stellar wallets, manage
          balances, and execute Soroban smart contract transactions.
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={[TYPOGRAPHY.bodySmall, { color: COLORS.textMuted }]}>
            Open Source
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5★</Text>
          <Text style={[TYPOGRAPHY.bodySmall, { color: COLORS.textMuted }]}>
            Built with React Native
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>∞</Text>
          <Text style={[TYPOGRAPHY.bodySmall, { color: COLORS.textMuted }]}>
            Testnet Ready
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  heroSection: {
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  heroTitle: {
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  heroSubtitle: {
    color: COLORS.textMuted,
    textAlign: "center",
    lineHeight: 24,
  },
  cardsContainer: {
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    position: "relative",
  },
  cardIconContainer: {
    marginBottom: SPACING.sm,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    lineHeight: 18,
  },
  cardArrow: {
    position: "absolute",
    top: SPACING.md,
    right: SPACING.md,
  },
  arrow: {
    fontSize: 20,
    color: COLORS.primary,
  },
  infoSection: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  infoText: {
    lineHeight: 20,
    marginTop: SPACING.sm,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statNumber: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
});
