import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState(''); // State to store email
    const [password, setPassword] = useState(''); // State to store password
    const [secureTextEntry, setSecureTextEntry] = useState(true); // State to toggle password visibility

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const handleSignIn = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        // Add more validation if needed
        navigation.navigate('RecipeDashboard'); // Navigate to RecipeDashboard
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Enter your password"
                    secureTextEntry={secureTextEntry} // Control password visibility
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon
                        name={secureTextEntry ? "eye-off" : "eye"} // Change icon based on state
                        size={24}
                        color="grey"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity>
                    <Text style={styles.staySignedIn}>Stay signed in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or continue with</Text>

            <View style={styles.row}>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007aff',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 15,
    },
    inputPassword: {
        flex: 1,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    staySignedIn: {
        color: 'white',
    },
    forgotPassword: {
        color: 'white',
    },
    button: {
        backgroundColor: '#002c5c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    orText: {
        color: 'white',
        textAlign: 'center',
        marginVertical: 10,
    },
    socialButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    socialButtonText: {
        color: '#007aff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default SignInScreen;
