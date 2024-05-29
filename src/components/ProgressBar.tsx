import React from 'react';
import { View, StyleSheet } from 'react-native';
import tw from 'twrnc';

const ProgressBar: React.FC<{ steps: number; currentStep: number }> = ({ steps, currentStep }) => {
  return (
    <View style={[tw`flex-row`, styles.progressContainer]}>
      {[...Array(steps)].map((_, index) => (
        <View key={index} style={[styles.progressBar, index < currentStep ? styles.completed : null]} />
      ))}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 7,
    height: 8,
  },
  progressBar: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 7,
    marginHorizontal: 1, // Adjust as needed for spacing between bars
  },
  completed: {
    backgroundColor: '#000',
  },
});
