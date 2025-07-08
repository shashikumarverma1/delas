import { createStackNavigator } from '@react-navigation/stack';
import { TaskScreen } from '../Screens/taskScreen';
import { Dashbord, Home } from '../Screens/Dashbord';
import { TaskDetails } from '../Screens/taskDetails';


const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ animationEnabled: false, headerShown: false }}>
        <Stack.Screen name="Dashbord" component={Dashbord} />
         <Stack.Screen name="TaskScreen" component={TaskScreen} />
       <Stack.Screen name="TaskDetails" component={TaskDetails} />    
    </Stack.Navigator>
  );
}
export default HomeStack;