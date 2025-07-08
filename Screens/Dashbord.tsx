import { View, Text, Touchable, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import useFormStore from "../store/useFormStore";
import React = require("react");
import { CustomHeader } from "../components/customHeader";

export const Dashbord = ({ navigation }) => {
    const { addData, dataList } = useFormStore();
    const [filterValue, setFilterValue] = React.useState('All');
    const handleFilterChange = React.useCallback((value) => { setFilterValue(value) }, [setFilterValue, filterValue]);
    console.log("data", dataList);

    const filteredData = React.useMemo(() => {
        if (filterValue === 'All') return dataList;
        return dataList.filter(item => filterValue === 'Completed' ? item.isCompleted : !item.isCompleted);
    }, [dataList, filterValue]);

    return <View>
        <CustomHeader navigation={navigation} leftLeble={"Dashbord"} rightLeble={"+ Add Task"} />
        <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {['All', 'Completed', 'Incomplete'].map((el, index) => {
                return (
                    <TouchableOpacity

                        key={index}
                        onPress={() => handleFilterChange(el)}
                        style={[filterValue === el ? styles.selectedPriority : styles.notSelectedPriority]}
                    >
                        <Text style={{ color: '#fff', }}>{el}</Text>
                    </TouchableOpacity>
                );
            })}

        </View>
        <FlatList
            style={{ marginTop: 20 }}
            contentContainerStyle={{ paddingHorizontal: 20 , paddingBottom: 200 }}
            data={filteredData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                    <Text>Title: {item?.title}</Text>
                    <Text>status: {item?.isCompleted ? "Completed" : "Incomplete"}</Text>
                    <Text>Priority: {item?.priority}</Text>
                    <Text>Due Date: {item?.dueDate}</Text>
                    <Text>Description: {item?.description}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("TaskDetails" , { item })}
                        style={{ padding: 10, borderRadius: 5, marginTop: 10 , flexDirection:"row" , backgroundColor:'#007BFF' , justifyContent:"center" }}><Text style={{color:"#ffffff" , textAlign:"center"}}>View Detals</Text></TouchableOpacity>
                </View>
            )}
        />

    </View>
}

const styles = StyleSheet.create({
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