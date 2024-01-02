import { createStackNavigator } from '@react-navigation/stack'
import General from './Settings/General'
import Followings from './Settings/Followings'

const Stack = createStackNavigator()

export default function Settings() {
  return (
    <Stack.Navigator initialRouteName="General">
      <Stack.Screen name="General" component={General} />
      <Stack.Screen name="Followings" component={Followings} />
    </Stack.Navigator>
  );
}