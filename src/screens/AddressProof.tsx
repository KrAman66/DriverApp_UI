import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc';
import DocumentUpload from '../components/DocumentUpload'; // Adjust the import path as necessary

const { width, height } = Dimensions.get('window');

const getResponsiveSize = (sm: number, md: number, lg: number) => {
  if (width < 350) {
    return sm;
  } else if (width >= 350 && width < 600) {
    return md;
  } else {
    return lg;
  }
};

const AddressProof: React.FC = () => {
  const navigation = useNavigation();
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDocumentSelect = (document: ImagePicker.ImagePickerSuccessResult | DocumentPicker.DocumentPickerResult) => {
    if (!document.canceled) {
      setSelectedDocument(document as never);
      console.log('Selected Document:', document);
    }
  };

  return (
    <ScrollView style={tw`bg-white h-full`}>
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={[tw`m-6`, styles.container]}>
          <Text style={[tw`font-bold`, { fontSize: getResponsiveSize(24, 28, 32) }]}>
            Proof of your home address
          </Text>
          <View>
            <Text style={[tw`mt-4`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
              Please upload or take a photo of a document containing your home address. This could be any of the following documents:
            </Text>
            <View style={[tw`ml-8 mt-4`, styles.documentList]}>
              <Text style={[{ fontSize: getResponsiveSize(14, 16, 18) }]}>• Utility bill</Text>
              <Text style={[{ fontSize: getResponsiveSize(14, 16, 18) }]}>• Council letter</Text>
              <Text style={[{ fontSize: getResponsiveSize(14, 16, 18) }]}>• HMRC letter</Text>
              <Text style={[{ fontSize: getResponsiveSize(14, 16, 18) }]}>• Bank statement</Text>
              <Text style={[{ fontSize: getResponsiveSize(14, 16, 18) }]}>• Proof of student address</Text>
              <Text style={[tw`ml-2`, { fontSize: getResponsiveSize(12, 14, 16) }]}>
                (for example, a university letter)
              </Text>
            </View>
            <Text style={[tw`mt-4`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
              Make sure the file size is not larger than 15MB and the photo is clear with all details visible.
            </Text>
            <DocumentUpload
              onDocumentSelect={handleDocumentSelect}
              maxFileSizeMB={15}
              buttonText="Upload or Take Photo"
            />
            {selectedDocument && (
              <TouchableOpacity
                onPress={() => navigation.navigate("DriverDetails" as never)}
                style={[tw`bg-black mt-10 mb-10 p-4 rounded-3xl flex-row items-center justify-center`, styles.saveButton]}
              >
                <Text style={[tw`text-white`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
                  SAVE AND CONTINUE
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default AddressProof;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getResponsiveSize(10, 20, 30),
    marginTop: getResponsiveSize(60, 90, 120),
  },
  documentList: {
    marginLeft: getResponsiveSize(10, 20, 30),
    marginTop: getResponsiveSize(10, 20, 30),
  },
  saveButton: {
    marginTop: getResponsiveSize(10, 20, 30),
    marginBottom: getResponsiveSize(10, 20, 30),
    paddingVertical: getResponsiveSize(10, 12, 14),
    paddingHorizontal: getResponsiveSize(20, 25, 30),
  },
});
