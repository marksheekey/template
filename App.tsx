import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ErrorProvider} from "./global/ErrorContext";
import {ErrorNotification} from "./global/ErrorNotificarion";
import {SettingsView} from "./features/settings/SettingsView";
import {SettingsProvider} from "./global/SettingsContext";
import {MonthLeaveView} from "./features/leave/MonthLeaveView";
import {MyRotasView} from "./features/rotas/myrotas/MyRotasView";


export default function App() {

    return (
        <ErrorProvider >
        <SettingsProvider >
        <View style={styles.container}>
            <ErrorNotification />
            <SettingsView/>
            <MonthLeaveView />
            <MyRotasView />
            <StatusBar style="auto"/>
        </View>
        </SettingsProvider>
        </ErrorProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:50,
        flex: 1,
        backgroundColor: '#fff',
    },
});
