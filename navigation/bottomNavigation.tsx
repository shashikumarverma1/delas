import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Forms } from "../screens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Home } from "../Screens/home";
import { Details } from "../Screens/details";

// import RootStack from "./rootStack";
const Tab = createBottomTabNavigator();
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        initialRouteName: "Home",
        tabBarStyle: { backgroundColor: "#fff" },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } 
             if (route.name === "Home2") {
            iconName = focused ? "home" : "home-outline";
          } 
        
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#272735",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
  <Tab.Screen name="Home2" component={Details} />
    
    </Tab.Navigator>
  );
}
export default BottomTabs;