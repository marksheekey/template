import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ErrorProvider} from "./global/ErrorContext";
import {ErrorNotification} from "./global/ErrorNotificarion";
import {SettingsView} from "./features/settings/SettingsView";
import {SettingsProvider} from "./global/SettingsContext";


export default function App() {

    return (
        <ErrorProvider >
        <SettingsProvider >
        <View style={styles.container}>
            <ErrorNotification > </ErrorNotification>
            <SettingsView/>
            <StatusBar style="auto"/>
        </View>
        </SettingsProvider>
        </ErrorProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
