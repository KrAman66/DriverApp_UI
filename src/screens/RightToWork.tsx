

import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Card, RadioButton } from 'react-native-paper';
import tw from 'twrnc';
import * as Yup from 'yup';

const RightToWork: React.FC = () => {
  const navigation = useNavigation();
  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [inputText, setInputText] = useState<string>("");

  const handleDocumentSelect = (index: number) => {
    setSelectedDocument(index);
  };

  const handleSaveAndContinue = (values: any) => {
    console.log("Selected Document:", selectedDocument);
    console.log("Input Text:", values[selectedDocument as any]);
    navigation.navigate("DriverDetails" as never);
  };

  const validationSchema = Yup.object().shape({
    [String(selectedDocument)]: Yup.string().required('This field is required'),
  });

  return (
    <SafeAreaView style={[tw`h-full`, { backgroundColor: "#F5F5F5" }]}>
      <ScrollView contentContainerStyle={tw`p-6`}>
        <View style={tw`justify-end items-center`}>
          <Text style={[tw`text-3xl font-bold mb-10 mt-10`]}>Verify your right to work in the UK</Text>
          <Text style={tw`text-lg pl-5 pr-5`}>Choose from one of the following documents to upload a photo of in the next steps. You won't be able to use an expired document.</Text>
        </View>
        <View style={[tw`flex-1 p-10 mb-60 mx-2`]}>
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <Formik
              key={index}
              initialValues={{ [index]: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSaveAndContinue(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
                  <Card style={[tw`bg-white `, { borderRadius: 0 }]}>
                    <TouchableOpacity
                      onPress={() => handleDocumentSelect(index)}
                      style={[tw`flex-row items-center justify-between p-4`, styles.action]}
                    >
                      <Text style={[tw`text-lg`]}>{getDocumentName(index)}</Text>
                      <RadioButton
                        value={String(index)}
                        status={selectedDocument === index ? 'checked' : 'unchecked'}
                        onPress={() => handleDocumentSelect(index)}
                        uncheckedColor="#000"
                        color="#000"
                      />
                    </TouchableOpacity>
                  </Card>
                  {selectedDocument === index && (
                    <View style={tw`p-4`}>
                      <TextInput
                        style={[tw`border-2 border-gray-200 rounded-lg p-2 `, styles.input]}
                        placeholder={getDocumentName(index)}
                        onChangeText={handleChange(String(index))}
                        onBlur={handleBlur(String(index))}
                        value={values[String(index) as any]}
                      />
                      {touched[String(index) as any] && errors[String(index) as any] && (
                        <Text style={tw`text-red-500 mt-2 ml-2`}>{errors[String(index) as any]}</Text>
                      )}
                    </View>
                  )}
                  {/* No "Save and Continue" button here */}
                </View>
              )}
            </Formik>
          ))}
          {/* "Save and Continue" button rendered below all documents */}
          <Button
            mode="contained"
            onPress={() => navigation.navigate("DriverDetails" as never)}
            style={[tw`bg-black p-3 mt-2`, styles.saveButton]}
            labelStyle={tw`text-white`}
            disabled={selectedDocument === null}
          >
            Save and Continue
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RightToWork;

const styles = StyleSheet.create({
  action: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  input: {
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    alignSelf: 'stretch',
  },
});

// Helper function to get document name based on index
const getDocumentName = (index: number) => {
  switch (index) {
    case 0:
      return "Biometric residence permit";
    case 1:
      return "EU, EEA or Swiss ID card";
    case 2:
      return "EU, EEA or Swiss passport";
    case 3:
      return "Irish passport";
    case 4:
      return "Valid passport with visa inside";
    case 5:
      return "UK birth certificate";
    case 6:
      return "UK passport";
    default:
      return "";
  }
};