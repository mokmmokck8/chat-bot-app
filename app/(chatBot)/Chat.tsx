import TextBubble, { TextBubbleMode } from '@/components/shared/TextBubble';
import { Link, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { InputAccessoryView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { KeyboardAvoidingView, KeyboardGestureArea } from 'react-native-keyboard-controller';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { last } from 'lodash';
import { sleep } from '@/utils/sleep';

type ChatDatum = {
    mode: TextBubbleMode;
    text: string;
    isLoading?: boolean;
};

const Chat = () => {
    const { goBack } = useNavigation();

    const [chats, setChats] = useState<ChatDatum[]>([]);
    const [text, setText] = useState('');
    const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);

    const handleSubmit = () => {
        if (isGeneratingResponse) return;

        const messageByUser = text.trim();
        if (messageByUser !== '') {
            setChats((currentChats) => [...currentChats, { mode: 'self', text: messageByUser }]);
            setText('');
            generateLLMResponse(messageByUser);
        }
    };

    const generateLLMResponse = async (message: string) => {
        setIsGeneratingResponse(true);
        setChats((currentChats) => [...currentChats, { mode: 'opposite', text: '', isLoading: true }]);

        await sleep(3000);
        const response = {
            data: {
                message: 'ai response answer',
            },
        };
        // const response = await axios.post('', { query: message });

        setChats((currentChats) => {
            return [...currentChats.slice(0, -1), { mode: 'opposite', text: response.data.message, isLoading: false }];
        });
        setIsGeneratingResponse(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <IconButton icon="chevron-left" size={30} onPress={goBack} />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS and Android
            >
                <ScrollView>
                    <View style={styles.container}>
                        {chats.map((chat, index) => (
                            <TextBubble key={index} isLoading={chat.isLoading} mode={chat.mode} text={chat.text} />
                        ))}
                    </View>
                </ScrollView>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Ask everything about the target file~"
                    onSubmitEditing={handleSubmit}
                    returnKeyType="done"
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 30,
        flex: 1,
        justifyContent: 'flex-end',
    },
});

export default Chat;
