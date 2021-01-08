import React from "react";
import {useNotificationsSettings} from "./useNotificationsSettings";
import {SettingsUI} from "./repo/SettingsUI";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";

export const NotificationSettingsView: React.FunctionComponent = () => {

    const { leave , nextMonth, previousMonth} = useNotificationsSettings()

    const renderItem = (item: SettingsUI) => (
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
