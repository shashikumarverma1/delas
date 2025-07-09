import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import useFormStore from "../store/useFormStore";
import React = require("react");
import { useRoute } from "@react-navigation/core";
import { CustomHeader } from "../components/customHeader";
import moment = require("moment");

export const TaskDetails = ({ navigation }) => {
    const route = useRoute()
    const { dataList, removeData, } = useFormStore();
    const { item } = route.params;
    const onPessBack = React.useCallback(() => { navigation.goBack() }, [navigation])
    const onPressDelete = React.useCallback(() => {
        let index = dataList.findIndex((el) => el === item);
        removeData(index);
        navigation.goBack();
    }, [navigation])

    const onPressEdit = React.useCallback(() => {
        navigation.navigate("TaskScreen", { item });
    }, [navigation, item]);

    return (
        <View >
            <CustomHeader navigation={navigation} leftLeble={"<- Go back"} rightLeble={""} onPessBack={onPessBack} onPressRight={undefined} />
            <View style={styles.renderItemContainer}>
                <Text>Title: {item?.title}</Text>
                <Text>Description: {item?.description}</Text>
                <Text>Priority: {item?.priority}</Text>
                <Text>Due Date: {moment(item?.dueDate).format('DD MMMM YYYY')}</Text>
                <View style={styles.updateContainer}>
                    <TouchableOpacity style={styles.editContainer} onPress={onPressEdit}><Text style={styles.title}>Edit</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.deleteContainer} onPress={onPressDelete}><Text style={styles.title}>Delete </Text></TouchableOpacity>
                </View>
            </View>
        </View>)
}
const styles = StyleSheet.create({
    renderItemContainer: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: 15,
        marginTop: 20
    },
    updateContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
        , justifyContent: "space-between"
    },
    editContainer: {
        backgroundColor: '#007BFF',
        padding: 10,
        width: "45%",
        borderRadius: 5,
        justifyContent: "center",
    },
    deleteContainer: {
        backgroundColor: 'red',
        padding: 10,
        width: "45%",
        borderRadius: 5,
        justifyContent: "center",
    },
    title: {
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 20,
        color: "#ffffff",
        marginTop: 5,
        textAlign: "center"
    },
    header: {
        paddingTop: 40,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        // flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    }

})