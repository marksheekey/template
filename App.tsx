import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ErrorProvider} from "./global/ErrorContext";
import {ErrorNotification} from "./global/ErrorNotificarion";
import {SettingsView} from "./features/settings/SettingsView";
import {SettingsProvider} from "./global/SettingsContext";
import {MonthLeaveView} from "./features/leave/MonthLeaveView";
import {MyRotasView} from "./features/rotas/myrotas/MyRotasView";
import {LoadingProvider, useLoading} from "./global/LoadingContext";
import {LoadingNotification} from "./global/LoadingNotificarion";


export default function App() {

    const { loading} = useLoading()

    return (
        <LoadingProvider >
        <ErrorProvider >
        <SettingsProvider >
        <View style={styles.container}>
            {loading &&
            <LoadingNotification />
                }
            <ErrorNotification />
            <SettingsView/>
            <MonthLeaveView />
            <MyRotasView />
            <StatusBar style="auto"/>
        </View>
        </SettingsProvider>
        </ErrorProvider>
        </LoadingProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:50,
        flex: 1,
        backgroundColor: '#fff',
    },
});
