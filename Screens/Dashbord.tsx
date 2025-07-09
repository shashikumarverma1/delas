import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import useFormStore from "../store/useFormStore";
import React = require("react");
import { CustomHeader } from "../components/customHeader";
import moment = require("moment");

export const Dashbord = ({ navigation }) => {
    const { dataList } = useFormStore();
    const [filterValue, setFilterValue] = React.useState('All');
    const handleFilterChange = React.useCallback((value) => { setFilterValue(value) }, [setFilterValue, filterValue]);

    const filteredData = React.useMemo(() => {
        if (filterValue === 'All') return dataList;
        return dataList.filter(item => filterValue === 'Completed' ? item.isCompleted : !item.isCompleted);
    }, [dataList, filterValue]);

    const onPressRight = React.useCallback(() => navigation.navigate("TaskScreen"), [navigation]);

    return <View>
        <CustomHeader navigation={navigation} leftLeble={"Dashbord"} rightLeble={"+ Add Task"} onPressRight={onPressRight} />
        <View style={styles.buttonContainer}>
            {['All', 'Completed', 'Incomplete'].map((el, index) => {
                const priorityStyle = React.useMemo(() => {
                    return filterValue === el ? styles.selectedPriority : styles.notSelectedPriority;
                }, [filterValue, el]);
                return (
                    <TouchableOpacity

                        key={index}
                        onPress={() => handleFilterChange(el)}
                        style={[priorityStyle]}
                    >
                        <Text style={styles.priorityLeble}>{el}</Text>
                    </TouchableOpacity>
                );
            })}

        </View>
        <FlatList
            style={styles.flateList}
            contentContainerStyle={styles.flateListContainer}
            data={filteredData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View key={index} style={styles.renderItemContainer}>
                    <Text>Title: {item?.title}</Text>
                    <Text>status: {item?.isCompleted ? "Completed" : "Incomplete"}</Text>
                    <Text>Priority: {item?.priority}</Text>
                    <Text>Due Date: {moment(item?.dueDate).format('DD MMMM YYYY')}</Text>
                    {item?.description && <Text>Description: {item?.description}</Text>}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("TaskDetails", { item })}
                        style={styles.viewDetailsContainer}><Text style={styles.viewDetailsLeble}>View Detals</Text></TouchableOpacity>
                </View>
            )}
        />

    </View>
}

const styles = StyleSheet.create({
    viewDetailsLeble: {
        color: "#ffffff", textAlign: "center"
    },
    viewDetailsContainer: {
        padding: 10, borderRadius: 5, marginTop: 10, flexDirection: "row",
        backgroundColor: '#007BFF', justifyContent: "center"
    },
    flateList: {
        marginTop: 20
    },
    flateListContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingBottom: 200
    },
    priorityLeble: {
        color: "#fff",
        textAlign: "center"
    },
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
    },
    buttonContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 20,
        color: "#000000",
        marginTop: 5,
    },
    selectedPriority: {
        backgroundColor: "#000000",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        color: "#fff",
        fontWeight: "bold",
        width: "30%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    notSelectedPriority: {
        backgroundColor: "grey",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        color: "#fff",
        fontWeight: "bold",
        width: "30%",
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});