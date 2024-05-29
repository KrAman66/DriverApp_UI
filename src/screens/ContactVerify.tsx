import React from "react";
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

const EmailVerify: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View
        style={[
          tw`m-10 flex-1 justify-center`,
          { width: "90%", marginLeft: "auto", marginRight: "auto" },
        ]}
      >
        <Text style={tw`font-bold text-3xl text-left mb-4`}>
          OTP Verification
        </Text>
        <Text style={tw`text-gray-600 text-xl mb-12 ml-2 `}>
          Enter the verification code, we've just sent to +44 123 456 789
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
            hideStick={false} // fixed the prop value here
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ContactSuccess" as never)}
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
