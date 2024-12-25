import { Stack } from 'expo-router';

export default function GameLayout() {
    return (
        <Stack
            screenOptions={{
                navigationBarHidden: true,
            }}
        >
            <Stack.Screen name="index" options={{ navigationBarHidden: true }} />
            <Stack.Screen name="details" />
        </Stack>
    );
}
