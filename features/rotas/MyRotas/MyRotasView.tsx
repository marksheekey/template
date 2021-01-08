import React from "react";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import {MyRotasUI} from "./MyRotasUI";
import {useMyRotas} from "./useMyRotas";

export const MyRotasView: React.FunctionComponent = () => {

    const {rotas, nextMonth, previousMonth, errorMessage, loading} = useMyRotas()

    const renderItem = (item: MyRotasUI) => (
        <View style={styles.item}>
            <Text>{item.item} </Text>
            <Text>{item.start} </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading &&
            <Text>Loading...</Text>
            }
            {rotas.length === 0 &&
            <Text>No Rotas</Text>
            }
            <FlatList data={rotas}
                      keyExtractor={(item) => item.key}
                      renderItem={({item}) => (renderItem(item))}>
            </FlatList>
            <Button title={"Previous"} onPress={nextMonth}/>
            <Button title={"Next"} onPress={previousMonth}/>
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
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
