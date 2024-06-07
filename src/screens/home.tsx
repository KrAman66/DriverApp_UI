import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import Wallet from "../components/WalletScreen";
import HomeScreen from "./driverHomeScreen";
import HomeSvg from "../../assets/SVGs/home";
import WalletSvg from "../../assets/SVGs/wallet";
import SettingsSvg from "../../assets/SVGs/settings";

const { width, height } = Dimensions.get("window");

function SupportScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Support!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Home: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          height: height * 0.1,
          backgroundColor: "white",
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={[styles.label, { color }]}>
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon(props) {
            const { color, size } = props;
            return <HomeSvg color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon(props) {
            const { color, size } = props;
            return <WalletSvg color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          tabBarIcon(props) {
            const { color, size } = props;
            return <Ionicons name="chatbox" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon(props) {
            const { color, size } = props;
            return <SettingsSvg color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: width * 0.03,
    textAlign: "center",
    marginBottom: 5,
  },
});

export default Home;
