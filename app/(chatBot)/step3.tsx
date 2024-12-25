import { useNavigation, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Animated, Dimensions, Easing } from 'react-native';
import { IconButton, Text, Icon, useTheme } from 'react-native-paper';

const Step3 = () => {
    const { goBack } = useNavigation();
    const { selectedImage } = useLocalSearchParams() as { selectedImage: string };
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <IconButton icon="chevron-left" size={30} onPress={goBack} />
            <View style={styles.container}>
                <View style={styles.step1Paragraph}>
                    <Text variant="headlineMedium">Step 2</Text>
                    <Text>Training LLM. Please wait...</Text>
                </View>
            </View>
            <View>
                <Animated.View style={animatedStyle}>
                    <Icon color={theme.colors.primary} source="truck-fast" size={40} />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    step1Paragraph: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
});

export default Step3;
