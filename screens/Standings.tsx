import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { fetchStandings } from '../api/standing'
import { IconButton } from 'react-native-paper'
import { useQuery } from 'react-query'
import { useCallback, useRef, useState } from 'react'
import { League } from 'interfaces/League'
import { worldsCode } from '../const'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Standings({navigation}: any) {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [currentLeague, setCurrentLeague] = useState(worldsCode)
  const followings = useRef<League[]>([])
  const { data: standingsData, isLoading: standingsLoad, error: standingsError } = useQuery(['standings', currentLeague], () => fetchStandings(currentLeague))


  async function getSettings() {
    try {
      const followingsJson = await AsyncStorage.getItem('followings')
      if (followingsJson !== null) {
        const followingsParsed = JSON.parse(followingsJson)
        followings.current = followingsParsed.filter((league: League) => league.following)
      }
    } catch (e) {
      console.log(e)
    }
  }

  function forwardPressed() {
    let nextIndex = 0
    if (currentIndex === followings.current.length - 1) {
      nextIndex = -1
    } else {
      nextIndex = currentIndex + 1
    }
    setCurrentIndex(nextIndex)
    if (nextIndex === -1) {
      setCurrentLeague(worldsCode)
    } else {
      setCurrentLeague(followings.current[nextIndex].code)
    }
  }

  function backwardPressed() {
    let nextIndex = 0
    if (currentIndex === -1) {
      nextIndex = followings.current.length - 1
    } else {
      nextIndex = currentIndex -1
    }
    setCurrentIndex(nextIndex)
    if (nextIndex === -1) {
      setCurrentLeague(worldsCode)
    } else {
      setCurrentLeague(followings.current[nextIndex].code)
    }
  }

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            icon="arrow-left"
            color="black"
            onPress={backwardPressed}
          />
        ),
        headerTitle: () => (
          <View>
            <Text>{currentIndex === -1 || followings.current.length === 0 ? "Worlds" : followings.current[currentIndex].name}</Text>
          </View>
        ),
        headerRight:() => (
          <IconButton
            icon="arrow-right"
            color="black"
            onPress={forwardPressed}
          />
        ),
      })
    }, [currentIndex])
  )


  useFocusEffect(
    useCallback(() => {
      getSettings()
      setCurrentIndex(-1)
      setCurrentLeague(worldsCode)
    }, [])
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