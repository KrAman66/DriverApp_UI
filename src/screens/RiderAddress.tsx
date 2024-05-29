import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import * as yup from "yup";

const { width, height } = Dimensions.get("window");

const getResponsiveSize = (sm: number, md: number, lg: number) => {
  if (width < 350) {
    return sm;
  } else if (width >= 350 && width < 600) {
    return md;
  } else {
    return lg;
  }
};

const RiderAddress: React.FC = () => {
  const navigation = useNavigation();

  // Define validation schema
  const validationSchema = yup.object().shape({
    houseNumber: yup.string().required("This field is mandatory"),
    streetName: yup.string().required("This field is mandatory"),
    city: yup.string().required("This field is mandatory"),
    postcode: yup
      .string()
      .matches(/^[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}$/, "Invalid UK postcode format")
      .required("This field is mandatory"),
  });

  return (
    <SafeAreaView style={[tw`bg-white h-full`, styles.container]}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={[tw`pt-20 mt-2`, styles.titleContainer]}>
            <Text style={[tw`font-bold`, { fontSize: getResponsiveSize(24, 28, 32) }]}>
              Your home address
            </Text>
            <View style={[tw`m-5`, styles.formContainer]}>
              <Formik
                initialValues={{
                  houseNumber: "",
                  streetName: "",
                  city: "",
                  postcode: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log('Form Data:', values);
                  navigation.navigate("AddressProof" as never);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View>
                    <View style={tw`mb-4`}>
                      <Text style={[tw`text-gray-900 ml-1 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>
                        Search address
                      </Text>
                      <TextInput
                        style={[tw`h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                        placeholder="Search address"
                        onChangeText={handleChange("searchAddress")}
                      />
                    </View>
                    <View style={tw`mb-4`}>
                      <Text style={[tw`text-gray-900 ml-1 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>
                        House number or name
                      </Text>
                      <TextInput
                        style={[tw`h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                        placeholder="House number or name"
                        onChangeText={handleChange("houseNumber")}
                        onBlur={handleBlur("houseNumber")}
                        value={values.houseNumber}
                      />
                      {touched.houseNumber && errors.houseNumber && (
                        <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>
                          {errors.houseNumber}
                        </Text>
                      )}
                    </View>
                    <View style={tw`mb-4`}>
                      <Text style={[tw`text-gray-900 ml-1 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>
                        Street name
                      </Text>
                      <TextInput
                        style={[tw`h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                        placeholder="Street name"
                        onChangeText={handleChange("streetName")}
                        onBlur={handleBlur("streetName")}
                        value={values.streetName}
                      />
                      {touched.streetName && errors.streetName && (
                        <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>
                          {errors.streetName}
                        </Text>
                      )}
                    </View>
                    <View style={tw`mb-4`}>
                      <Text style={[tw`text-gray-900 ml-1 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>
                        Town or city
                      </Text>
                      <TextInput
                        style={[tw`h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                        placeholder="Town or city"
                        onChangeText={handleChange("city")}
                        onBlur={handleBlur("city")}
                        value={values.city}
                      />
                      {touched.city && errors.city && (
                        <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>
                          {errors.city}
                        </Text>
                      )}
                    </View>
                    <View style={tw`mb-4`}>
                      <Text style={[tw`text-gray-900 ml-1 mb-1`, { fontSize: getResponsiveSize(14, 16, 18) }]}>
                        Postcode
                      </Text>
                      <TextInput
                        style={[tw`h-16 p-4 border-2 border-gray-200 rounded-xl`, styles.input]}
                        placeholder="Postcode"
                        onChangeText={handleChange("postcode")}
                        onBlur={handleBlur("postcode")}
                        value={values.postcode}
                      />
                      {touched.postcode && errors.postcode && (
                        <Text style={[tw`text-red-500`, { fontSize: getResponsiveSize(12, 14, 16) }]}>
                          {errors.postcode}
                        </Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={(event) => handleSubmit(event as any)}
                      style={[tw`bg-black h-16 p-4 rounded-3xl items-center justify-center`, styles.submitButton]}
                    >
                      <Text style={[tw`text-white`, { fontSize: getResponsiveSize(16, 18, 20) }]}>
                        Save and Continue
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RiderAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: getResponsiveSize(5, 25, 25), // Applied responsive padding
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: getResponsiveSize(10, 20, 30),
  },
  titleContainer: {
    justifyContent: 'center',
  },
  formContainer: {
    marginLeft: getResponsiveSize(width * 0.02, width * 0.05, width * 0.08), // Adjusted marginLeft using responsive width
    marginTop: getResponsiveSize(height * 0.03, height * 0.05, height * 0.08), // Adjusted marginTop using responsive height
    width: '90%',
  },
  input: {
    width: '100%',
  },
  submitButton: {
    marginTop: getResponsiveSize(height * 0.001, height * 0.01, height * 0.15), // Adjusted marginTop using responsive height
    width: '100%',
  },
});
