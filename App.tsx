import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ErrorProvider} from "./global/ErrorContext";
import {SettingsView} from "./features/settings/SettingsView";
import {LoadingProvider} from "./global/LoadingContext";
import configureStore from "./global/redux/store/configureStore";
import { Provider } from 'react-redux';
const store = configureStore({});

export default function App() {

    return (
        <Provider store = {store}>
        <LoadingProvider >
        <ErrorProvider >
        <View style={styles.container}>
            <SettingsView/>
            <StatusBar style="auto"/>
        </View>
        </ErrorProvider>
        </LoadingProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:50,
        flex: 1,
        backgroundColor: '#fff',
    },
});
