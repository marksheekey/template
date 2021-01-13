import {useError} from "./ErrorContext";
import {StyleSheet, Text, View} from "react-native";
import React from "react";

export const ErrorNotification: React.FunctionComponent = () => {
    const { error} = useError();
    console.log("error:",error)
    return (
        <View style={styles.container}>
        <Text style={{fontSize: 20}}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems:"center"
    },
});
