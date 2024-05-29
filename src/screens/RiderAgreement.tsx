import React, { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Card, Checkbox, Button, Text } from 'react-native-paper';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

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

const YourRiderAgreementScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  };

  const handleSaveAndContinue = () => {
    // Logic to save and continue
    navigation.navigate("DriverDetails" as never);
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <ScrollView contentContainerStyle={tw`p-6`} ref={scrollViewRef}>
        <Text style={[tw`font-bold my-10`, { fontSize: getResponsiveSize(24, 28, 32) }]}>
          Your Rider Agreement
        </Text>
        <Card style={tw`mb-6 bg-white`}>
          <Card.Content>
            <ScrollView style={tw`max-h-96 mb-4`}>
              <Text style={[tw`text-base`, { fontSize: getResponsiveSize(14, 16, 18) }]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel justo nec velit iaculis condimentum. Nam ac aliquam lacus, sit amet tincidunt est. Suspendisse potenti. Duis nec mauris id lectus consectetur hendrerit.
                {/* Add more lorem ipsum text to test scrolling */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel justo nec velit iaculis condimentum. Nam ac aliquam lacus, sit amet tincidunt est. Suspendisse potenti. Duis nec mauris id lectus consectetur hendrerit.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel justo nec velit iaculis condimentum. Nam ac aliquam lacus, sit amet tincidunt est. Suspendisse potenti. Duis nec mauris id lectus consectetur hendrerit.
                {/* Add more lorem ipsum text to test scrolling */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel justo nec velit iaculis condimentum. Nam ac aliquam lacus, sit amet tincidunt est. Suspendisse potenti. Duis nec mauris id lectus consectetur hendrerit.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel justo nec velit iaculis condimentum. Nam ac aliquam lacus, sit amet tincidunt est. Suspendisse potenti. Duis nec mauris id lectus consectetur hendrerit.
                {/* Add more lorem ipsum text to test scrolling */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel justo nec velit iaculis condimentum. Nam ac aliquam lacus, sit amet tincidunt est. Suspendisse potenti. Duis nec mauris id lectus consectetur hendrerit.
              </Text>
            </ScrollView>
          </Card.Content>
        </Card>
        <Checkbox.Item
          label="I have read the agreement"
          status={isChecked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxChange}
          style={tw`flex-row-reverse`}
          labelStyle={[tw`text-base`, { fontSize: getResponsiveSize(14, 16, 18) }]}
          color="#000"
          uncheckedColor="#000"
        />
        {isChecked && (
          <Button
            mode="contained"
            onPress={handleSaveAndContinue}
            style={tw`mt-6`}
            contentStyle={tw`py-2`}
            labelStyle={[tw`text-lg`, { fontSize: getResponsiveSize(16, 18, 20) }]}
            buttonColor="#000000"
          >
            Save and Continue
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourRiderAgreementScreen;
