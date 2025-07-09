import React, { useCallback, useEffect, useMemo, useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Pressable } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import useFormStore from "../store/useFormStore";
import { CustomHeader } from "../components/customHeader";
import { CommonActions, useRoute } from "@react-navigation/core";
import moment = require("moment");

export const TaskScreen = ({ navigation }) => {
    const route = useRoute()
    const { item } = route.params || {};
    const { addData, dataList, editData } = useFormStore();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [title, setTitle] = useState(item?.title || '');
    const [index, setIndex] = useState(null);
    const [description, setDescription] = useState(item?.description || '');
    const [priority, setPriority] = useState(item?.priority || 'Low');
    const [dueDate, setDueDate] = useState(item?.dueDate || '');
    const [titleError, setTitleError] = useState('');
    const [dueDateError, setDueDateError] = useState('');
    const priorities = [
        { label: 'Low', value: 'low', color: '#4CAF50' },       // green
        { label: 'Medium', value: 'medium', color: '#FFC107' }, // yellow
        { label: 'High', value: 'high', color: '#F44336' },     // red
    ];
    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDueDate(selectedDate);
        }
    };
    useEffect(() => {
        if (item) {
            let index = dataList.findIndex((el) => el === item);
            setIndex(index);
        }
    }, []);

    const onPressAdd = useCallback(() => {

        if (!title) {
            setTitleError('Title is required');
            return;
        }
        if (!dueDate) {
            setDueDateError('Due date is required');
            return;
        }


        const taskData = {
            title, description, priority, dueDate: dueDate, isCompleted: dataList?.length % 2 === 0
        }
        
        // return
        if (item) {
            editData(index, taskData);

        } else {
            addData(taskData);
        }
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Dashbord' }], // or 'Login', 'Dashboard', etc.
            })
        );

    }, [dueDate, titleError, dueDateError, title, description, priority]);

    const onChangeTitle = useCallback((text) => {
        setTitleError('');
        setTitle(text);
    }, [setTitle, title]);
    const onChangeDescription = useCallback((text) => {

        setDescription(text);
    }, [setDescription, description]);

    const handelSelectPriority = useCallback((value: string) => {
        setPriority(value);
    }, [setPriority, priority]);

    const memoizedTitleError = useMemo(() => {
        return titleError ? (
            <Text style={styles.err}>{titleError}</Text>
        ) : null;
    }, [titleError]);

    const memoizedDueDateError = useMemo(() => {
        return dueDateError ? (
            <Text style={styles.err}>{dueDateError}</Text>
        ) : null;
    }, [dueDateError]);

    const onPessBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);
    
    return <>
        <CustomHeader navigation={navigation} leftLeble="< back" rightLeble="" onPessBack={onPessBack} onPressRight={undefined} />
        <View style={styles.container}>

            <Text style={styles.title}>Title</Text>

            <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}

                placeholder="Please enter a title"
            />
            {memoizedTitleError}
            <Text style={styles.title} >Description</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                onChangeText={onChangeDescription}
                value={description}
                multiline={true}
                placeholder="please enter a description"
            />
            <Text style={styles.title}>Due Date</Text>
            <Pressable
                style={styles.input}
                onPress={() => {
                    setDueDateError('');
                    setShowDatePicker(!showDatePicker)
                }}>
                <TextInput
                    value={dueDate ? moment(dueDate).format('DD MMMM YYYY')
                        : dueDate ? moment(item?.dueDate).format('DD MMMM YYYY') : ''}

                    editable={false}
                    placeholder="Please select a date"
                />

            </Pressable>
            {memoizedDueDateError}
            {showDatePicker && (
                <DateTimePicker
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={handleDateChange}
                    value={dueDate ? new Date(dueDate) : new Date()}
                />
            )}
            <Text style={styles.title}>Priority</Text>

            <View style={styles.priorityContainer}>
                {priorities.map((element, index: number) => {
                    const textStyle = useMemo(() => (
                        element.label === priority
                            ? styles.selectedPriority
                            : styles.notSelectedPriority
                    ), [priority]);

                    return <TouchableOpacity
                        onPress={() => handelSelectPriority(element.label)}
                        key={index}><Text style={[textStyle]}>{element.label}</Text></TouchableOpacity>
                })}
            </View>
            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => onPressAdd()}
            >
                <Text style={styles.add}>{
                    item ? "Edit Task" : "Add Task"
                }</Text>
            </TouchableOpacity>
        </View>
    </>


}

const styles = StyleSheet.create({
    textArea:{
    height: 100 
    },
    selectedPriority: {
        backgroundColor: "#000000",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        color: "#fff",
        fontWeight: "bold",

    },
    notSelectedPriority: {
        backgroundColor: "grey",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        color: "#fff",
        fontWeight: "bold",

    },
    err: {
        color: "red",
        fontSize: 15,
        // marginTop: 5,
        marginBottom: 10,
        fontWeight: "400"
    },
    addButtonContainer:
    {
        backgroundColor: "#000000",
        height: 55,
        //   width: windowWidth / 1.05,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 10

    },
    add: {
        color: "#ffff",
        fontWeight: "800"
    },
    priorityContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,

    },
    container: {
        padding: 20,
        // marginTop:50
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: "#666666",
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    tab: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 12,
        color: '#555',
    },
    title: {
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 20,
        color: "#000000",
        marginTop: 5,
    }
});
