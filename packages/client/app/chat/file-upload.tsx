import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFileUpload } from '../../hooks/useFileUpload';

export default function FileUploadScreen() {
  const router = useRouter();
  const { pickImage, pickDocument, selectedFiles, removeFile, uploadFiles } = useFileUpload();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    try {
      await uploadFiles();
      router.back();
    } catch (error) {
      console.error('Upload error:', error);
      // Show error UI
    } finally {
      setIsUploading(false);
    }
  };

  const renderFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image/jpeg':
      case 'image/png':
        return <Ionicons name="image" size={24} color="#3b82f6" />;
      case 'application/pdf':
        return <Ionicons name="document-text" size={24} color="#ef4444" />;
      case 'text/plain':
        return <Ionicons name="document" size={24} color="#9ca3af" />;
      default:
        return <Ionicons name="document" size={24} color="#9ca3af" />;
    }
  };

  const formatFileSize = (bytes: string | number) => {
    const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
    if (numBytes < 1024) return numBytes + ' B';
    else if (numBytes < 1048576) return (numBytes / 1024).toFixed(1) + ' KB';
    else return (numBytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar style="auto" />

      <View className="p-4">
        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">Share Files</Text>
        <Text className="text-gray-500 dark:text-gray-400 mb-6">
          Select files to share in your conversation
        </Text>

        {/* File picker options */}
        <View className="flex-row mb-6">
          <TouchableOpacity 
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mr-2 items-center"
            onPress={pickImage}
          >
            <Ionicons name="image" size={24} color="#3b82f6" />
            <Text className="text-gray-900 dark:text-white mt-2">Photos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 ml-2 items-center"
            onPress={pickDocument}
          >
            <Ionicons name="document-text" size={24} color="#3b82f6" />
            <Text className="text-gray-900 dark:text-white mt-2">Documents</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected files list */}
      {selectedFiles.length > 0 ? (
        <FlatList
          data={selectedFiles}
          keyExtractor={(item) => item.uri}
          className="flex-1 px-4"
          renderItem={({ item }) => (
            <View className="flex-row items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-2">
              {item.type.startsWith('image/') ? (
                <Image 
                  source={{ uri: item.uri }}
                  className="w-12 h-12 rounded mr-3"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded items-center justify-center mr-3">
                  {renderFileIcon(item.type)}
                </View>
              )}
              <View className="flex-1">
                <Text className="text-gray-900 dark:text-white" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text className="text-gray-500 dark:text-gray-400 text-xs">
                  {formatFileSize(item.size)}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => removeFile(item.uri)}
                className="p-2"
              >
                <Ionicons name="close-circle" size={24} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Ionicons name="document-attach-outline" size={48} color="#9ca3af" />
          <Text className="text-gray-500 dark:text-gray-400 mt-4 text-center">
            No files selected. Tap one of the options above to select files.
          </Text>
        </View>
      )}

      {/* Action buttons */}
      <View className="p-4 border-t border-gray-200 dark:border-gray-800">
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 py-3 rounded-lg border border-gray-300 dark:border-gray-700 mr-2"
          >
            <Text className="text-center text-gray-900 dark:text-white">Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleUpload}
            disabled={selectedFiles.length === 0 || isUploading}
            className={`flex-1 py-3 rounded-lg ml-2 ${
              selectedFiles.length === 0 || isUploading
                ? 'bg-blue-300 dark:bg-blue-800'
                : 'bg-blue-500'
            }`}
          >
            <Text className="text-center text-white">
              {isUploading ? 'Uploading...' : 'Send'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}