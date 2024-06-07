import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { OtpInput } from "react-native-otp-entry";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

import axios from "axios";
import { DRIVER_API_HOST } from "../../env";
import { DRIVER_VERIFY_EMAIL } from "../../endpoint";

const EmailVerify: React.FC = () => {
  const navigation = useNavigation();

  const route: any = useRoute();
  const { email } = route.params;

  const [otp, setOtp] = useState('');

  const handleEmailVerification = async () => {
    try {
      const submitData = {
        email,
        otp
      }
      const response = await axios.post(`${DRIVER_API_HOST}${DRIVER_VERIFY_EMAIL}`, submitData);
      
      if (response.status === 200 || response.status === 201) {
        console.log('Signup Successful:', response.data);
        navigation.navigate("EmailSuccess" as never);
        
      } else {
        console.log('Signup Failed:', response.data);
        alert('Invalid OTP! Try Again!');
      }
    } catch (error: any) {
      console.error('Signup Error:', error.message);
      alert('Invalid OTP! Try Again!');
    }
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View
        style={[
          tw`m-10 flex-1 justify-center`,
          { width: "90%", marginLeft: "auto", marginRight: "auto" },
        ]}
      >
        <Text style={tw`font-bold text-3xl text-left mb-4`}>
          Verify Email address
        </Text>
        <Text style={tw`text-gray-600 text-lg mb-12 ml-2 `}>
          Enter the verification code, we've just sent to example@domail.com
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <OtpInput
            numberOfDigits={4}
            focusColor="green"
            focusStickBlinkingDuration={500}
            hideStick={false}
            onFilled={(text) => { setOtp(text) }}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleEmailVerification()}
          // onPress={() => navigation.navigate("EmailSuccess" as never)}
          style={[
            tw`bg-black w-11/12 h-16 p-4 rounded-3xl items-center mt-20`,
            { marginLeft: "auto", marginRight: "auto" },
          ]}
        >
          <Text style={tw`text-white text-lg`}>Verify</Text>
        </TouchableOpacity>
        <Text
          style={{ display: "flex", justifyContent: "flex-start", padding: 20 }}
        >
          <Text style={tw`font-bold`}>Resend code</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerify;

const styles = StyleSheet.create({});
