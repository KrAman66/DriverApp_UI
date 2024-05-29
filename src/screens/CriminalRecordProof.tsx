import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { GestureResponderEvent, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import tw from 'twrnc';
import * as Yup from 'yup';
import DocumentUpload from '../components/DocumentUpload';
import { Dimensions } from 'react-native';

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

const CriminalRecordProof: React.FC = () => {
  const navigation = useNavigation();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const validationSchema = Yup.object().shape({
    dbsCode: Yup.string().required('DBS Code is required'),
  });

  const handleSubmit = (values: any) => {
    console.log("Form Data:", values);
    console.log("Document Asset:", selectedDocument);
    if (selectedDocument) {
      navigation.navigate("DriverDetails" as never);
    } else {
      alert("Please upload a document or take a photo");
    }
  };

  return (
    <ScrollView ref={scrollViewRef} style={tw`bg-white h-full`}>
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={[tw`m-6`, styles.container]}>
          <Text style={[tw`font-bold`, { fontSize: getResponsiveSize(24, 28, 32) }]}>
            Do you have any unspent criminal convictions?
          </Text>
          <View>
            <Text style={[tw`mt-6`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
              To become a Graun rider, you must not have any unspent criminal convictions. We'll run a background check soon to verify this.
            </Text>
            <Text style={[tw`mt-10`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
              If you would like to check the status of your conviction, please visit{' '}
              <Pressable onPress={() => console.log("navigate")}>
                <Text style={tw`underline`}>GOV UK Checker</Text>
              </Pressable>.
            </Text>
            <Formik
              initialValues={{ dbsCode: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <View style={[tw`my-4 mt-10`, styles.inputContainer]}>
                    <Text style={[tw`text-gray-900 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Enter your DBS code here</Text>
                    <TextInput
                      style={[tw`w-full h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                      placeholder="DBS Code"
                      onChangeText={handleChange('dbsCode')}
                      onBlur={handleBlur('dbsCode')}
                      value={values.dbsCode}
                    />
                    {touched.dbsCode && errors.dbsCode && (
                      <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>{errors.dbsCode}</Text>
                    )}
                  </View>
                  {values.dbsCode && (
                    <DocumentUpload
                      onDocumentSelect={(document: ImagePicker.ImagePickerSuccessResult | DocumentPicker.DocumentPickerResult) => {
                        setSelectedDocument(document as any);
                        scrollViewRef.current?.scrollToEnd({ animated: true });
                      }}
                      maxFileSizeMB={15}
                      buttonText="Upload or Take Photo"
                    />
                  )}
                  {selectedDocument && (
                    <TouchableOpacity
                      onPress={(event: GestureResponderEvent) => handleSubmit(event as any)}
                      style={[
                        tw`bg-black mt-10 mb-10 p-4 rounded-3xl flex-row items-center justify-center`,
                        styles.saveButton,
                      ]}
                    >
                      <Text style={[tw`text-white`, { fontSize: getResponsiveSize(16, 18, 20) }]}>SAVE AND CONTINUE</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </Formik>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default CriminalRecordProof;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getResponsiveSize(10, 20, 30),
    marginTop: getResponsiveSize(60, 90, 120),
  },
  inputContainer: {
    marginTop: getResponsiveSize(10, 20, 30),
  },
  input: {
    width: '100%',
  },
  saveButton: {
    backgroundColor: "black",
    marginTop: getResponsiveSize(10, 20, 30),
    paddingVertical: getResponsiveSize(10, 12, 14),
    paddingHorizontal: getResponsiveSize(20, 25, 30),
  },
});
