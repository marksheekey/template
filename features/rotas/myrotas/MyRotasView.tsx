import React from "react";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import {MyRotasUI} from "./MyRotasUI";
import {useMyRotas} from "./useMyRotas";

export const MyRotasView: React.FunctionComponent = () => {
    const {rotas, nextMonth, previousMonth} = useMyRotas()
    const renderItem = (item: MyRotasUI) => (
        <View style={styles.item}>
            <Text>{item.item} </Text>
            <Text>{item.start} </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {rotas.length === 0 &&
            <Text>No Rotas</Text>
            }
            <FlatList data={rotas}
                      keyExtractor={(item) => item.key}
                      renderItem={({item}) => (renderItem(item))}>
            </FlatList>
            <View style={styles.buttons}>
                <Button title={"Next"} onPress={nextMonth}/>
                <Button title={"Previous"} onPress={previousMonth}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    buttons: {
        marginBottom:20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
