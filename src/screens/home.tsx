import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MapView, {Marker} from 'react-native-maps';
import * as Location from "expo-location";


const token =
  "sk.eyJ1IjoiZ3JhdW5vbm1hcGJveCIsImEiOiJjbHV5MjIxY3gwcnZ1MmlyenQzcTF5OXk3In0.pevQyWChIlrnswEtSUiHyw";

const { width, height } = Dimensions.get("window");

function HomeScreen() {
  type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);

        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {/* You can add additional map elements like markers here */}
          {/* <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title="Your Location"
          /> */}
        </MapView>
      )}
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
    marginBottom: 5,
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default Home;
