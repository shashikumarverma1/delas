import { createStackNavigator } from '@react-navigation/stack';
import { TaskScreen } from '../Screens/taskScreen';
import { Dashbord,  } from '../Screens/Dashbord';
import { TaskDetails } from '../Screens/taskDetails';


interface Item {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    priority: string;
    isCompleted: boolean;
  }  
  
 type HomeStackParamList = {
  Dashbord: undefined;
  TaskScreen: undefined;
  TaskDetails: { item: Item }; 
};


const Stack = createStackNavigator<HomeStackParamList>();

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