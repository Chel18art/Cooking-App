import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateAccountScreen from './src/CreateAccountScreen';
import SignInScreen from './src/SignInScreen';
import WelcomeScreen from './src/WelcomeScreen';
import RecipeDashboard from './src/RecipeDashboard'; // Import the RecipeDashboard
import ForgotPasswordScreen from './src/ForgotPasswordScreen'; // Import the ForgotPasswordScreen

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="WelcomeScreen">
                <Stack.Screen 
                    name="WelcomeScreen" 
                    component={WelcomeScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="CreateAccountScreen" 
                    component={CreateAccountScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="SignInScreen" 
                    component={SignInScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="RecipeDashboard" 
                    component={RecipeDashboard} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="ForgotPasswordScreen" 
                    component={ForgotPasswordScreen} 
                    options={{ headerShown: false }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
