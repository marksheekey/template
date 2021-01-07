import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import React from "react";
import {LeaveUI} from "./repo/LeaveUI";

export const LeaveView: React.FunctionComponent<{ leave: LeaveUI[], nextPress: (() => void), prevPress: (() => void) }> = ({leave, nextPress, prevPress}) => {
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
            <Button title={"Previous"} onPress={prevPress} />
            <Button title={"Next"} onPress={nextPress} />
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

