import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const EmailVerifyConfirmation: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={[tw`flex-1 justify-center items-center`, styles.container]}>
        <Image source={require('../../assets/check.png')} style={tw`w-20 h-20 mb-10`} />
        <Text style={tw`text-3xl text-center`}>Your OTP Verification was successful</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn" as never)}
          style={[
            tw`bg-black w-11/12 h-16 p-4 rounded-3xl items-center mt-20`,
            { marginLeft: "auto", marginRight: "auto" },
          ]}
        >
          <Text style={tw`text-white text-lg`}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default EmailVerifyConfirmation;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10, // Adjust as needed
  },
});
