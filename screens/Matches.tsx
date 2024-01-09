import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native'
import { fetchMatches } from '../api/match'
import { IconButton } from 'react-native-paper'
import { useQuery } from 'react-query'
import { useCallback, useState, useRef } from 'react'
import { League } from 'interfaces/League'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { worldsCode } from '../const'
import DateTimePicker from '@react-native-community/datetimepicker'
import { getCalendars, getLocales } from 'expo-localization'

// arrow-right, iconButton react native paper

export default function Matches({navigation}: any) {
  const deviceTimeZone = useRef(getCalendars()[0].timeZone)
  const deviceLanguage = useRef(getLocales()[0].languageTag)
  const [dateAt, setDateAt] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
  const [followingsCode, setFollowingsCode] = useState(worldsCode)
  const [hideScore, setHideScore] = useState(false)
  const { data: matchesData, isLoading: matchesLoad, error: matchesError } = useQuery(['matches', followingsCode, dateAt], () => fetchMatches(followingsCode, dateAt))

  async function getSettings() {
    try {
      const hideScoreJson = await AsyncStorage.getItem('hideScore')
      const followingsJson = await AsyncStorage.getItem('followings')
      if (followingsJson !== null) {
        const followingsParsed = JSON.parse(followingsJson)
        let newCode = worldsCode
        followingsParsed.map((league: League) => {
          if (league.following) {
            newCode += "," + league.code
          }
        })
        setFollowingsCode(newCode)
      }
      if (hideScoreJson !== null) {
        const hideScoreParsed = JSON.parse(hideScoreJson) as boolean 
        setHideScore(hideScoreParsed)
      }
    } catch (e) {
      console.log(e)
    }
  }

  function forwardPressed() {
    let nextDay = new Date(dateAt)
    nextDay.setDate(dateAt.getDate() + 1)
    setDateAt(nextDay)
  }

  function backwardPressed() {
    let prevDay = new Date(dateAt)
    prevDay.setDate(dateAt.getDate() - 1)
    setDateAt(prevDay)
  }


  function onChangeDate(_ : any, selectedDate : any) {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    setDateAt(newDate)
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
          <DateTimePicker
            value={dateAt}
            is24Hour={true}
            onChange={onChangeDate}
          />
        ),
        headerRight:() => (
          <IconButton
            icon="arrow-right"
            color="black"
            onPress={forwardPressed}
          />
        ),
      })
    }, [dateAt])
  )

  useFocusEffect(
    
    useCallback(() => {
      getSettings()
    }, [])
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
          {!hideScore && item.status === "finished" ? <Text>Results: {item.results[0].score} - {item.results[1].score}</Text> : <Text>Date: {new Date(item.scheduled_at).toLocaleString(deviceLanguage.current, { timeZone: deviceTimeZone.current! })}</Text>}
        </View>
        <View>
          {item.videogame_version ? <Text>Patch: {item.videogame_version.name}</Text> : <Text>Patch: N.A.</Text>}
        </View>
      </View>
    )
  }

  //console.log(matchesData)
  return (
    <SafeAreaView>
      {/* <Text>{followingsCode}</Text> */}
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
