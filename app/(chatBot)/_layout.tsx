import { Stack } from 'expo-router';

export default function ChatBotLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="Step2" />
            <Stack.Screen name="Step3" />
            <Stack.Screen name="Chat" />
        </Stack>
    );
}
