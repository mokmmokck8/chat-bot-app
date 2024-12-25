import { Alert, View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';
import BackgroundView from '@/components/shared/BackgroundView';

export default function Home() {
    return (
        <BackgroundView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                <Link href="/(chatBot)">
                    <Button mode="contained">Start Chat bot</Button>
                </Link>
                {/* <Link href="/(game)">
                    <Button mode="text" onPress={() => Alert.alert('asdf')}>
                        or play game
                    </Button>
                </Link> */}
            </View>
        </BackgroundView>
    );
}
