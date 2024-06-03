import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import tw from "twrnc";

const { width, height } = Dimensions.get('window');

const Wallet: React.FC = () => {
    return (
        <SafeAreaView style={[tw`h-full`, { backgroundColor: "#F5F5F5" }]}>
            <View style={[tw`flex-1`]}>
                <View
                    style={[
                        tw`justify-center items-center`,
                        styles.container,
                        {
                            backgroundColor: "#FFFFFF",
                            borderBottomLeftRadius: width * 0.12,
                            borderBottomRightRadius: width * 0.12,
                            overflow: "hidden",
                            marginBottom: height * 0.02, // Adjusted marginBottom
                        },
                    ]}
                >
                    <View style={[tw`flex-row items-center justify-start w-full px-4`, styles.header]}>
                        <TouchableOpacity style={[tw`bg-gray-200 rounded-xl p-3`, styles.imageWrapper]}>
                            <Image source={require("../../assets/down-arrow.png")} style={[{ transform: [{ rotate: "90deg" }] }, styles.image]} />
                        </TouchableOpacity>
                        <Text style={tw`text-3xl ml-4 font-bold`}>Wallet</Text>
                        <View style={tw`flex-1`}></View>
                        <TouchableOpacity style={[tw`bg-gray-200 rounded-xl p-3`, styles.imageWrapper]}>
                            <Image source={require("../../assets/bell.png")} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                    <View style={[tw`flex justify-center items-center`]}>
                        <Text style={tw`font-bold text-4xl mb-1`}>£230</Text>
                        <Text style={tw`text-lg font-bold mb-1`}>Total Earnings</Text>
                    </View>
                </View>
                <View style={[tw`flex-row items-center justify-between w-full px-10`, styles.subHeader]}>
                    <Text style={tw`text-lg font-bold`}>Delivery Runs</Text>
                    <TouchableOpacity style={[tw`bg-gray-200 rounded-sm p-1 flex-row items-center`, styles.dropdownButton]}>
                        <Image source={require("../../assets/calendar.png")} style={styles.icon} />
                        <Text style={tw`text-sm font-semibold mx-2`}>May 2024</Text>
                        <View style={{ width: width * 0.05 }} />
                        <Image source={require("../../assets/down-arrow-filled.png")} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[tw`flex-row items-center justify-between w-full px-12`, styles.subHeader]}>
                    <Text style={[tw`text-sm`, { color: '#808080' }]}>May 10 - May 20</Text>
                    <View style={tw`flex-1`}></View>
                    <View style={[tw`bg-gray-200 rounded-md mr-3`, styles.squareBackground]}>
                        <Text style={[tw`text-sm font-semibold`, { color: '#808080' }]}>10</Text>
                    </View>
                    <Image source={require("../../assets/broad-arrow.png")} style={[{ transform: [{ rotate: "270deg" }], tintColor: '#A3A2A2', padding: width * 0.002 }, styles.image]} />
                </TouchableOpacity>

                {/* Payment Log Cards */}
                <View style={[tw`flex-1 mx-2`, styles.cardContainer]}>
                    <Card style={[tw`bg-white mb-4`, { borderRadius: width * 0.02, padding: width * 0.04 }]}>
                        <View style={tw`flex-row items-center justify-between`}>
                            <Text style={[tw`text-base`, { color: '#333' }]}>Payment 1</Text>
                            <Text style={[tw`text-base`, { color: '#333' }]}>£50</Text>
                        </View>
                        <Text style={[tw`text-xs`, { color: '#808080', marginTop: height * 0.005 }]}>May 10, 2024</Text>
                    </Card>
                    <Card style={[tw`bg-white mb-4`, { borderRadius: width * 0.02, padding: width * 0.04 }]}>
                        <View style={tw`flex-row items-center justify-between`}>
                            <Text style={[tw`text-base`, { color: '#333' }]}>Payment 2</Text>
                            <Text style={[tw`text-base`, { color: '#333' }]}>£75</Text>
                        </View>
                        <Text style={[tw`text-xs`, { color: '#808080', marginTop: height * 0.005 }]}>May 15, 2024</Text>
                    </Card>
                    <Card style={[tw`bg-white mb-4`, { borderRadius: width * 0.02, padding: width * 0.04 }]}>
                        <View style={tw`flex-row items-center justify-between`}>
                            <Text style={[tw`text-base`, { color: '#333' }]}>Payment 3</Text>
                            <Text style={[tw`text-base`, { color: '#333' }]}>£105</Text>
                        </View>
                        <Text style={[tw`text-xs`, { color: '#808080', marginTop: height * 0.005 }]}>May 20, 2024</Text>
                    </Card>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Wallet;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: height * 0.07,
    },
    header: {
        marginBottom: height * 0.045, // Reduced marginBottom to bring closer
    },
    imageWrapper: {
        backgroundColor: '#0000001A',
    },
    image: {
        width: 24,
        height: 24,
    },
    subHeader: {
        marginTop: height * 0.00001,
        marginBottom: height * 0.02,
    },
    dropdownButton: {
        backgroundColor: '#0000001A',
        borderRadius: width * 0.01,
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.04,
    },
    icon: {
        width: 16, // Adjust the size of the icon as needed
        height: 16, // Adjust the size of the icon as needed
    },
    squareBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.001,
        paddingHorizontal: width * 0.03,
        borderRadius: width * 0.01, // Keeps the rounded corners
        backgroundColor: '#0000001A',
    },
    cardContainer: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
});
