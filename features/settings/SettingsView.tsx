import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { SettingsState} from "../../global/redux/reducers/settingsReducer";
import {fetchData} from "../../global/redux/actions/actions";

export const SettingsView: React.FunctionComponent = () => {
    const selectSetings = (state: SettingsState) => state.settings
    const settings = useSelector(selectSetings)
    const dispatch = useDispatch()

    useEffect(() => {
        //dispatch(fetchData())
    }, [])

    dispatch(fetchData())

    return (
        <View style={styles.container}>
            {settings &&
            <View style={styles.container}>
                <Text>Attendance Pay Frequency {settings.attendance_pay_frequency}</Text>
                <Text>Early clock in minutes {settings.early_clock_in_minutes}</Text>
            </View>
            }
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
