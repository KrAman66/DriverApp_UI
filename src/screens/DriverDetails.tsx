import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import tw from 'twrnc';
import { Card } from 'react-native-paper';
import ProgressBar from '../components/ProgressBar';
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

const DriverDetails: React.FC = () => {

    const navigation = useNavigation();

    const currentStep = 3;
    const totalSteps = 4; 

    return (
        <SafeAreaView style={[tw`h-full`, { backgroundColor: "#F5F5F5" }]}>
            <View style={[styles.progressContainer]}>
                <ProgressBar steps={totalSteps} currentStep={currentStep} />
            </View>
            <View style={[tw`flex-row items-center`, styles.stepContainer]}>
                <View style={[tw`p-2`]}>
                    <Image source={require("../../assets/checked.png")} style={tw`w-4 h-4`} />
                </View>
                <Text style={[tw`justify-start`, { fontSize: width * 0.04 }]}>
                    Step {currentStep} of {totalSteps}
                </Text>
            </View>
            <View style={[styles.titleContainer]}>
                <Text style={[tw`font-bold mb-5`, { fontSize: width * 0.08 }]}>
                    Your rider application
                </Text>
            </View>
            <View style={[tw`flex-row items-center`, styles.container]}>
                <View style={[tw`bg-gray-200 rounded-full p-2`, styles.imageWrapper]}>
                    <Image source={require("../../assets/car.png")} style={tw`w-14 h-14`} />
                </View>
                <View style={tw`ml-3`}>
                    <Text style={[{ fontSize: width * 0.05 }]}>Username Title</Text>
                    <Text style={[tw`text-gray-500`, { fontSize: width * 0.04 }]}>Car {"\u2022"} Location</Text>
                </View>
            </View>
            <View style={[tw`flex-1 mx-2`, styles.cardContainer]}>
                <Card style={[tw`bg-white mb-4`, { borderRadius: 0 }]}>
                    <TouchableOpacity onPress={() => navigation.navigate("RiderAddress" as never)}>
                        <View style={[tw`flex-row items-center justify-between p-4`, styles.action]}>
                            <Text style={[{ fontSize: width * 0.05 }]}>Address details</Text>
                            <Image source={require("../../assets/down-arrow.png")} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("BankingDetails" as never)}>
                        <View style={[tw`flex-row items-center justify-between p-4`, styles.action]}>
                            <Text style={[{ fontSize: width * 0.05 }]}>Banking details</Text>
                            <Image source={require("../../assets/down-arrow.png")} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("CriminalRecordProof" as never)}>
                        <View style={[tw`flex-row items-center justify-between p-4`, styles.action]}>
                            <Text style={[{ fontSize: width * 0.05 }]}>Criminal record check</Text>
                            <Image source={require("../../assets/down-arrow.png")} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("DrivingLicenceProof" as never)}>
                        <View style={[tw`flex-row items-center justify-between p-4`, styles.action]}>
                            <Text style={[{ fontSize: width * 0.05 }]}>Driving license check</Text>
                            <Image source={require("../../assets/down-arrow.png")} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("RiderAgreement" as never)}>
                        <View style={[tw`flex-row items-center justify-between p-4`, styles.action]}>
                            <Text style={[{ fontSize: width * 0.05 }]}>Your rider agreement</Text>
                            <Image source={require("../../assets/down-arrow.png")} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("RightToWork" as never)}>
                        <View style={[tw`flex-row items-center justify-between p-4`, styles.action]}>
                            <Text style={[{ fontSize: width * 0.05 }]}>Right to work check</Text>
                            <Image source={require("../../assets/down-arrow.png")} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("YourVehicleInfo" as never)}>
                        <View style={[tw`flex-row items-center justify-between p-4`, styles.action]}>
                            <Text style={[{ fontSize: width * 0.05 }]}>Vehicle information check</Text>
                            <Image source={require("../../assets/down-arrow.png")} style={styles.arrowIcon} />
                        </View>
                    </TouchableOpacity>
                </Card>
            </View>
        </SafeAreaView>
    );
}

export default DriverDetails;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: width * 0.05,
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    titleContainer: {
        marginTop: height * 0.02,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: width * 0.05,
        marginBottom: height * 0.01,
    },
    action: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    imageWrapper: {
        backgroundColor: '#0000001A',
    },
    progressContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 7,
        height: height * 0.01,
        marginTop: height * 0.03,
        padding: width * 0.03,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: height * 0.005,
    },
    cardContainer: {
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginTop: height * 0.02,
        paddingHorizontal: width * 0.05,
    },
    arrowIcon: {
        width: width * 0.05,
        height: width * 0.05,
        transform: [{ rotate: "270deg" }],
    },
});
