import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeScreen() {
  const { theme, setTheme, activeTheme } = useTheme();
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: activeTheme === 'dark' ? '#121212' : '#f5f5f5' }
    ]}>
      <Text style={[
        styles.title,
        { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
      ]}>
        Theme Settings
      </Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[
            styles.option,
            theme === 'light' && styles.selectedOption,
            { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
          ]}
          onPress={() => setTheme('light')}
        >
          <Text style={[
            styles.optionText,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            Light
          </Text>
          {theme === 'light' && <Text style={styles.selectedText}>✓</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.option,
            theme === 'dark' && styles.selectedOption,
            { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
          ]}
          onPress={() => setTheme('dark')}
        >
          <Text style={[
            styles.optionText,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            Dark
          </Text>
          {theme === 'dark' && <Text style={styles.selectedText}>✓</Text>}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.option,
            theme === 'system' && styles.selectedOption,
            { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
          ]}
          onPress={() => setTheme('system')}
        >
          <Text style={[
            styles.optionText,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            System Default
          </Text>
          {theme === 'system' && <Text style={styles.selectedText}>✓</Text>}
        </TouchableOpacity>
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
  optionsContainer: {
    gap: 16,
  },
  option: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});