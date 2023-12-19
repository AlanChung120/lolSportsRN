import { Text, View } from 'react-native'
import { fetchMatches } from '../api/match'

export default function Standings() {
  fetchMatches()
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Standings</Text>
    </View>
  )
}