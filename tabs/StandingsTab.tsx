import { createStackNavigator } from '@react-navigation/stack'
import Standings from '../screens/Standings'

const Stack = createStackNavigator()

export default function StandingsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Standings" component={Standings} />
    </Stack.Navigator>
  );
}