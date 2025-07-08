import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./navigation/bottomNavigation";
import HomeStack from "./navigation/homeStack";
import React from "react";
export default function App() {
  return (
      <NavigationContainer>
    
          <HomeStack/>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
