import { createStackNavigator } from '@react-navigation/stack'
import Settings from '../screens/Settings/Settings'
import Followings from '../screens/Settings/Followings'

const Stack = createStackNavigator()

export default function SettingsTab() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Followings" component={Followings} />
    </Stack.Navigator>
  );
}