import { useNavigation, useLocalSearchParams, Link } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Animated, Dimensions, Easing } from 'react-native';
import { IconButton, Text, Icon, useTheme, Button } from 'react-native-paper';

const Step3 = () => {
    const { goBack } = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <IconButton icon="chevron-left" size={30} onPress={goBack} />
            <View style={styles.container}>
                <Text variant="headlineMedium">Complete!!</Text>
                <Text>Training Finish, Go to chat with AI</Text>
                <Link href={{ pathname: '/Chat' }}>
                    <Button mode="contained" icon="arrow-right-thin">
                        Chat with AI
                    </Button>
                </Link>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        flex: 1,
    },
});

export default Step3;
