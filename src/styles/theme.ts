import { StyleSheet } from 'react-native';

export const COLORS = {
  // Deep premium dark space background
  background: '#08090f',
  cardBg: '#11131c',
  cardBorder: '#1c1f30',
  
  // Vibrant brand colors (Stellar-themed)
  primary: '#3b82f6', // Bright blue
  primaryHover: '#60a5fa',
  primaryGlow: 'rgba(59, 130, 246, 0.15)',
  
  secondary: '#8b5cf6', // Indigo / Soroban violet
  secondaryGlow: 'rgba(139, 92, 246, 0.15)',
  
  // Statuses
  success: '#10b981', // Emerald green
  successGlow: 'rgba(16, 185, 129, 0.15)',
  warning: '#f59e0b', // Amber yellow
  error: '#ef4444', // Red
  errorGlow: 'rgba(239, 68, 68, 0.15)',
  
  // Typography
  textPrimary: '#ffffff',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textLink: '#60a5fa',
  
  // Overlay/Glassmorphism effects
  glassBg: 'rgba(255, 255, 255, 0.03)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  full: 9999,
};

export const TYPOGRAPHY = {
  titleLarge: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  titleMedium: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: COLORS.textPrimary,
  },
  bodyLarge: {
    fontSize: 16,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  code: {
    fontSize: 12,
    fontFamily: 'Platform' === 'ios' ? 'Courier New' : 'monospace',
    color: COLORS.textPrimary,
  },
};

export const COMMON_STYLES = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  glassCard: {
    backgroundColor: COLORS.glassBg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
});
