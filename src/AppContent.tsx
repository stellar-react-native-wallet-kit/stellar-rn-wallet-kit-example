import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { StatusCard } from "./components/StatusCard";
import { BalancesList } from "./components/BalancesList";
import { SorobanForm } from "./components/SorobanForm";
import { EventsFeed } from "./components/EventsFeed";
import { MockSettings } from "./components/MockSettings";
import { HomePage } from "./components/HomePage";
import { COLORS, SPACING, TYPOGRAPHY } from "./styles/theme";

interface AppContentProps {
  isMockMode: boolean;
  setIsMockMode: (val: boolean) => void;
  mockPublicKey: string;
  setMockPublicKey: (val: string) => void;
  mockNetwork: "testnet" | "mainnet";
  setMockNetwork: (val: "testnet" | "mainnet") => void;
  mockSignResponse: string;
  setMockSignResponse: (val: string) => void;
}

export const AppContent: React.FC<AppContentProps> = (props) => {
  const [currentScreen, setCurrentScreen] = React.useState<
    "home" | "dashboard" | "transfer" | "events" | "settings"
  >("home");

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as any);
  };

  const renderContent = () => {
    switch (currentScreen) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "dashboard":
        return (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <StatusCard />
            <BalancesList />
          </ScrollView>
        );
      case "transfer":
        return (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <SorobanForm />
          </ScrollView>
        );
      case "events":
        return (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <EventsFeed />
          </ScrollView>
        );
      case "settings":
        return (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <MockSettings {...props} />
          </ScrollView>
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const getHeaderTitle = () => {
    const titles: Record<string, string> = {
      home: "Stellar RN Kit",
      dashboard: "Dashboard",
      transfer: "Transfer",
      events: "Events",
      settings: "Settings",
    };
    return titles[currentScreen] || "Stellar RN Kit";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          {currentScreen !== "home" && (
            <TouchableOpacity
              onPress={() => setCurrentScreen("home")}
              style={styles.backButton}
            >
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
          )}
          <Text style={TYPOGRAPHY.titleLarge}>{getHeaderTitle()}</Text>
          <Text style={[TYPOGRAPHY.bodySmall, { color: COLORS.textMuted }]}>
            {currentScreen === "home" ? "Soroban Transfer Example" : "v1.0.0"}
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {props.isMockMode ? "MOCK MODE" : "LIVE"}
          </Text>
        </View>
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontWeight: "700",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  backButton: {
    marginBottom: SPACING.sm,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
});
