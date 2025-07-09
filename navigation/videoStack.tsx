import { createStackNavigator } from '@react-navigation/stack';
import { Videos } from '../Screens/videos';
import OfflineVideoScreen from '../Screens/offLineVideoList';

export type VideoStackParamList = {
  Videos: undefined;
  OfflineVideoScreen: undefined;
};

const Stack = createStackNavigator<VideoStackParamList>();

function VideoStack() {
  return (
    <Stack.Navigator screenOptions={{ animationEnabled: false, headerShown: false }}>
        <Stack.Screen name="Videos" component={Videos} />
      <Stack.Screen name="OfflineVideoScreen" component={OfflineVideoScreen} />
    </Stack.Navigator>
  );
}
export default VideoStack;