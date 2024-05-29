import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import React, { useState, useRef } from 'react';
import { GestureResponderEvent, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import tw from 'twrnc';
import * as Yup from 'yup';
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

const BankingDetails: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const validationSchema = Yup.object().shape({
    accountHolderName: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Invalid name format")
      .min(3, "Invalid account holder name")
      .required("Account Holder Name is required"),
    accountNumber: Yup.string()
      .matches(/^\d{8}$/, "Account number must be exactly 8 digits")
      .required("Account number is required"),
    sortCode: Yup.string()
      .matches(/^\d{2}-\d{2}-\d{2}$/, "Sort code must be in the format 12-34-56")
      .required("Sort code is required"),
  });

  const handleSubmit = (values: any) => {
    console.log('Form Data:', values);
    console.log('Document Asset:', selectedDocument);

    if (selectedDocument) {
      navigation.navigate("DriverDetails" as never);
    } else {
      alert("Please upload a document or take a photo");
    }
  };

  return (
    <ScrollView style={tw`bg-white h-full`} ref={scrollViewRef}>
      <SafeAreaView style={[tw`bg-white h-full`, styles.safeAreaView]}>
        <View style={[tw`m-6`, styles.container]}>
          <Text style={[tw`font-bold`, { fontSize: getResponsiveSize(24, 28, 32) }]}>
            Your bank account number
          </Text>
          <Formik
            initialValues={{
              accountHolderName: '',
              accountNumber: '',
              sortCode: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <Text style={[tw`mt-6`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
                  Please enter your bank account number to receive your earnings. This number will be 8 digits.
                </Text>
                <View style={[tw`mt-10`, styles.documentList]}>
                  <Text style={{ fontSize: getResponsiveSize(14, 16, 18) }}>• The bank account must be in your own name</Text>
                  <Text style={{ fontSize: getResponsiveSize(14, 16, 18) }}>• We only accept bank account numbers</Text>
                </View>
                <Text style={[tw`mt-5`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
                  we can't accept credit card or debit card numbers
                </Text>
                <View style={[tw`my-1 mt-10`, styles.inputContainer]}>
                  <Text style={[tw`text-gray-900 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Account Holder Name</Text>
                  <TextInput
                    style={[tw`w-full h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                    placeholder="eg: John Doe"
                    onChangeText={handleChange('accountHolderName')}
                    onBlur={handleBlur('accountHolderName')}
                    value={values.accountHolderName}
                  />
                  {touched.accountHolderName && errors.accountHolderName && (
                    <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>{errors.accountHolderName}</Text>
                  )}
                </View>
                <View style={[tw`my-1`, styles.inputContainer]}>
                  <Text style={[tw`text-gray-900 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Account number</Text>
                  <TextInput
                    style={[tw`w-full h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                    placeholder="12345678"
                    onChangeText={handleChange('accountNumber')}
                    onBlur={handleBlur('accountNumber')}
                    value={values.accountNumber}
                    keyboardType="numeric"
                  />
                  {touched.accountNumber && errors.accountNumber && (
                    <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>{errors.accountNumber}</Text>
                  )}
                </View>
                <View style={[tw`my-1`, styles.inputContainer]}>
                  <Text style={[tw`text-gray-900 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Sortcode</Text>
                  <TextInput
                    style={[tw`w-full h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                    placeholder="12-34-56"
                    onChangeText={handleChange('sortCode')}
                    onBlur={handleBlur('sortCode')}
                    value={values.sortCode}
                    keyboardType="numeric"
                  />
                  {touched.sortCode && errors.sortCode && (
                    <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>{errors.sortCode}</Text>
                  )}
                </View>
                {touched.accountHolderName && touched.accountNumber && touched.sortCode && !errors.accountHolderName && !errors.accountNumber && !errors.sortCode && (
                  <>
                    <DocumentUpload
                      onDocumentSelect={(document: ImagePicker.ImagePickerSuccessResult | DocumentPicker.DocumentPickerResult) => setSelectedDocument(document as any)}
                      maxFileSizeMB={15}
                      buttonText="Upload or Take Photo"
                    />
                    {scrollViewRef.current?.scrollToEnd({ animated: true })}
                  </>
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
      </SafeAreaView>
    </ScrollView>
  );
}

export default BankingDetails;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    paddingHorizontal: getResponsiveSize(10, 20, 30),
    marginTop: getResponsiveSize(60, 90, 120),
  },
  documentList: {
    marginTop: getResponsiveSize(10, 20, 30),
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
