
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {useLoading} from "./LoadingContext";

export const LoadingNotification: React.FunctionComponent = () => {
    const {isLoading} = useLoading()
    console.log("loading", isLoading)
    return (
        <View style={styles.container}>
            {isLoading &&
            <Text style={{fontSize: 20}}>Loading...{isLoading}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems:"center"
    },
});
