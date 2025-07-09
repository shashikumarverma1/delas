import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import useFormStore from "../store/useFormStore";
import React, { useEffect } from "react";
import { CustomHeader } from "../components/customHeader";
import moment = require("moment");
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Dashbord = ({ navigation }) => {
    const { dataList, toggleCompleted} = useFormStore();
    const [filterValue, setFilterValue] = React.useState('All');
    const handleFilterChange = React.useCallback((value) => { setFilterValue(value) }, [setFilterValue, filterValue]);

   
    const filteredData = React.useMemo(() => {
  let filtered = [...dataList];

  // Filter by status
  if (filterValue === 'Completed') {
    filtered = filtered.filter(item => item.isCompleted);
  } else if (filterValue === 'Incomplete') {
    filtered = filtered.filter(item => !item.isCompleted);
  }

  // Sort by dueDate or priority
  if (filterValue === 'date') {
    filtered.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return dateA - dateB;
    });
  } else if (filterValue === 'priority') {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  return filtered;
}, [dataList, filterValue, ]);


    const onPressRight = React.useCallback(() => navigation.navigate("TaskScreen"), [navigation]);


    return <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <CustomHeader navigation={navigation} leftLeble={"Dashbord"} rightLeble={"+ Add Task"} onPressRight={onPressRight} />
        <Text style={styles.sortBy}>Sort by</Text>
        <View style={styles.buttonContainer}>
          
            {['All', 'Completed', 'Incomplete' , "date" , "priority"].map((el, index) => {
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
          ListEmptyComponent={
    <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray', fontSize: 16 }}>
      No tasks found.
    </Text>}
            style={styles.flateList}
            contentContainerStyle={styles.flateListContainer}
            data={filteredData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
                <View key={index} style={styles.renderItemContainer}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <TouchableOpacity onPress={()=>toggleCompleted(index)} style={styles.status}><Text style={styles.description}>status: {item?.isCompleted ? "Completed" : "Incomplete"}</Text></TouchableOpacity>
                    
                    <Text style={styles.description}>Priority: {item?.priority}</Text>
                    <Text style={styles.description}>Due Date: {moment(item?.dueDate).format('DD MMMM YYYY')}</Text>
                    {item?.description && <Text style={styles.description}>Description: {item?.description}</Text>}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("TaskDetails", { item })}
                        style={styles.viewDetailsContainer}><Text style={styles.viewDetailsLeble}>View Detals</Text></TouchableOpacity>
                </View>
            )}
        />

    </View>
}

const styles = StyleSheet.create({
    sortBy:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#000000",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    status:{
        backgroundColor: '#dfefef',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        color: "#fff",
        textAlign: "center"
    },
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
        paddingHorizontal: 20,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
          flexWrap: 'wrap',
        textAlign: 'center',
        // flexDirection: 'row',
        alignContent: 'center',
        alignSelf: 'center',
        
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
        marginTop:5
      
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
    }, 
    description:{
        fontSize:14,
        fontWeight:"400", 
        color:"#000000",
        // marginTop: 5,
    }
});