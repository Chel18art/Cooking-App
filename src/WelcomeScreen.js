import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Savor the Joy of Cooking</Text>
            <Text style={styles.subtitle}>Get ready to spice up your culinary journey</Text>

            <Image
                style={styles.image}
                source={{ uri: 'https://st2.depositphotos.com/48497676/46402/v/600/depositphotos_464022290-stock-illustration-cute-girl-teaches-cooking-courses.jpg' }} 
            />

            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('CreateAccountScreen')}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007aff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#007aff',
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
