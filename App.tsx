import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AddressProof from './src/screens/AddressProof';
import BankingDetails from './src/screens/BankingDetails';
import ContactVerify from './src/screens/ContactVerify';
import CriminalRecordProof from './src/screens/CriminalRecordProof';
import DriverDetails from './src/screens/DriverDetails';
import DrivingLicenceProof from './src/screens/DrivingLicenceProof';
import EmailVerify from './src/screens/EmailVerify';
import EmailVerifyConfirmation from './src/screens/EmailVerifyConfirmation';
import HomeScreen from './src/screens/HomeScreen';
import OTPSuccess from './src/screens/OTPSuccess';
import Register from './src/screens/Register';
import RiderAddress from './src/screens/RiderAddress';
import RiderAgreement from './src/screens/RiderAgreement';
import RightToWork from './src/screens/RightToWork';
import SignIn from './src/screens/SignIn';
import YourVehicleInfo from './src/screens/YourVehicleInfo';
import Home from './src/screens/home';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { dispatchInstance, initializeInstances } from './src/config/api';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { authToken, loading } = useAuth();
  if (loading) {
    return null; // Or a loading spinner
  }
  return (
    <Stack.Navigator>
      {authToken ? (
        <>
          <Stack.Screen name="HomeView" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="DriverDetails" component={DriverDetails} options={{ headerShown: false }} />
          <Stack.Screen name="Contact" component={ContactVerify} options={{ headerShown: false }} />
          <Stack.Screen name="ContactSuccess" component={OTPSuccess} options={{ headerShown: false }} />
          <Stack.Screen name='RiderAddress' component={RiderAddress} options={{ headerShown: false }} />
          <Stack.Screen name="AddressProof" component={AddressProof} options={{ headerShown: false }} />
          <Stack.Screen name="BankingDetails" component={BankingDetails} options={{ headerShown: false }} />
          <Stack.Screen name="CriminalRecordProof" component={CriminalRecordProof} options={{ headerShown: false }} />
          <Stack.Screen name="DrivingLicenceProof" component={DrivingLicenceProof} options={{ headerShown: false }} />
          <Stack.Screen name="RiderAgreement" component={RiderAgreement} options={{ headerShown: false }} />
          <Stack.Screen name="RightToWork" component={RightToWork} options={{ headerShown: false }} />
          <Stack.Screen name="YourVehicleInfo" component={YourVehicleInfo} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
          <Stack.Screen name="Email" component={EmailVerify} options={{ headerShown: false }} />
          <Stack.Screen name="EmailSuccess" component={EmailVerifyConfirmation} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeInstances();
      setInitialized(true);
    };

    init();
  }, []);

  if (!initialized) {
    return null; // Or a loading spinner
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
