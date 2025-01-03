import React, { useState } from 'react';
import { Button, Icon, IconButton, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useNavigation } from 'expo-router';
import { head, isEmpty, isNil } from 'lodash';
import * as DocumentPicker from 'expo-document-picker';

const ChatBot = () => {
    const { goBack } = useNavigation();

    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [selectedPdfAssetList, setSelectedPdfAssetList] = useState<DocumentPicker.DocumentPickerAsset[] | null>(null);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const pickFileAsync = async () => {
        try {
            const pdfDetail = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', multiple: true });
            setSelectedPdfAssetList(pdfDetail.assets);
        } catch (err: unknown) {
            // see error handling
        }
    };

    const cleanSelectedFile = () => {
        setSelectedPdfAssetList(null);
        setSelectedImage(undefined);
    };

    const hasSelectedPdfDetail = !isEmpty(selectedPdfAssetList);
    const hasSelectedImage = !isEmpty(selectedImage);

    const isSelectedFile = hasSelectedPdfDetail || hasSelectedImage;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <IconButton icon="chevron-left" size={30} onPress={goBack} />
            <View style={styles.container}>
                <View style={styles.step1Paragraph}>
                    <Text variant="headlineMedium">Step 1</Text>
                    <Text>Please choose a photo/pdf to train the LLM</Text>
                </View>
                {isSelectedFile ? (
                    <Button mode="text" onPress={cleanSelectedFile}>
                        Clear
                    </Button>
                ) : (
                    <>
                        <Button mode="contained" onPress={pickImageAsync}>
                            Use Image to train model
                        </Button>
                        <Button mode="contained" onPress={pickFileAsync}>
                            Use PDF to train model
                        </Button>
                    </>
                )}
                {hasSelectedPdfDetail &&
                    selectedPdfAssetList?.map((item, index) => (
                        <View key={index} style={styles.fileItem}>
                            <Icon source="file-document-outline" size={40} />
                            <Text>{item.name}</Text>
                        </View>
                    ))}
                {hasSelectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

                {isSelectedFile && (
                    <>
                        <Link
                            href={{
                                pathname: '/Step2',
                                params: { selectedImage, selectedPdfDetail: JSON.stringify(selectedPdfAssetList) },
                            }}
                        >
                            <Button icon="boom-gate-up-outline" mode="contained">
                                Train model
                            </Button>
                        </Link>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 30,
        alignItems: 'center',
    },
    step1Paragraph: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    fileItem: { flexDirection: 'row', gap: 20, alignSelf: 'flex-start', paddingLeft: 20, paddingRight: 20 },
});

export default ChatBot;
