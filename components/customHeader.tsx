import React from "react";
import { View , TouchableOpacity , StyleSheet , Text, Pressable} from "react-native"

 export const CustomHeader=({navigation , leftLeble , rightLeble , onPessBack , onPressRight})=>{
    return (
         <View style={styles.header}>
            <Pressable onPress={onPessBack}> <Text style={styles.title}>{leftLeble}</Text></Pressable>
                   
                <TouchableOpacity onPress={onPressRight}>
  <Text style={styles.title}>
                     {rightLeble}</Text>
                      </TouchableOpacity>
            </View>

    )
}

const styles = StyleSheet.create({
       title: {
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 20,
        color: "#000000",
        marginTop: 5,
    } , 
  header:{
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

})