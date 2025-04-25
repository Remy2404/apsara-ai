import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function TermsScreen() {
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
        Terms of Service
      </Text>
      
      <View style={[
        styles.section,
        { backgroundColor: activeTheme === 'dark' ? '#333333' : '#ffffff' }
      ]}>
        <Text style={[
          styles.sectionTitle,
          { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
        ]}>
          1. Acceptance of Terms
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          By accessing or using Apsara AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
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
          2. User Accounts
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          You may be required to create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
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
          3. User Content
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          You retain ownership of any content you submit to Apsara AI. By submitting content, you grant us a worldwide, non-exclusive license to use, reproduce, modify, and display your content for the purpose of providing and improving our services.
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
          4. Prohibited Activities
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          You agree not to engage in any of the following prohibited activities: using our service for illegal purposes, attempting to access non-public areas of our platform, and circumventing any access control measures.
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
          5. Modifications to the Service
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          We reserve the right to modify or discontinue, temporarily or permanently, the service or any features or portions thereof without prior notice.
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
          6. Termination
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason.
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
          7. Contact
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          If you have any questions about these Terms, please contact us at legal@apsaraai.com.
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