import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function PrivacyScreen() {
  const { activeTheme } = useTheme();
  
  return (
    <ScrollView style={[
      styles.container,
      { backgroundColor: activeTheme === 'dark' ? '#121212' : '#f5f5f5' }
    ]}>
      <Text style={[
        styles.title,
        { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
      ]}>
        Privacy Policy
      </Text>
      
      <View style={[
        styles.section,
        { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
      ]}>
        <Text style={[
          styles.sectionTitle,
          { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
        ]}>
          Introduction
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          This Privacy Policy details how Apsara AI collects, uses, and protects your personal information when you use our application.
        </Text>
      </View>
      
      <View style={[
        styles.section,
        { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
      ]}>
        <Text style={[
          styles.sectionTitle,
          { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
        ]}>
          Information We Collect
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          We collect information that you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, and chat messages.
        </Text>
      </View>
      
      <View style={[
        styles.section,
        { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
      ]}>
        <Text style={[
          styles.sectionTitle,
          { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
        ]}>
          How We Use Your Information
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          We use your information to provide, maintain, and improve our services, develop new features, and protect our users. We may use your chat data to train and improve our AI models.
        </Text>
      </View>
      
      <View style={[
        styles.section,
        { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
      ]}>
        <Text style={[
          styles.sectionTitle,
          { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
        ]}>
          Data Security
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </Text>
      </View>
      
      <View style={[
        styles.section,
        { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
      ]}>
        <Text style={[
          styles.sectionTitle,
          { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
        ]}>
          Contact Us
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          If you have any questions about this Privacy Policy, please contact us at privacy@apsaraai.com.
        </Text>
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
  section: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
});