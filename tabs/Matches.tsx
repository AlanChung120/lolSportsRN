import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { fetchMatches } from '../api/match'
import { useQuery } from 'react-query'
import { useCallback, useRef, useState } from 'react'
import { League } from 'interfaces/League'
import { getSettings } from '../api/settings'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import settings from '../initial.json'

export default function Matches() {
  const firstTime = useRef(true)
  const [followings, setFollowings] = useState<League[]>([])
  const [hideScore, setHideScore] = useState(false)
  const { data: matchesData, isLoading: matchesLoad, error: matchesError, refetch: matchesRefetch } = useQuery(['matches', followings], () => fetchMatches())

  async function getSettings() { //only get the setting you need
    try {
      const settingJson = await AsyncStorage.getItem('setting')
      console.log(settingJson)
      if (settingJson === null) {
        setFollowings(settings.followings) // just default value (worlds and msi must be true)
        setHideScore(settings.hideScore) // just default value
      } else {
        const parsed = JSON.parse(settingJson)
        setFollowings(parsed.followings)
        setHideScore(parsed.hideScore)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSettings()
      if (firstTime.current) {
        firstTime.current = false
        return
      }
      matchesRefetch()
    }, [matchesRefetch])
  )


  if (matchesLoad || matchesError) {
    return
  }

  const renderMatch = ({ item }: any) => {
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

  //console.log(matchesData)
  return (
    <SafeAreaView>
      {followings.map((league: any) => league.following ? <Text key={league.name}>{league.name}</Text> : <Text></Text> )}
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
})
