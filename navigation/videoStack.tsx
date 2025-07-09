import { createStackNavigator } from '@react-navigation/stack';
import { TaskScreen } from '../Screens/taskScreen';
import { Dashbord, Home } from '../Screens/Dashbord';
import { TaskDetails } from '../Screens/taskDetails';
import { Videos } from '../Screens/videos';
import OfflineVideoScreen from '../Screens/offLineVideoList';


const Stack = createStackNavigator();

function VideoStack() {
  return (
    <Stack.Navigator screenOptions={{ animationEnabled: false, headerShown: false }}>
        <Stack.Screen name="Videos" component={Videos} />
      <Stack.Screen name="OfflineVideoScreen" component={OfflineVideoScreen} />
    </Stack.Navigator>
  );
}
export default VideoStack;