import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function NotificationsScreen() {
  const { activeTheme } = useTheme();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [chatEnabled, setChatEnabled] = useState(true);
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: activeTheme === 'dark' ? '#121212' : '#f5f5f5' }
    ]}>
      <Text style={[
        styles.title,
        { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
      ]}>
        Notification Settings
      </Text>
      
      <View style={styles.settingsContainer}>
        <View style={[
          styles.settingItem,
          { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
        ]}>
          <Text style={[
            styles.settingLabel,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            Push Notifications
          </Text>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={pushEnabled ? '#007AFF' : '#f4f3f4'}
          />
        </View>
        
        <View style={[
          styles.settingItem,
          { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
        ]}>
          <Text style={[
            styles.settingLabel,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            Chat Notifications
          </Text>
          <Switch
            value={chatEnabled}
            onValueChange={setChatEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={chatEnabled ? '#007AFF' : '#f4f3f4'}
            disabled={!pushEnabled}
          />
        </View>
        
        <View style={[
          styles.settingItem,
          { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
        ]}>
          <Text style={[
            styles.settingLabel,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            App Updates
          </Text>
          <Switch
            value={updatesEnabled}
            onValueChange={setUpdatesEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={updatesEnabled ? '#007AFF' : '#f4f3f4'}
            disabled={!pushEnabled}
          />
        </View>
        
        <View style={[
          styles.settingItem,
          { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
        ]}>
          <Text style={[
            styles.settingLabel,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            Marketing Messages
          </Text>
          <Switch
            value={marketingEnabled}
            onValueChange={setMarketingEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={marketingEnabled ? '#007AFF' : '#f4f3f4'}
            disabled={!pushEnabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  settingsContainer: {
    gap: 16,
  },
  settingItem: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
  },
});