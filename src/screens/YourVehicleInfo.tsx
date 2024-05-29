import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, GestureResponderEvent, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import tw from 'twrnc';
import * as Yup from 'yup';
import DocumentUpload from '../components/DocumentUpload';

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

const YourVehicleInfo: React.FC = () => {
  const navigation = useNavigation();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraStatus !== "granted" || mediaLibraryStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "You need to grant camera and media library permissions to use this feature."
        );
      }
    })();
  }, []);

  const validationSchema = Yup.object().shape({
    registrationNumber: Yup.string().required("Registration number is required"),
    insuranceNumber: Yup.string().required("Insurance number is required"),
  });

  const handleSaveAndContinue = (values: any) => {
    console.log("Form Values:", values);
    console.log("Selected Document:", selectedDocument);
    navigation.navigate("DriverDetails" as never);
    // Add your save and continue logic here
  };

  return (
    <ScrollView ref={scrollViewRef} style={tw`bg-white h-full`}>
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={[tw`m-6`, styles.container]}>
          <Text style={[tw`font-bold`, { fontSize: getResponsiveSize(24, 28, 32) }]}>Your vehicle information</Text>
          <Formik
            initialValues={{ registrationNumber: "", insuranceNumber: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSaveAndContinue}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <Text style={[tw`mt-6`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
                  Please enter vehicle registration number, Insurance number and
                  upload or take a photo of both documents.
                </Text>
                <Text style={[tw`mt-4`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
                  Make sure the file size is not larger than 15MB and the photo
                  is clear with all details visible.
                </Text>
                <View style={[tw`my-4 mt-10`, styles.inputContainer]}>
                  <Text style={[tw`text-gray-900 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Registration number</Text>
                  <TextInput
                    style={[tw`w-11/12 h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                    placeholder="Registration number"
                    value={values.registrationNumber}
                    onChangeText={handleChange("registrationNumber")}
                    onBlur={handleBlur("registrationNumber")}
                  />
                  {touched.registrationNumber && errors.registrationNumber && (
                    <Text style={[tw`text-red-500 mt-2 ml-2`, { fontSize: getResponsiveSize(12, 14, 16) }]}>
                      {errors.registrationNumber}
                    </Text>
                  )}
                </View>
                <View style={tw`my-4`}>
                  <Text style={[tw`text-gray-900 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Insurance number</Text>
                  <TextInput
                    style={[tw`w-11/12 h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                    placeholder="Insurance number"
                    value={values.insuranceNumber}
                    onChangeText={handleChange("insuranceNumber")}
                    onBlur={handleBlur("insuranceNumber")}
                  />
                  {touched.insuranceNumber && errors.insuranceNumber && (
                    <Text style={[tw`text-red-500 mt-2 ml-2`, { fontSize: getResponsiveSize(12, 14, 16) }]}>
                      {errors.insuranceNumber}
                    </Text>
                  )}
                </View>
                {values.registrationNumber.trim() !== "" &&
                  values.insuranceNumber.trim() !== "" && (
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
                      tw`bg-black mt-2 mb-10 p-4 rounded-3xl flex-row items-center justify-center`,
                      styles.saveButton,
                    ]}
                  >
                    <Text style={[tw`text-white text-lg`, { fontSize: getResponsiveSize(16, 18, 20) }]}>SAVE AND CONTINUE</Text>
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

export default YourVehicleInfo;

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

