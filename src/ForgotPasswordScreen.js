import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library

const ForgotPasswordScreen = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureNewPassword, setSecureNewPassword] = useState(true);
    const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

    const toggleNewPasswordVisibility = () => {
        setSecureNewPassword(!secureNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setSecureConfirmPassword(!secureConfirmPassword);
    };

    const handleResetPassword = () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        // Add logic to handle password reset here
        navigation.navigate('SignInScreen'); // Navigate to Sign In screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    secureTextEntry={secureNewPassword}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TouchableOpacity onPress={toggleNewPasswordVisibility}>
                    <Icon
                        name={secureNewPassword ? "eye-off" : "eye"} // Change icon based on state
                        size={24}
                        color="grey"
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm new password"
                    secureTextEntry={secureConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                    <Icon
                        name={secureConfirmPassword ? "eye-off" : "eye"} // Change icon based on state
                        size={24}
                        color="grey"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
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
        flex: 1,
        padding: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 15,
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
});

export default ForgotPasswordScreen;
