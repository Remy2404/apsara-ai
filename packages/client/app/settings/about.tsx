import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export default function AboutScreen() {
  const { activeTheme } = useTheme();
  
  return (
    <ScrollView style={[
      styles.container,
      { backgroundColor: activeTheme === 'dark' ? '#121212' : '#f5f5f5' }
    ]}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[
          styles.appName,
          { color: activeTheme === 'dark' ? '#ffffff' : '#000000' }
        ]}>
          Apsara AI
        </Text>
        <Text style={[
          styles.version,
          { color: activeTheme === 'dark' ? '#cccccc' : '#666666' }
        ]}>
          Version 1.0.0
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
          About Apsara AI
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          Apsara AI is a professional AI chatbot application designed to provide intelligent conversations and assistance.
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
          Development Team
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          Developed by the Apsara AI Team
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
          Contact Information
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          Email: support@apsaraai.com
        </Text>
        <Text style={[
          styles.sectionContent,
          { color: activeTheme === 'dark' ? '#dddddd' : '#333333' }
        ]}>
          Website: www.apsaraai.com
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
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