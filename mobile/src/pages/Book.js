import React, {useState} from 'react';
import GlobalStyle from '../styles';
import { SafeAreaView, Alert, StyleSheet, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import styles from '../styles';

import api from '../services/api';

export default function Book({navigation}){
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }

    return (
            <SafeAreaView style={[GlobalStyle.droidSafeArea, _styles.container]}>
                <Text style={_styles.label}>DATA DE INTERESSE *</Text>
                <TextInput 
                    style={_styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />
                <TouchableOpacity onPress={handleSubmit} style={_styles.button}>
                    <Text style={_styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={[_styles.button,_styles.cancelButton]}>
                    <Text style={_styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </SafeAreaView>
    );
}

const _styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    cancelButton: {
        backgroundColor: '#ccc',
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});