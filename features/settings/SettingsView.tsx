import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {useSettings} from "../../global/SettingsContext";

export const SettingsView: React.FunctionComponent = () => {
    const {settings, refresh} = useSettings()


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
        backgroundColor: '#fff',
        alignItems:"center"
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems:"center"
    },
});
