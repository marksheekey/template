import {ErrorProvider, useError} from "./GlobalContext";
import {StyleSheet, Text, View} from "react-native";
import React from "react";

export const ErrorNotification: React.FunctionComponent = () => {
    const { error, removeError } = useError();
    console.log("error:",error)
    return (
        <View style={styles.container}>
        <Text style={{fontSize: 20}}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
