import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Dimensions, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import tw from 'twrnc';
import * as yup from 'yup';
import axios from 'axios';
import { DRIVER_API_HOST } from "../../env";
import { DRIVER_SIGNIN } from "../../endpoint";

const { width } = Dimensions.get('window');

const getResponsiveSize = (sm: any, md: any, lg: any) => {
    if (width < 350) {
        return sm;
    } else if (width >= 350 && width < 600) {
        return md;
    } else {
        return lg;
    }
};

const SignIn = () => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = yup.object().shape({
        emailOrPhone: yup.string().required("This Field is Mandatory").test(
            "emailOrPhone",
            "Invalid email or contact number format!",
            value => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const phoneRegex = /^\d{10}$/;
                return emailRegex.test(value) || phoneRegex.test(value);
            }
        ),
        password: yup.string().required("This Field is Mandatory").min(8, "Password must be at least 8 characters"),
    });

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <KeyboardAvoidingView
                style={tw`flex-1`}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={tw`flex-grow`}>
                    <View style={tw`pt-10 px-5 flex-1 justify-center`}>
                        <Text style={[tw`font-bold mb-10`, styles.headerText]}>
                            Sign into your account
                        </Text>
                        <View style={tw`mx-auto w-full max-w-lg`}>
                            <Formik
                                initialValues={{ emailOrPhone: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={async (values, { resetForm }) => {
                                    try {
                                        const response = await axios.post(`${DRIVER_API_HOST}${DRIVER_SIGNIN}`, {
                                            email: values.emailOrPhone,
                                            password: values.password
                                        });

                                        if (response.status === 200) {
                                            // console.log('Sign-in Successful:', response.data);
                                            const accessToken = response.data.token.access.token
                                            
                                            // Navigate to the DriverDetails page
                                            navigation.navigate("DriverDetails" as never);
                                            resetForm();
                                        } else {
                                            console.log('Sign-in Failed:', response.data);
                                            Alert.alert('Sign-in Failed', 'Invalid credentials, please try again.');
                                        }
                                    } catch (error: any) {
                                        console.error('Sign-in Error:', error.message);
                                        Alert.alert(error.message);
                                    }
                                }}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <>
                                        {errors.emailOrPhone && touched.emailOrPhone && (
                                            <Text style={[tw`text-red-500 mb-1`, { fontSize: getResponsiveSize(10, 12, 14) }]}>
                                                {errors.emailOrPhone}
                                            </Text>
                                        )}
                                        <TextInput
                                            style={[
                                                tw`w-full h-12 p-3 border-2 rounded-xl mb-4`,
                                                errors.emailOrPhone && touched.emailOrPhone ? tw`border-red-300` : tw`border-gray-200`,
                                            ]}
                                            placeholder="Email/Phone"
                                            onChangeText={handleChange('emailOrPhone')}
                                            onBlur={handleBlur('emailOrPhone')}
                                            value={values.emailOrPhone}
                                            placeholderTextColor="#888"
                                        />
                                        {errors.password && touched.password && (
                                            <Text style={[tw`text-red-500 mb-1`, { fontSize: getResponsiveSize(10, 12, 14) }]}>
                                                {errors.password}
                                            </Text>
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
                                                placeholderTextColor="#888"
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
                                        <View style={tw`flex-row justify-end mb-20`}>
                                            <TouchableOpacity onPress={() => console.log("Forgot Password")}>
                                                <Text style={[tw`font-bold text-gray-600`, { fontSize: getResponsiveSize(12, 14, 16) }]}>
                                                    Forgot Password
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleSubmit();
                                              }}
                                            style={tw`bg-black w-full h-12 p-3 rounded-xl`}
                                        >
                                            <Text style={[tw`text-white text-center`, { fontSize: getResponsiveSize(14, 16, 18) }]}>
                                                Sign In
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </Formik>
                            <TouchableOpacity
                                style={tw`mt-4`}
                                onPress={() => navigation.navigate("Register" as never)}
                            >
                                <Text style={[tw`text-gray-600 text-center`, { fontSize: getResponsiveSize(12, 14, 16) }]}>
                                    Don't have an account?{" "}
                                    <Text style={tw`font-bold`}>Sign up</Text>
                                </Text>
                            </TouchableOpacity>
                            <View style={tw`flex-row items-center mt-4`}>
                                <View style={tw`flex-1 border-b border-gray-400`}></View>
                                <Text style={[tw`mx-2 text-gray-600`, { fontSize: getResponsiveSize(12, 14, 16) }]}>or Sign up with</Text>
                                <View style={tw`flex-1 border-b border-gray-400`}></View>
                            </View>
                            <View style={[tw`flex-row justify-between mt-4`, { display: "flex", justifyContent: "space-evenly" }]}>
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
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: getResponsiveSize(24, 28, 32),
    },
});

export default SignIn;
