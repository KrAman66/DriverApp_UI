import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// import MapboxGL from '@react-native-mapbox-gl/maps';

const { width, height } = Dimensions.get("window");
// MapboxGL.setAccessToken('');

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function WalletScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Wallet!</Text>
    </View>
  );
}

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
        component={WalletScreen}
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
  },
  map: {
    flex: 1,
  },
});

export default Home;
