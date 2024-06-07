import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { RouteProp } from '@react-navigation/native';
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import * as yup from "yup";
import axios from 'axios';
import { DRIVER_API_HOST } from "../../env";
import { DRIVER_SIGNUP } from "../../endpoint";

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

const Register: React.FC = () => {
  const navigation = useNavigation();

  const [countryCode, setCountryCode] = useState<string>("+44");
  const [gender, setGender] = useState<string>("");
  const [genderModalVisible, setGenderModalVisible] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleDateChange = (event: NativeSyntheticEvent<any>, selectedDate?: Date) => {
    if (selectedDate !== undefined) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const genders: string[] = ["Male", "Female", "Others"];

  const handleGenderSelection = (selectedGender: string) => {
    setGender(selectedGender);
    setGenderModalVisible(false);
  };

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .trim()
      .min(3, "Invalid first name!")
      .required("This Field is Mandatory"),
    lastName: yup
      .string()
      .trim()
      .min(3, "Invalid last name!")
      .required("This Field is Mandatory"),
    email: yup.string().email("Invalid email").required("This Field is Mandatory"),
    contact: yup
      .string()
      .matches(/^\d{10}$/, "Invalid contact number format!")
      .required("This Field is Mandatory"),
    gender: yup.string().required("This Field is Mandatory"),
    date: yup.date().required("This Field is Mandatory"),
    password: yup
      .string()
      .required("This Field is Mandatory")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match!")
      .required("This Field is Mandatory"),
  });

  return (
    <SafeAreaView style={[tw`bg-white flex-1`, styles.safeArea]}>
      <KeyboardAvoidingView
        style={tw`flex-1`}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={tw`flex-grow`}>
          <View style={[tw`pt-10 px-5`, styles.container]}>
            <Text style={[tw`font-bold mb-6`, styles.headerText]}>
              Create an account
            </Text>
            <View style={tw`mx-auto w-full max-w-lg`}>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  contact: '',
                  password: '',
                  confirmPassword: '',
                  gender: '',
                  date: null,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  const { confirmPassword, ...formData } = values; // Exclude confirmPassword
                  formData.gender = gender; // Include gender
                  formData.date = date as any; // Include date
                  formData.contact = countryCode + formData.contact;
                
                  console.log('Form Data:', formData); // Log the modified form data
                
                  const submitData = {
                    email: formData.email,
                    password: formData.password,
                    user_name: formData.firstName,
                    last_name: formData.lastName,
                    gender: formData.gender,
                    contact_no: formData.contact,
                    dateOfBirth: formData.date
                  }
                
                  try {
                    const response = await axios.post(`${DRIVER_API_HOST}${DRIVER_SIGNUP}`, submitData);
                    
                    if (response.status === 200 || response.status === 201) {
                      console.log('Signup Successful:', response.data);

                      navigation.navigate("Email" as never, { email: formData.email } as never);
                      resetForm();
                    } else {
                      console.log('Signup Failed:', response.data);
                      alert('Signup failed. Please try again.');
                    }
                  } catch (error: any) {
                    console.error('Signup Error:', error.message);
                    alert('An error occurred during signup. Please try again later.');
                  }
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <>
                    <View style={tw`flex-row justify-between items-center w-full mb-4`}>
                      <View style={tw`w-[48%]`}>
                        {errors.firstName && touched.firstName && (
                          <Text style={tw`text-red-500 text-xs mb-1`}>{errors.firstName}</Text>
                        )}
                        <TextInput
                          style={[
                            tw`h-12 p-3 border-2 rounded-xl`,
                            errors.firstName && touched.firstName ? tw`border-red-300` : tw`border-gray-200`,
                          ]}
                          placeholder="First Name"
                          onChangeText={handleChange("firstName")}
                          onBlur={handleBlur("firstName")}
                          value={values.firstName}
                        />
                      </View>
                      <View style={tw`w-[48%]`}>
                        {errors.lastName && touched.lastName && (
                          <Text style={tw`text-red-500 text-xs mb-1`}>{errors.lastName}</Text>
                        )}
                        <TextInput
                          style={[
                            tw`h-12 p-3 border-2 rounded-xl`,
                            errors.lastName && touched.lastName ? tw`border-red-300` : tw`border-gray-200`,
                          ]}
                          placeholder="Last Name"
                          onChangeText={handleChange("lastName")}
                          onBlur={handleBlur("lastName")}
                          value={values.lastName}
                        />
                      </View>
                    </View>

                    {errors.email && touched.email && (
                      <Text style={tw`text-red-500 text-xs mb-1`}>{errors.email}</Text>
                    )}
                    <TextInput
                      style={[
                        tw`w-full h-12 p-3 border-2 rounded-xl mb-4`,
                        errors.email && touched.email ? tw`border-red-300` : tw`border-gray-200`,
                      ]}
                      placeholder="Email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.contact && touched.contact && (
                      <Text style={tw`text-red-500 text-xs mb-1`}>{errors.contact}</Text>
                    )}
                    <View style={tw`flex-row justify-start mb-4`}>
                      <TextInput
                        style={[
                          tw`w-2/12 h-12 p-3 border-2 justify-end`,
                          { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
                          tw`border-gray-200`,
                        ]}
                        placeholder="Code"
                        value={countryCode}
                        editable={false}
                      />
                      <TextInput
                        style={[
                          tw`w-10/12 h-12 p-3 border-2`,
                          { marginLeft: -1, borderTopRightRadius: 10, borderBottomRightRadius: 10 },
                          errors.contact && touched.contact ? tw`border-red-300` : tw`border-gray-200`,
                        ]}
                        placeholder="Contact No."
                        onChangeText={handleChange("contact")}
                        onBlur={handleBlur("contact")}
                        value={values.contact}
                      />
                    </View>
                    {errors.date && touched.date && (
                      <Text style={tw`text-red-500 text-xs mb-1`}>{errors.date}</Text>
                    )}
                    <TouchableOpacity
                      onPress={() => setShowPicker(true)}
                      style={[
                        tw`w-full h-12 p-3 border-2 rounded-xl mb-4 flex-row justify-between items-center`,
                        errors.date && touched.date ? tw`border-red-300` : tw`border-gray-200`,
                      ]}
                    >
                      <Text style={tw`text-gray-600`}>
                        {values.date ? formatDate(values.date) : "Select Date of Birth"}
                      </Text>
                      <Image
                        source={require("../../assets/down-arrow.png")}
                        style={tw`w-4 h-4`}
                      />
                    </TouchableOpacity>
                    {showPicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date || new Date()}
                        mode="date"
                        display="spinner"
                        textColor="#000"
                        onChange={(event, selectedDate) => {
                          handleDateChange(event as any, selectedDate);
                          setFieldValue("date", selectedDate);
                        }}
                      />
                    )}
                    {errors.gender && touched.gender && (
                      <Text style={tw`text-red-500 text-xs mb-1`}>{errors.gender}</Text>
                    )}
                    <TouchableOpacity
                      onPress={() => setGenderModalVisible(true)}
                      style={[
                        tw`w-full h-12 p-3 border-2 rounded-xl mb-4 flex-row justify-between items-center`,
                        errors.gender && touched.gender ? tw`border-red-300` : tw`border-gray-200`,
                      ]}
                    >
                      <Text style={tw`text-gray-600`}>
                        {values.gender ? values.gender : "Select Gender"}
                      </Text>
                      <Image
                        source={require("../../assets/down-arrow.png")}
                        style={tw`w-4 h-4`}
                      />
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={genderModalVisible}
                      onRequestClose={() => setGenderModalVisible(false)}
                    >
                      <TouchableWithoutFeedback onPress={() => setGenderModalVisible(false)}>
                        <View style={tw`flex-1 justify-center items-center bg-gray-800 h-full bg-opacity-50`}>
                          <View style={tw`bg-white p-8 w-80 rounded-3xl`}>
                            {genders.map((genderOption, index) => (
                              <Pressable key={index} onPress={() => {
                                handleGenderSelection(genderOption);
                                setFieldValue("gender", genderOption);
                              }}>
                                <Text style={tw`text-lg text-gray-800 py-2`}>{genderOption}</Text>
                                {index !== genders.length - 1 && <View style={tw`border-b border-gray-300`} />}
                              </Pressable>
                            ))}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </Modal>
                    {errors.password && touched.password && (
                      <Text style={tw`text-red-500 text-xs mb-1`}>{errors.password}</Text>
                    )}
                    <View style={tw`relative`}>
                      <TextInput
                        style={[
                          tw`w-full h-12 p-3 border-2 rounded-xl mb-4`,
                          errors.password && touched.password ? tw`border-red-300` : tw`border-gray-200`,
                        ]}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                      <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                          name={showPassword ? "eye" : "eye-slash"}
                          size={20}
                          color="gray"
                          style={tw`absolute right-4 top-3`}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text style={tw`text-red-500 text-xs mb-1`}>{errors.confirmPassword}</Text>
                    )}
                    <View style={tw`relative`}>
                      <TextInput
                        style={[
                          tw`w-full h-12 p-3 border-2 rounded-xl mb-4`,
                          errors.confirmPassword && touched.confirmPassword ? tw`border-red-300` : tw`border-gray-200`,
                        ]}
                        placeholder="Confirm Password"
                        secureTextEntry={!showConfirmPassword}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                    />
                    <TouchableWithoutFeedback onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Icon
                        name={showConfirmPassword ? "eye" : "eye-slash"}
                        size={20}
                        color="gray"
                        style={tw`absolute right-4 top-3`}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                  <TouchableOpacity
                    style={tw`bg-black w-full h-12 p-3 rounded-xl mt-5`}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text style={[tw`text-white text-center font-bold`, { fontSize: getResponsiveSize(14, 16, 18) }]}>Sign up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`mt-4`}
                    onPress={() => navigation.navigate("SignIn" as never)}
                  >
                    <Text style={tw`text-gray-600 text-center`}>
                      Already have an account?{" "}
                      <Text style={tw`font-bold`}>Sign in</Text>
                    </Text>
                  </TouchableOpacity>
                  <View style={tw`flex-row items-center mt-4`}>
                    <View style={tw`flex-1 border-b border-gray-400`}></View>
                    <Text style={tw`mx-4 text-gray-600`}>or signup with</Text>
                    <View style={tw`flex-1 border-b border-gray-400`}></View>
                  </View>
                  <View
                    style={[
                      tw`flex-row justify-between mt-4`,
                      { display: "flex", justifyContent: "space-evenly" },
                    ]}
                  >
                    <TouchableOpacity
                      style={tw`bg-white w-4/12 h-12 p-2 border-2 border-gray-200 rounded-2xl items-center justify-evenly`}
                    >
                      <Image
                        source={require("../../assets/google (1).png")}
                        style={tw`w-8 h-8`}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={tw`bg-white w-4/12 h-12 p-2 border-2 border-gray-200 rounded-2xl items-center justify-center`}
                    >
                      <Image
                        source={require("../../assets/facebook (1).png")}
                        style={tw`w-8 h-8`}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
safeArea: {
  paddingHorizontal: getResponsiveSize(10, 20, 30),
  paddingTop: getResponsiveSize(20, 30, 40), // Adjust padding top to account for the notch
},
container: {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: getResponsiveSize(10, 20, 30),
},
headerText: {
  fontSize: getResponsiveSize(24, 28, 32),
  textAlign: 'left',
  alignSelf: 'flex-start',
},

});

export default Register;


                         
