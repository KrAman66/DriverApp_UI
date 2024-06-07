import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Wallet from "../components/WalletScreen";
import HomeScreen from "./driverHomeScreen";

const { width, height } = Dimensions.get("window");
// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function WalletScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Wallet!</Text>
//     </View>
//   );
// }

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
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.label, { color: focused ? "black" : "grey" }]}>
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: "black", // Color de los íconos activos
        tabBarInactiveTintColor: "grey", // Color de los íconos inactivos
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon(props) {
            const { color, size } = props;
            return <Ionicons name="home-sharp" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon(props) {
            const { color, size } = props;
            return <Ionicons name="wallet-sharp" color={color} size={size} />;
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
            return <Ionicons name="settings-sharp" color={color} size={size} />;
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
