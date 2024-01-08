import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { fetchStandings } from '../api/standing'
import { useQuery } from 'react-query'
import { useCallback, useRef, useState } from 'react'
import { League } from 'interfaces/League'
import { worldsCode } from '../const'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Standings() {
  const firstTime = useRef(true)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [currentLeague, setCurrentLeague] = useState(worldsCode)
  const [followings, setFollowings] = useState<League[]>([])
  const { data: standingsData, isLoading: standingsLoad, error: standingsError, refetch: standingsRefetch } = useQuery(['standings', currentLeague], () => fetchStandings(currentLeague))


  async function getSettings() {
    try {
      const followingsJson = await AsyncStorage.getItem('followings')
      if (followingsJson !== null) {
        const followingsParsed = JSON.parse(followingsJson)
        const newFollowings = followingsParsed.filter((league: League) => league.following)
        setFollowings(newFollowings)
      }
    } catch (e) {
      console.log(e)
    }
  }

  function forwardPressed() {
    let nextIndex = 0
    if (currentIndex === followings.length - 1) {
      nextIndex = -1
    } else {
      nextIndex++
    }
    setCurrentIndex(nextIndex)
    setCurrentLeague(followings[nextIndex].code)
  }

  function backwardPressed() {
    let nextIndex = 0
    if (currentIndex === -1 && followings.length === 0) {
      nextIndex = -1
    } else if (currentIndex === -1) {
      nextIndex = followings.length - 1
    } else {
      nextIndex--
    }
    setCurrentIndex(nextIndex)
    setCurrentLeague(followings[nextIndex].code)
  }

  useFocusEffect(
    useCallback(() => {
      getSettings()
      if (firstTime.current) {
        firstTime.current = false
        return
      }
      standingsRefetch()
    }, [standingsRefetch])
  )

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
      <Text>{currentIndex === -1 ? "Worlds" : followings[currentIndex].name}</Text>
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