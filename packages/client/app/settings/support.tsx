import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function SupportScreen() {
  const { activeTheme } = useTheme();
  
  const openEmail = () => {
    Linking.openURL('mailto:support@apsaraai.com');
  };
  
  const openWebsite = () => {
    Linking.openURL('https://www.apsaraai.com/support');
  };
  
  const openFAQ = () => {
    Linking.openURL('https://www.apsaraai.com/faq');
  };
  
  return (
    <ScrollView style={[
      styles.container,
      { backgroundColor: activeTheme === 'dark' ? '#121212' : '#f5f5f5' }
    ]}>
      <Text style={[
        styles.title,
        { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
      ]}>
        Help & Support
      </Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          onPress={openEmail}
          style={[
            styles.option,
            { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
          ]}
        >
          <Text style={[
            styles.optionTitle,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            Contact Support
          </Text>
          <Text style={[
            styles.optionDescription,
            { color: activeTheme === 'dark' ? '#dddddd' : '#666666' }
          ]}>
            Email our support team for assistance
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={openFAQ}
          style={[
            styles.option,
            { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
          ]}
        >
          <Text style={[
            styles.optionTitle,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            Frequently Asked Questions
          </Text>
          <Text style={[
            styles.optionDescription,
            { color: activeTheme === 'dark' ? '#dddddd' : '#666666' }
          ]}>
            Find answers to common questions
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={openWebsite}
          style={[
            styles.option,
            { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
          ]}
        >
          <Text style={[
            styles.optionTitle,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            Support Website
          </Text>
          <Text style={[
            styles.optionDescription,
            { color: activeTheme === 'dark' ? '#dddddd' : '#666666' }
          ]}>
            Visit our support portal for more resources
          </Text>
        </TouchableOpacity>
        
        <View style={[
          styles.infoCard,
          { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
        ]}>
          <Text style={[
            styles.infoTitle,
            { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
          ]}>
            Support Hours
          </Text>
          <Text style={[
            styles.infoText,
            { color: activeTheme === 'dark' ? '#dddddd' : '#666666' }
          ]}>
            Monday - Friday: 9am - 6pm EST
          </Text>
          <Text style={[
            styles.infoText,
            { color: activeTheme === 'dark' ? '#dddddd' : '#666666' }
          ]}>
            Weekend: 10am - 4pm EST
          </Text>
        </View>
      </View>
    </ScrollView>
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
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
  },
  infoCard: {
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});