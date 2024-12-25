import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

export const backgroundViewColors: Record<string, LinearGradientProps['colors']> = {
    default: ['#C9FFBF', '#FFAFBD'],
    reverseDefault: ['#FFAFBD', '#C9FFBF'],
};

type BackgroundViewProps = {
    children: React.ReactNode;
    colors?: LinearGradientProps['colors'];
};
const BackgroundView = ({ children, colors = backgroundViewColors.default }: BackgroundViewProps) => {
    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
                {children}
            </LinearGradient>
        </View>
    );
};

export default BackgroundView;
