import { useState, useEffect, useCallback } from 'react';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export function useVoiceInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingPermission, setRecordingPermission] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [recordedText, setRecordedText] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [durationInterval, setDurationInterval] = useState<NodeJS.Timeout | null>(null);

  // Check for recording permissions on component mount
  useEffect(() => {
    checkPermission();
    return () => {
      // Clean up any ongoing recording when unmounting
      if (isRecording && recording) {
        recording.stopAndUnloadAsync();
      }
      if (durationInterval) {
        clearInterval(durationInterval);
      }
    };
  }, []);

  // Check and request permissions
  const checkPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setRecordingPermission(status === 'granted');
    } catch (error) {
      console.error('Error checking microphone permission:', error);
      setRecordingPermission(false);
    }
  };

  const requestPermission = async () => {
    await checkPermission();
  };

  // Start recording
  const startRecording = useCallback(async () => {
    try {
      if (!recordingPermission) {
        await checkPermission();
        if (!recordingPermission) {
          return;
        }
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Create new recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);
      setRecordedText(null);

      // Start duration timer
      const interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
      
      setDurationInterval(interval);

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [recordingPermission]);

  // Stop recording
  const stopRecording = useCallback(async (reset = false) => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      
      // Clear duration timer
      if (durationInterval) {
        clearInterval(durationInterval);
        setDurationInterval(null);
      }
      
      setIsRecording(false);
      
      if (reset) {
        setRecording(null);
        setRecordedText(null);
        setRecordingUri(null);
        return;
      }
      
      // Get recording URI
      const uri = recording.getURI();
      setRecordingUri(uri);
      
      if (uri) {
        // In a real app, this would send the audio file to a speech-to-text API
        // Here we'll simulate a response after a delay
        setIsProcessing(true);
        
        // Simulate processing time
        setTimeout(() => {
          const mockTexts = [
            "Hi there, how can I help you with your project today?",
            "Can you help me with implementing a new feature for my app?",
            "I'd like to discuss the design of our new user interface.",
            "Let's schedule a meeting to talk about the project timeline.",
          ];
          
          const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
          setRecordedText(randomText);
          setIsProcessing(false);
        }, 2000);
      }
      
      setRecording(null);

    } catch (error) {
      console.error('Error stopping recording:', error);
      setIsRecording(false);
      setRecording(null);
    }
  }, [recording, durationInterval]);

  // Send the voice message to the chat
  const sendVoiceMessage = async () => {
    // In a real app, this would add the message to the chat
    // and potentially save the audio file
    if (!recordedText) return null;
    
    // Return the transcribed text and audio URI
    const result = {
      text: recordedText,
      audioUri: recordingUri
    };
    
    // Reset states for next recording
    setRecordedText(null);
    setRecordingUri(null);
    
    return result;
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    recordingDuration,
    recordingPermission,
    requestPermission,
    recordedText,
    sendVoiceMessage,
    isProcessing
  };
}