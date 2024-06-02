import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import SwipeButton from "rn-swipe-button";
import { ProgressBar } from "react-native-paper";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const token =
  "sk.eyJ1IjoiZ3JhdW5vbm1hcGJveCIsImEiOiJjbHV5MjIxY3gwcnZ1MmlyenQzcTF5OXk3In0.pevQyWChIlrnswEtSUiHyw";

const { width, height } = Dimensions.get("window");

function HomeScreen() {
    const y = useSharedValue(0);
    const max = height * 0.5;
    const min = height * 0.3;
  
    const animatedContainerStyle = useAnimatedStyle(() => ({
      // transform: [{ translateY: y.value }],
      transform: [
        {
          translateY: withTiming(y.value, {
            duration: 50,
          }),
        },
      ],
    }));
  
    const unclockGestureHandler = useAnimatedGestureHandler({
      onStart: (event, context) => {
        console.log("Start");
      },
      onActive: (event, context) => {
        y.value = event.translationY;
      },
      onEnd: (event, context) => {
        console.log("End");
      },
    });
    type Region = {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
    const [currentLocation, setCurrentLocation] =
      useState<Location.LocationObjectCoords | null>(null);
    const [initialRegion, setInitialRegion] = useState<Region | null>(null);
    const [online, setOnline] = useState(false);
  
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
  
    const [isSwiped, setIsSwiped] = useState(false);
  
    const handleSwipeSuccess = () => {
      setIsSwiped(true);
    };
  
    return (
      <View style={{ flex: 1, position: "absolute" }}>
        <Text style={styles.title}>£5.02</Text>
        {isSwiped && (
          <PanGestureHandler onGestureEvent={unclockGestureHandler}>
            <Animated.View style={[styles.animatedView, animatedContainerStyle]}>
              <Text style={styles.title3}>Finding Order for you</Text>
              <ProgressBar
                style={styles.progressBar}
                progress={0.5}
                color="black"
                indeterminate={true}
              />
              <View style={{position: 'relative', left: width / 3 - 60, marginTop: 20}}>
              <SwipeButton
                swipeSuccessThreshold={70}
                height={height * 0.07}
                width={width * 0.6}
                title="Offline"
                onSwipeSuccess={handleSwipeSuccess}
                railFillBackgroundColor="#5B5B5B"
                railFillBorderColor="#5B5B5B"
                thumbIconBackgroundColor="white"
                thumbIconBorderColor="white"
                shouldResetAfterSuccess={true}
                resetAfterSuccessAnimDelay={1000}
                railBackgroundColor="#5B5B5B"
                railBorderColor="#5B5B5B"
                titleColor="white"
                titleStyles={{ position: "absolute", left: width * 0.38, fontSize: 18 }}
              />
              </View>
              
            </Animated.View>
          </PanGestureHandler>
        )}
  
        {!isSwiped && (
          <>
            <View style={styles.swipe}>
              <SwipeButton
                swipeSuccessThreshold={70}
                height={height * 0.07}
                width={width * 0.6}
                title="Online"
                onSwipeSuccess={handleSwipeSuccess}
                railFillBackgroundColor="#5B5B5B"
                railFillBorderColor="#5B5B5B"
                thumbIconBackgroundColor="white"
                thumbIconBorderColor="white"
                shouldResetAfterSuccess={true}
                resetAfterSuccessAnimDelay={1000}
                railBackgroundColor="#5B5B5B"
                railBorderColor="#5B5B5B"
                titleColor="white"
                titleStyles={{ position: "absolute", left: width * 0.4, fontSize: 18 }}
              />
            </View>
          </>
        )}
        {initialRegion && (
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
            mapType="terrain"
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

  export default HomeScreen;


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
    title: {
      fontSize: width * 0.04,
      textAlign: "center",
      marginTop: 40,
      color: "white",
      backgroundColor: "#000000C7",
      padding: 10,
      width: 100,
      borderRadius: 30,
      position: "absolute",
      zIndex: 1,
      top: width * 0.03,
      left: width / 2 - 50,
      opacity: 1.2,
    },
    swipe: {
      // height: height * 0.07,
      // width: width * 0.6,
      borderRadius: 30,
      position: "absolute",
      left: width / 2 - width * 0.3,
      zIndex: 1,
      top: width * 1.72,
    },
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    up: {
      position: "absolute",
      zIndex: 1,
      width: width,
      top: height * 0.33,
    },
    slideUp: {
      backgroundColor: "#F5F5F5",
      width: width * 1,
      height: height * 0.3,
      top: height * 0.53,
      zIndex: 1,
    },
    order: {
      fontSize: width * 0.04,
      textAlign: "center",
      zIndex: 2,
      color: "black",
      position: "absolute",
      top: height * 0.53 + 25,
      left: width / 1.9 - 100,
      fontWeight: "bold",
    },
    progressBar: {
      position: "absolute",
      width: width, // Un poco menos que el ancho completo para agregar padding
      top: height * -0.043,
    },
    container2: {
      flex: 1,
      backgroundColor: "black",
    },
    title2: {
      color: "white",
      textAlign: "center",
      marginTop: 20,
      fontSize: 24,
    },
    animatedView: {
      position: "absolute",
      backgroundColor: "#F5F5F5",
      width: "100%",
      height: 300,
      top: width * 1.82,
      left: 0,
      zIndex: 1,
    },
    title3: {
      color: "black",
      textAlign: "center",
      marginTop: 15,
      fontSize: 18,
      fontWeight: "bold",
    },
  });