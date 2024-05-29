import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import tw from "twrnc";
import HeroIcon from "../../assets/SVGs/Hero";

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

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[tw`bg-white`, styles.safeArea]}>
      <View
        style={[
          tw`flex-1 justify-center items-center`,
          styles.container,
          {
            backgroundColor: "#0000000D",
            borderBottomLeftRadius: width * 0.5,
            borderBottomRightRadius: width * 0.5,
            overflow: "hidden",
          },
        ]}
      >
        <View style={[
          styles.heroIconContainer,
          {
            width: getResponsiveSize(width * 0.75, width * 0.53, width * 0.55),
            height: getResponsiveSize(height * 0.4, height * 0.33, height * 0.29),
          },
        ]}>
          <HeroIcon />
        </View>
      </View>
      <View style={[tw`flex-1 justify-center`, styles.textContainer]}>
        <Text style={[
          tw`font-bold mb-2`,
          styles.leftAlignedText,
          { fontSize: getResponsiveSize(18, 24, 30) },
        ]}>
          GRAUN
        </Text>
        <Text style={[
          styles.leftAlignedText,
          { fontSize: getResponsiveSize(24, 30, 36) },
        ]}>
          Welcome to your
        </Text>
        <Text style={[
          tw`font-bold mb-10`,
          styles.leftAlignedText,
          { fontSize: getResponsiveSize(30, 36, 42) },
        ]}>
          Driver App
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register" as never)}
          style={[
            tw`bg-black p-4 rounded-3xl items-center justify-center`,
            styles.button,
          ]}
        >
          <Text style={[
            tw`text-white text-center`,
            { fontSize: getResponsiveSize(14, 16, 18) },
          ]}>
            Create a new account
          </Text>
        </TouchableOpacity>

        <View style={tw`mt-2 flex justify-center items-center`}>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn" as never)}>
            <Text style={[
              tw`flex-row mt-2 text-gray-600 text-center`,
              { fontSize: getResponsiveSize(14, 16, 18) },
            ]}>
              I already have an account?{" "}
              <Text style={tw`font-bold underline`}>Sign in</Text>
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-row items-center mt-2`}>
            <View style={tw`flex-1 border-b border-gray-400`}></View>
            <Text style={[
              tw`mx-2 text-gray-600`,
              { fontSize: getResponsiveSize(14, 16, 18) },
            ]}>
              or SignIn with
            </Text>
            <View style={tw`flex-1 border-b border-gray-400`}></View>
          </View>
          <View style={[
            tw`flex-row justify-center mt-4`,
            { display: "flex", justifyContent: "space-between", width: '100%' },
          ]}>
            <TouchableOpacity
              style={[
                tw`bg-white p-2 border-2 border-gray-200 rounded-2xl items-center justify-center`,
                styles.socialButton,
              ]}
              // onPress={googleHandler}
            >
              <Image
                source={require("../../assets/google (1).png")}
                style={tw`w-8 h-8`}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tw`bg-white p-2 border-2 border-gray-200 rounded-2xl items-center justify-center`,
                styles.socialButton,
              ]}
            >
              <Image
                source={require("../../assets/facebook (1).png")}
                style={tw`w-8 h-8`}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    width: '100%',
    padding: width * 0.0001,
  },
  heroIconContainer: {
    marginTop: height * 0.032, // 5% of screen height from top
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: width * 0.1, // 10% of screen width padding
  },
  leftAlignedText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: width * 0.05, // 5% of screen width margin
  },
  button: {
    width: '100%', // 100% of screen width
    height: height * 0.081, // 8% of screen height
    marginTop: height * 0.01, // 1% of screen height margin from top
  },
  socialButton: {
    width: '45%', // 45% of the container's width
    height: height * 0.06, // 6% of screen height
    marginHorizontal: width * 0.025, // 2.5% of screen width margin
  },
});
