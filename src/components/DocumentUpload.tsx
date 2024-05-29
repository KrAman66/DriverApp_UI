// DocumentUpload.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import tw from 'twrnc';
import { Assets } from 'react-navigation-stack';

const MAX_FILE_SIZE_MB = 15;

interface DocumentUploadProps {
  onDocumentSelect: (document: ImagePicker.ImagePickerSuccessResult | DocumentPicker.DocumentPickerResult) => void;
  maxFileSizeMB?: number;
  buttonText?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onDocumentSelect, maxFileSizeMB = MAX_FILE_SIZE_MB, buttonText = 'Upload or Take Photo' }) => {
  const [selectedDocument, setSelectedDocument] = useState<ImagePicker.ImagePickerSuccessResult | DocumentPicker.DocumentPickerResult | null>(null);

  const handleDocumentPick = async () => {
    Alert.alert(
      "Select Option",
      "Choose an option to upload documents or take a photo",
      [
        {
          text: "Take a Photo",
          onPress: async () => {
            const options = {
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              aspect: [3, 4] as [number, number],
              quality: 1,
            };
            try {
              const response = await ImagePicker.launchCameraAsync(options);
              if (!response.canceled) {
                const fileSize = await getFileSize(response.assets[0].uri);
                if (fileSize <= maxFileSizeMB) {
                  response.assets[0].fileSize = fileSize * (1024 * 1024); // Converting MB back to bytes
                  setSelectedDocument(response);
                  onDocumentSelect(response);
                } else {
                  Alert.alert("File size error", `The selected file is larger than ${maxFileSizeMB}MB.`);
                }
              }
            } catch (error) {
              console.error("Error launching camera:", error);
            }
          },
        },
        {
          text: "Pick a Document",
          onPress: async () => {
            try {
              const pickedFile = await DocumentPicker.getDocumentAsync({
                type: ["application/pdf", "image/*"],
                multiple: false,
              });
              if (!pickedFile.canceled) {
                const fileSize = await getFileSize(pickedFile.assets[0].uri);
                if (fileSize <= maxFileSizeMB) {
                  pickedFile.assets[0].size = fileSize * (1024 * 1024); // Converting MB back to bytes
                  setSelectedDocument(pickedFile);
                  onDocumentSelect(pickedFile);
                } else {
                  Alert.alert("File size error", `The selected file is larger than ${maxFileSizeMB}MB.`);
                }
              }
            } catch (err) {
              console.error("Error while picking document:", err);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const getFileSize = async (uri: string) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        // Convert bytes to megabytes
        return fileInfo.size / (1024 * 1024);
      } else {
        return 0; // Return 0 if the file doesn't exist
      }
    } catch (error) {
      console.error("Error getting file size:", error);
      return Number.MAX_SAFE_INTEGER; // Return a large number if there's an error
    }
  };

  const deleteDocument = () => {
    setSelectedDocument(null);
    onDocumentSelect(null);
  };

  const renderSelectedDocument = () => {
    if (selectedDocument && "assets" in selectedDocument && selectedDocument.assets) {
      const asset = selectedDocument.assets[0];
  
      const formatFileSize = (size: number) => {
        if (size < 1024 * 1024) {
          return `${Math.round(size / 1024)} KB`;
        } else {
          return `${(size / (1024 * 1024)).toFixed(2)} MB`;
        }
      };
  
      const fileName = (asset as ImagePicker.ImagePickerAsset).fileName || (asset as DocumentPicker.DocumentPickerAsset).name || "Unnamed";
      const fileSize = (asset as ImagePicker.ImagePickerAsset).fileSize || (asset as DocumentPicker.DocumentPickerAsset).size || 0;
  
      if (asset.mimeType && asset.mimeType.startsWith("image/")) {
        // For ImagePicker documents (images)
        return (
          <View style={[tw`flex-row items-center p-2 mb-2`, styles.fileContainer]}>
            <Image source={{ uri: asset.uri }} style={tw`w-10 h-10 mr-2`} />
            <View style={tw`flex-1`}>
              <Text style={tw`text-gray-900`}>{fileName}</Text>
              <Text style={tw`text-gray-600`}>{formatFileSize(fileSize)}</Text>
            </View>
            <TouchableOpacity onPress={deleteDocument}>
              <Image source={require("../../assets/delete.png")} style={tw`w-6 h-6`} />
            </TouchableOpacity>
          </View>
        );
      } else if (asset.mimeType && asset.mimeType === "application/pdf") {
        // For DocumentPicker PDFs
        return (
          <View style={[tw`flex-row items-center p-2 mb-2`, styles.fileContainer]}>
            <Image source={require("../../assets/pdf.png")} style={tw`w-6 h-6 mr-2`} />
            <View style={tw`flex-1`}>
              <Text style={tw`text-gray-900`}>{fileName}</Text>
              <Text style={tw`text-gray-600`}>{formatFileSize(fileSize)}</Text>
            </View>
            <TouchableOpacity onPress={deleteDocument}>
              <Image source={require("../../assets/delete.png")} style={tw`w-6 h-6`} />
            </TouchableOpacity>
          </View>
        );
      } else {
        // Unsupported file type
        return (
          <View style={[tw`flex-row items-center p-2 mb-2`, styles.fileContainer]}>
            <Text style={tw`text-red-600`}>Unsupported file type</Text>
          </View>
        );
      }
    }
    return null;
  };
  

  return (
    <View>
      {!selectedDocument && (
        <TouchableOpacity onPress={handleDocumentPick} style={[tw`border-2 mt-10 mb-10 p-4 rounded-3xl flex-row items-center justify-center`, styles.button]}>
          <Text style={tw`text-black text-lg`}>{buttonText}</Text>
        </TouchableOpacity>
      )}
      {renderSelectedDocument() && (
        <View style={tw`mt-40`}>{renderSelectedDocument()}</View>
      )}
    </View>
  );
};

export default DocumentUpload;

const styles = StyleSheet.create({
  button: {
    borderColor: "black",
  },
  fileContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
});
