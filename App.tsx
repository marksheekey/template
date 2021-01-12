import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MyRotasView} from "./features/rotas/myrotas/MyRotasView";
import {ErrorProvider} from "./global/GlobalContext";
import {ErrorNotification} from "./global/ErrorNotificarion";


export default function App() {

    return (
        <ErrorProvider >
        <View style={styles.container}>
            <ErrorNotification > </ErrorNotification>
            <MyRotasView/>
            <StatusBar style="auto"/>
        </View>
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
