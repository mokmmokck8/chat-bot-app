import { sleep } from '@/utils/sleep';
import axios from 'axios';
import { useNavigation, useLocalSearchParams, Link } from 'expo-router';
import { isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Animated, Dimensions, Easing } from 'react-native';
import { IconButton, Text, Icon, useTheme, Button } from 'react-native-paper';

const Step2 = () => {
    const navigator = useNavigation();
    const { selectedImage, selectedPdfDetail } = useLocalSearchParams();
    const theme = useTheme();

    const position = useRef(new Animated.Value(0)).current;

    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        const startAnimation = () => {
            Animated.loop(
                Animated.timing(position, {
                    toValue: screenWidth, // Move to the screen width
                    duration: 4000, // Adjust the duration for speed
                    easing: Easing.linear, // Smooth movement
                    useNativeDriver: true, // Use native driver for better performance
                }),
                { resetBeforeIteration: true } // Resets to the start value on iteration
            ).start();
        };

        startAnimation();
    }, [position]);

    const translateX = position.interpolate({
        inputRange: [0, screenWidth],
        outputRange: [0, screenWidth], // Moves from 0 to the screen width
        extrapolate: 'extend',
    });

    const animatedStyle = {
        transform: [
            {
                translateX: Animated.modulo(translateX, screenWidth), // Reset position once it exceeds screenWidth
            },
        ],
    };

    const trainingModal = async () => {
        if (!isEmpty(selectedPdfDetail)) {
            const file = JSON.parse(selectedPdfDetail as string);
            const formData = new FormData();
            formData.append('file', file);

            await sleep(3000);
            // await axios.post('https://your-api-url.com/upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });
            navigator.navigate('Step3');
        }
    };
    useEffect(() => {
        trainingModal();
    }, [selectedPdfDetail]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <IconButton icon="chevron-left" size={30} onPress={navigator.goBack} />

            <View style={styles.container}>
                <View style={styles.paragraph}>
                    <Text variant="headlineMedium">Step 2</Text>
                    <Text>Training LLM. Please wait...</Text>
                </View>
            </View>
            <View>
                <Animated.View style={animatedStyle}>
                    <Icon color={theme.colors.primary} source="truck-fast" size={40} />
                </Animated.View>
            </View>
            {/* <View style={styles.container}>
                <Link href={{ pathname: '/Step3', params: { selectedImage } }}>
                <Button mode="contained" onPress={trainingModal}>
                    Start Training
                </Button>
                </Link>
            </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    paragraph: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
});

export default Step2;
