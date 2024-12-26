import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export type TextBubbleMode = 'self' | 'opposite';

type TextBubbleProps = {
    text?: string;
    isLoading?: boolean;
    mode?: TextBubbleMode;
};

const TextBubble = ({ text, isLoading, mode = 'self' }: TextBubbleProps) => {
    const theme = useTheme();

    const backgroundColor = mode === 'self' ? theme.colors.primary : '#6c7a89';
    const alignSelf = mode === 'self' ? 'flex-end' : 'flex-start';

    return (
        <View style={{ ...styles.bubble, backgroundColor, alignSelf }}>
            <Text style={styles.text}>{isLoading ? '...' : text}</Text>
        </View>
    );
};

export default TextBubble;

const styles = StyleSheet.create({
    bubble: {
        marginRight: 20,
        marginLeft: 20,

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,

        borderRadius: 10,
    },
    text: {
        color: 'white',
    },
});
