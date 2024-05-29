import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Formik } from 'formik';
import React, { useState, useRef } from "react";
import { GestureResponderEvent, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import tw from "twrnc";
import * as Yup from 'yup';
import DocumentUpload from '../components/DocumentUpload'; // Adjust the import path as necessary

const { width } = Dimensions.get('window');

const getResponsiveSize = (sm: number, md: number, lg: number) => {
  if (width < 350) {
    return sm;
  } else if (width >= 350 && width < 600) {
    return md;
  } else {
    return lg;
  }
};

const DrivingLicenceProof: React.FC = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const validationSchema = Yup.object().shape({
    drivingLicenseHolderName: Yup.string().required("Driving license holder name is required"),
    drivingLicenseNumber: Yup.string().min(16, "Invalid license number").required("Driving license number is required"),
  });

  const handleSubmit = (values: any) => {
    console.log("Form Data:", { ...values, expiryDate, selectedDocument });
    console.log('Document Asset:', selectedDocument);

    if (selectedDocument) {
      navigation.navigate("DriverDetails" as never);
    } else {
      alert("Please upload a document or take a photo");
    }
  };

  return (
    <ScrollView style={tw`bg-white h-full`} ref={scrollViewRef}>
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={[tw`m-6`, styles.container]}>
          <Text style={[tw`font-bold`, { fontSize: getResponsiveSize(24, 28, 32) }]}>Proof of your driving licence</Text>
          <Formik
            initialValues={{
              drivingLicenseHolderName: '',
              drivingLicenseNumber: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <Text style={[tw`mt-6`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
                  Please upload or take a photo of your licence document
                </Text>
                <Text style={[tw`mt-4`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
                  Make sure the file size is not larger than 15MB and the photo is
                  clear with all details visible.
                </Text>
                <View style={[tw`my-4 mt-10`, styles.inputContainer]}>
                  <Text style={[tw`text-gray-900 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Driving license holder name</Text>
                  <TextInput
                    style={[tw`w-full h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                    placeholder="Eg. John Doe"
                    onChangeText={handleChange('drivingLicenseHolderName')}
                    onBlur={handleBlur('drivingLicenseHolderName')}
                    value={values.drivingLicenseHolderName}
                  />
                  {touched.drivingLicenseHolderName && errors.drivingLicenseHolderName && (
                    <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>{errors.drivingLicenseHolderName}</Text>
                  )}
                </View>
                <View style={[tw`my-4`, styles.inputContainer]}>
                  <Text style={[tw`text-gray-900 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Driving license number</Text>
                  <TextInput
                    style={[tw`w-full h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                    placeholder="123ABC456"
                    onChangeText={handleChange('drivingLicenseNumber')}
                    onBlur={handleBlur('drivingLicenseNumber')}
                    value={values.drivingLicenseNumber}
                  />
                  {touched.drivingLicenseNumber && errors.drivingLicenseNumber && (
                    <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>{errors.drivingLicenseNumber}</Text>
                  )}
                </View>
                <View style={[tw`my-4`, styles.inputContainer]}>
                  <Text style={[tw`text-gray-900 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Expiry date</Text>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={tw`w-full h-16 p-4 border-2 border-gray-200 rounded-xl mb-4 flex-row justify-between items-center`}
                  >
                    <Text style={tw`text-gray-600`}>
                      {expiryDate ? formatDate(expiryDate) : "Select Expiry Date"}
                    </Text>
                    <Image
                      source={require("../../assets/down-arrow.png")}
                      style={tw`w-4 h-4`}
                    />
                  </TouchableOpacity>
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={expiryDate || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      setExpiryDate(selectedDate as any);
                    }}
                  />
                )}
                {touched.drivingLicenseHolderName && touched.drivingLicenseNumber && expiryDate && !errors.drivingLicenseHolderName && !errors.drivingLicenseNumber && (
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
};

export default DrivingLicenceProof;

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

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
};

