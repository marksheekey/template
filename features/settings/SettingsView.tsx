import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {useMySettings} from "./useMySettings";

export const SettingsView: React.FunctionComponent = () => {
    const {settings, refresh} = useMySettings()
    return (
        <View style={styles.container}>
            {settings &&
            <View style={styles.container}>
                <Text>Attendance Pay Frequency {settings.attendance_pay_frequency}</Text>
                <Text>Early clock in minutes {settings.early_clock_in_minutes}</Text>
            </View>
            }
            <Button title={"Refresh"} onPress={refresh}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
