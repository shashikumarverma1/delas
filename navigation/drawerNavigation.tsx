// import { useContext } from "react";
// // import { GlobalInfo } from "../context/provider";
// import "react-native-gesture-handler";
// import * as React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import CustomSidebarMenu from "../components/customSideBarMenu";
// import { Dashboard, Login, Signup } from "../screens";
// import BottomTabs from "./bottomNavigation";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { GlobalInfo } from "../context/userDetails";


// const Drawer = createDrawerNavigator();

// function DraweNavigation() {
//   const {userDetails, setUserDetails } = useContext(GlobalInfo)
//   const [userData, setUserData]=React.useState({
//     email:"",
//     password:""
//   })
//   React.useEffect(()=>{
//    abc()
//   },[])
//   async function abc(){
//     let email=await AsyncStorage.getItem("email")
//     let password= await AsyncStorage.getItem("password")
//     setUserData({ ...userData , email, password})

//   }

//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         activeTintColor: "#e91e63",
//         itemStyle: { marginVertical: 5 },
//         headerShown: false,
//       }}
//       drawerContent={(props) => <CustomSidebarMenu {...props} />}
//     >
//       {/* {userDetails ? (
//         <Drawer.Screen name="BottomTabs" component={BottomTabs} />
//       ) : (
//         <Drawer.Screen name="Login" component={Login} />
//       )} */}
//     <Drawer.Screen name="BottomTabs" component={BottomTabs} />
//    {/* <Drawer.Screen name="Signup" component={Signup} /> */}
  
//     </Drawer.Navigator>
//   );
// }

// export default DraweNavigation;
