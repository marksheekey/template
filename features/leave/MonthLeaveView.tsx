import React from "react";
import {useMonthLeave} from "./useMonthLeave";
import {LeaveUI} from "./repo/LeaveUI";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";

export const MonthLeaveView: React.FunctionComponent = () => {

    const {leave, nextMonth, previousMonth} = useMonthLeave()

    const renderItem = (item: LeaveUI) => (
        <Text>{item.start} </Text>
    );

    return (
        <View style={styles.container}>
            {leave.length === 0 &&
            <Text>No Leave Data</Text>
            }
            <FlatList data={leave}
                      keyExtractor={(item) => item.key}
                      renderItem={({item}) => (renderItem(item))}>
            </FlatList>
            <View style={styles.buttons}>
                <Button title={"Previous"} onPress={nextMonth}/>
                <Button title={"Next"} onPress={previousMonth}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
