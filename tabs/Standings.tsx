import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { fetchStandings } from '../api/standing'
import { useQuery } from 'react-query'

export default function Standings() {
  const { data: standingsData, isLoading: standingsLoad, error: standingsError } = useQuery('standings', () => fetchStandings())

  if (standingsLoad || standingsError) {
    return
  }

  const renderStanding = ({item}: any) => {
    return (
      <View>
        <View>
          <Text>Ranking: {item.rank}</Text>
        </View>
        <View>
          <Text>image: {item.team.image_url}</Text>
        </View>
        <View>
          <Text>name: {item.team.name}</Text>
        </View>
        <View>
          <Text>Win: {item.wins}</Text>
        </View>
        <View>
          <Text>Losses: {item.losses}</Text>
        </View>
      </View>
    )
  }

  //console.log(standingsData)
  return (
    <SafeAreaView>
      <FlatList
        data={standingsData}
        renderItem={renderStanding}
        keyExtractor={(item) => String(item.team.id)}
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
})