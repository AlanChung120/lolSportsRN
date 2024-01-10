import { FlatList, SafeAreaView, Text, View, Image } from 'react-native'
import { fetchStandings } from '../api/standing'
import { IconButton } from 'react-native-paper'
import { useQuery } from 'react-query'
import { useCallback, useRef, useState } from 'react'
import { League } from 'interfaces/League'
import { textFontSize, worldsCode } from '../const'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { listSeperator, noStandings } from '../components/common'
import { styles, standingsStyles } from '../styles/common'

export default function Standings({navigation}: any) {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [currentLeague, setCurrentLeague] = useState(worldsCode)
  const followings = useRef<League[]>([])
  const { data: standingsData, isLoading: standingsLoad, error: standingsError, refetch: standingsRefetch } = useQuery(['standings', currentLeague], () => fetchStandings(currentLeague))


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
          <Text style={{fontSize: textFontSize * 1.5}}>{currentIndex === -1 || followings.current.length === 0 ? "Worlds" : followings.current[currentIndex].name}</Text>
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
      <View style={standingsStyles.listItem}>
        <View style={standingsStyles.rankingBlock}>
          <Text style={styles.largerLeftText}>{item.rank}.</Text>
        </View>
        <View style={standingsStyles.imageBlock}>
          <Image
            style={standingsStyles.teamImage}
            source={{uri: item.team.image_url}}
            resizeMode="contain"
          />
        </View>
        <View style={standingsStyles.infoBlock}>
          <Text style={styles.largerLeftText}>{item.team.name} {"("} {item.wins} - {item.losses} {")"}</Text>
        </View>
      </View>
    )
  }

  //console.log(standingsData)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={standingsData}
        renderItem={renderStanding}
        keyExtractor={(item) => String(item.team.id)}
        ItemSeparatorComponent={listSeperator}
        ListEmptyComponent={noStandings}
        onRefresh={standingsRefetch}
        refreshing={false}
      />
    </SafeAreaView>
  )
}