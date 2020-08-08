import React from 'react';
import { View, ImageBackground, Text} from 'react-native';

import GiveClassesBgImages from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){
    const {goBack} = useNavigation();
    function handleNavigateBack(){
        goBack();
    }
    return (
    <View style={styles.container}>
        <ImageBackground resizeMode='contain' style={styles.content} source={GiveClassesBgImages}>
            <Text style={styles.title}>Quer ser um proffy?</Text>
            <Text style={styles.description}>
                Para começar, você precisa se cadastrar como professor na nossa platarfoma web.
                </Text>
        </ImageBackground>

        <RectButton onPress={handleNavigateBack} style={styles.okButton}>
            <Text style={styles.okButtonText}>Tudo bem</Text>
        </RectButton>
    </View>
    );
}

export default GiveClasses;