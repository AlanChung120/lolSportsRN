import { createStackNavigator } from '@react-navigation/stack'
import Matches from '../screens/Matches'

const Stack = createStackNavigator()

export default function MatchesTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Matches" component={Matches} />
    </Stack.Navigator>
  );
}