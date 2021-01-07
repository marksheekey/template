import {FlatList, Text, View} from "react-native";
import React from "react";
import {RotasUI} from "./repo/RotasUI";

export const RotasView: React.FunctionComponent<{ rotas: RotasUI[] }> = ({rotas}) => {

    const renderItem = (item: RotasUI) => (
        <Text>{item.start} </Text>
    );

    return (
        <View>
            <FlatList data={rotas}
                      keyExtractor={(item) => item.key}
                      renderItem={({item}) => (renderItem(item))}>
            </FlatList>
        </View>
    );
}
