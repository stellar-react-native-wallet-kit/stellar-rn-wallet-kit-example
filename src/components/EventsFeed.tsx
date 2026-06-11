import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useStellarEvents } from '@stellar/react-native-wallet-kit';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY, COMMON_STYLES } from '../styles/theme';

interface LogEntry {
  timestamp: string;
  event: string;
  payload: string;
}

export const EventsFeed: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { on } = useStellarEvents();
  const scrollRef = useRef<ScrollView>(null);

  const addLog = (event: string, payload: any) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      ...prev,
      {
        timestamp: time,
        event,
        payload: typeof payload === 'object' ? JSON.stringify(payload, null, 2) : String(payload),
      },
    ]);
  };

  useEffect(() => {
    // Subscribe to all SDK events listed in reference
    const unsubscribes = [
      on('wallet:connected', (p) => addLog('wallet:connected', p)),
      on('wallet:disconnected', (p) => addLog('wallet:disconnected', p)),
      on('tx:sign_requested', (p) => addLog('tx:sign_requested', p)),
      on('tx:sign_approved', (p) => addLog('tx:sign_approved', p)),
      on('tx:sign_rejected', (p) => addLog('tx:sign_rejected', p)),
      on('tx:submitted', (p) => addLog('tx:submitted', p)),
      on('tx:failed', (p) => addLog('tx:failed', p)),
      on('contract:invoked', (p) => addLog('contract:invoked', p)),
    ];

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [on]);

  const handleClear = () => {
    setLogs([]);
  };

  const getEventColor = (event: string) => {
    if (event.includes('connected') || event.includes('approved') || event.includes('submitted') || event.includes('invoked')) {
      return COLORS.success;
    }
    if (event.includes('rejected') || event.includes('failed')) {
      return COLORS.error;
    }
    if (event.includes('requested') || event.includes('connecting')) {
      return COLORS.primary;
    }
    return COLORS.textSecondary;
  };

  return (
    <View style={COMMON_STYLES.card}>
      <View style={styles.header}>
        <Text style={TYPOGRAPHY.titleMedium}>Live Event Log</Text>
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.terminalContainer}>
        {logs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events recorded yet. Connect your wallet or initiate a transaction to see logs.</Text>
          </View>
        ) : (
          <ScrollView
            ref={scrollRef}
            style={styles.terminalScroll}
            contentContainerStyle={styles.terminalContent}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            nestedScrollEnabled
          >
            {logs.map((log, index) => (
              <View key={index} style={styles.logItem}>
                <View style={styles.logHeader}>
                  <Text style={styles.logTimestamp}>[{log.timestamp}]</Text>
                  <Text style={[styles.logEventName, { color: getEventColor(log.event) }]}>
                    {log.event}
                  </Text>
                </View>
                {log.payload && log.payload !== '{}' && (
                  <Text style={styles.logPayload}>{log.payload}</Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>
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
  clearButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  clearButtonText: {
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  terminalContainer: {
    backgroundColor: '#05060a',
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    height: 180,
    padding: SPACING.sm,
  },
  terminalScroll: {
    flex: 1,
  },
  terminalContent: {
    paddingBottom: SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: TYPOGRAPHY.code.fontFamily,
  },
  logItem: {
    marginBottom: SPACING.sm,
  },
  logHeader: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  logTimestamp: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontFamily: TYPOGRAPHY.code.fontFamily,
  },
  logEventName: {
    fontWeight: 'bold',
    fontSize: 11,
    fontFamily: TYPOGRAPHY.code.fontFamily,
  },
  logPayload: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontFamily: TYPOGRAPHY.code.fontFamily,
    paddingLeft: SPACING.md,
    marginTop: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
  },
});
