import { FlatList, SafeAreaView, Text, View, StyleSheet, Button } from 'react-native'
import { fetchMatches } from '../api/match'
import { IconButton } from 'react-native-paper'
import { useQuery } from 'react-query'
import { useCallback, useState } from 'react'
import { League } from 'interfaces/League'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { worldsCode } from '../const'
import DateTimePicker from '@react-native-community/datetimepicker'

// arrow-right, iconButton react native paper

export default function Matches({navigation}: any) {
  const [dateAt, setDateAt] = useState(new Date().toDateString())
  const [showSelector, setShowSelector] = useState(false)
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
    const currentDate = new Date(dateAt)
    let nextDay = currentDate
    nextDay.setDate(currentDate.getDate() + 1)
    setDateAt(nextDay.toDateString())
  }

  function backwardPressed() {
    const currentDate = new Date(dateAt)
    let prevDay = currentDate
    prevDay.setDate(currentDate.getDate() - 1)
    setDateAt(prevDay.toDateString())
  }


  function onChangeDate(_ : any, selectedDate : any) {
    const newDateString = selectedDate!.toDateString()
    setShowSelector(false)
    setDateAt(newDateString)
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
            <Button onPress={() => {setShowSelector(true)}} title={dateAt} />
            {showSelector && (
              <DateTimePicker
                value={new Date(dateAt)}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}
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
          {!hideScore && item.status === "finished" ? <Text>Results: {item.results[0].score} - {item.results[1].score}</Text> : <Text>Date: {item.scheduled_at}</Text>}
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
