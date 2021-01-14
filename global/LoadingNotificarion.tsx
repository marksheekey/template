
import {StyleSheet, Text, View} from "react-native";
import React from "react";

export const LoadingNotification: React.FunctionComponent = () => {
    return (
        <View style={styles.container}>
        <Text style={{fontSize: 20}}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems:"center"
    },
});
