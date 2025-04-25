import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

interface FileInfo {
  uri: string;
  name: string;
  type: string;
  size: number;
}

export function useFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);

  const pickImage = async () => {
    // Request permissions first
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newFiles = result.assets.map(asset => ({
        uri: asset.uri,
        name: asset.uri.split('/').pop() || 'image.jpg',
        type: 'image/jpeg', // This is a simplification, should detect actual mime type
        size: asset.fileSize || 0,
      }));

      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      multiple: true,
      copyToCacheDirectory: true
    });

    if (result.canceled === false) {
      const newFiles = result.assets.map(asset => ({
        uri: asset.uri,
        name: asset.name,
        type: asset.mimeType || 'application/octet-stream',
        size: asset.size,
      }));
      
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles.map(file => ({ ...file, size: file.size || 0 }))]);
    }
  };

  const removeFile = (uri: string) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.uri !== uri));
  };

  const uploadFiles = async () => {
    // In a real app, you'd upload these files to your backend
    // This is a mock implementation that simulates an upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return the uploaded files info that can be used in the chat
    const uploadedFiles = selectedFiles.map(file => ({
      ...file,
      url: file.uri // In a real app, this would be the URL from the server
    }));
    
    // Clear selected files after successful upload
    setSelectedFiles([]);
    
    return uploadedFiles;
  };

  return {
    selectedFiles,
    pickImage,
    pickDocument,
    removeFile,
    uploadFiles,
  };
}