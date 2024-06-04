import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import tw from "twrnc";

const { width, height } = Dimensions.get('window');

const Wallet: React.FC = () => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [pendingCard, setPendingCard] = useState<number | null>(-1);

    const toggleExpand = (cardIndex: number) => {
        if (pendingCard !== cardIndex) {
            setExpandedCard(expandedCard === cardIndex ? null : cardIndex);
        }
    };

    const markAsActive = (cardIndex: number) => {
        if (pendingCard === cardIndex) {
            setPendingCard(null);
        }
    };

    const paymentLogs = [
        { id: '#589', amount: '£50' },
        { id: '#590', amount: '£75' },
        { id: '#591', amount: '£105' },
    ];

    const sampleDays = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 
        'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'
    ];

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
                            marginBottom: height * 0.02,
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
                    <Text style={tw`text-lg font-bold`}>Earnings Summary</Text>
                    <TouchableOpacity style={[tw`bg-gray-200 rounded-sm p-1 flex-row items-center`, styles.dropdownButton]}>
                        <Image source={require("../../assets/calendar.png")} style={styles.icon} />
                        <Text style={tw`text-sm font-semibold mx-2`}>May 2024</Text>
                        <View style={{ width: width * 0.05 }} />
                        <Image source={require("../../assets/down-arrow-filled.png")} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[tw`flex-row items-center justify-between w-full px-10 `, styles.subHeader]}>
                    <Text style={[tw`text-sm`, { color: '#808080' }]}>May 10 - May 20</Text>
                    <View style={tw`flex-1`}></View>
                    <View style={[tw`bg-gray-200 rounded-md mr-3`, styles.squareBackground]}>
                        <Text style={[tw`text-sm font-semibold`, { color: '#808080' }]}>10</Text>
                    </View>
                    <Image source={require("../../assets/down-arrow.png")} style={[{ transform: [{ rotate: "270deg" }], tintColor: '#A3A2A2' ,padding: width * 0.002 }, styles.image]} />
                </TouchableOpacity>

                <ScrollView contentContainerStyle={[tw`mx-2`, styles.cardContainer]}>
                    {sampleDays.map((day, index) => (
                        <Card key={index} style={[
                            tw`mb-0.2 bg-white`, 
                            {
                                borderRadius: width * 0.01,
                                padding: width * 0.04,
                                shadowColor: '#0000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 2,
                                elevation: 0.0001,
                                backgroundColor: index === pendingCard ? 'transparent' : '#FFFFFF'
                            }
                        ]}>
                            <TouchableOpacity onPress={() => toggleExpand(index)} onLongPress={() => markAsActive(index)}>
                                <View style={tw`flex-row items-center justify-between`}>
                                    <Text style={[tw`text-base`, { color: '#333' }]}>{day}</Text>
                                    <View style={tw`flex-row items-center`}>
                                        {index === pendingCard ? (
                                            <View style={[tw`bg-[#1D7FBB1A] rounded-md mr-3`, styles.pendingsquareBackground]}>
                                                <Text style={[tw`text-sm font-semibold`, { color: '#1D7FBB' }]}>Payment Pending</Text>
                                            </View>
                                        ) : (
                                            <>
                                                <View style={[tw`bg-gray-200 rounded-md mr-3`, styles.squareBackground]}>
                                                    <Text style={[tw`text-sm font-semibold`, { color: '#808080' }]}>10</Text>
                                                </View>
                                                <Image source={require("../../assets/down-arrow.png")} style={[{ transform: [{ rotate: expandedCard === index ? "0deg" : "270deg" }], padding: width * 0.002 }, styles.image]} />
                                            </>
                                        )}
                                    </View>
                                </View>
                                <Text style={[tw`text-xs`, { color: '#808080', marginTop: height * 0.0001 }]}>May {10 + index * 2}, 2024</Text>
                            </TouchableOpacity>
                            {expandedCard === index && index !== pendingCard && (
                                <View style={tw`mt-2`}>
                                    {paymentLogs.map((log, logIndex) => (
                                        <View key={logIndex} style={tw`flex-row justify-between mt-1`}>
                                            <Text style={tw`text-xs`}>{log.id}</Text>
                                            <Text style={tw`text-xs`}>{log.amount}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </Card>
                    ))}
                </ScrollView>
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
        marginBottom: height * 0.045,
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
        width: 16,
        height: 16,
    },
    squareBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.001,
        paddingHorizontal: width * 0.03,
        borderRadius: width * 0.01,
        backgroundColor: '#0000001A',
    },
    pendingsquareBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.001,
        paddingHorizontal: width * 0.03,
        borderRadius: width * 0.01,
        backgroundColor: '#1D7FBB1A',
    },
    cardContainer: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
});
