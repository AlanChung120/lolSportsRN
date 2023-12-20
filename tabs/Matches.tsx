import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { fetchMatches } from '../api/match'
import { useQuery } from 'react-query'

export default function Matches() {
  const { data: matchesData, isLoading: matchesLoad, error: matchesError } = useQuery('matches', () => fetchMatches())

  if (matchesLoad || matchesError) {
    return
  }

  const renderMatch = ({item}: any) => {
    return (
      <View>
        <View>
          <Text>Teams: {item.opponents[0].opponent.name} vs {item.opponents[1].opponent.name}</Text>
        </View>
        <View>
          <Text>images: {item.opponents[0].opponent.image_url} vs {item.opponents[1].opponent.image_url}</Text>
        </View>
        <View>
          <Text>league: {item.league.name}</Text>
        </View>
        <View>
          <Text>Bo{item.number_of_games}</Text>
        </View>
        <View>
          <Text>Date: {item.scheduled_at}</Text>
        </View>
        <View>
          <Text>Results: {item.results[0].score} - {item.results[1].score}</Text>
        </View>
        <View>
          <Text>Patch: {item.videogame_version.name}</Text>
        </View>
      </View>
    )
  }

  console.log(matchesData)
  return (
    <SafeAreaView>
      <FlatList
        data={matchesData}
        renderItem={renderMatch}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  )
}

// style here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});
