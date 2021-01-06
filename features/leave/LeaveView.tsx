import {FlatList, Text, View} from "react-native";
import React from "react";
import {LeaveUI} from "./repo/LeaveUI";

export const LeaveView: React.FunctionComponent<{ leave: LeaveUI[] }> = ({leave}) => {

    const renderItem = (item: LeaveUI) => (
        <Text>{item.start} </Text>
    );

    return (
        <View>
            <FlatList data={leave}
                      keyExtractor={(item) => item.key}
                      renderItem={({item}) => (renderItem(item))}>
            </FlatList>
        </View>
    );
}
