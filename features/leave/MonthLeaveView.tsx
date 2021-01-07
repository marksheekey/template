import React from "react";
import {useMonthLeave} from "./useMonthLeave";
import {LeaveUI} from "./repo/LeaveUI";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";

export const MonthLeaveView: React.FunctionComponent = () => {

    const { leave , nextMonth, previousMonth} = useMonthLeave()

    const renderItem = (item: LeaveUI) => (
        <Text>{item.start} </Text>
    );

    return (
        <View style={styles.container}>
            {leave.length === 0 &&
            <Text >No Leave Data</Text>
            }
            <FlatList data={leave}
                      keyExtractor={(item) => item.key}
                      renderItem={({item}) => (renderItem(item))}>
            </FlatList>
            <Button title={"Previous"} onPress={nextMonth} />
            <Button title={"Next"} onPress={previousMonth} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
