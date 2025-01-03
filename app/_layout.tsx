import BackgroundView from '@/components/shared/BackgroundView';
import { Stack } from 'expo-router';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { KeyboardProvider } from 'react-native-keyboard-controller';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

export default function RootLayout() {
    return (
        <KeyboardProvider>
            <PaperProvider theme={theme}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="index" />
                </Stack>
            </PaperProvider>
        </KeyboardProvider>
    );
}
