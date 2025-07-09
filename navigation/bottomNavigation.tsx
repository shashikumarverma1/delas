import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Forms } from "../screens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Home } from "../Screens/Dashbord";
import { Details } from "../Screens/taskDetails";
import HomeStack from "./homeStack";
import { Videos } from "../Screens/videos";
import VideoStack from "./videoStack";

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
             if (route.name === "Videos") {
            iconName = focused ? "play" : "play-outline";
          } 
        // <ion-icon name="arrow-dropright-circle"></ion-icon>
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#272735",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Videos" component={VideoStack} />
    
    </Tab.Navigator>
  );
}
export default BottomTabs;