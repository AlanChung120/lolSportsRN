import { FlatList, SafeAreaView, Text, View, Image, Pressable, Platform } from 'react-native'
import { fetchMatches } from '../api/match'
import { IconButton } from 'react-native-paper'
import { useQuery } from 'react-query'
import { useCallback, useState, useRef } from 'react'
import { League } from 'interfaces/League'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { worlds } from '../const'
import DateTimePicker from '@react-native-community/datetimepicker'
import { getCalendars, getLocales } from 'expo-localization'
import { styles, matchStyles } from '../styles/common'
import { listSeperator, noMatches } from '../components/common'

export default function Matches({ navigation }: any) {
  const deviceTimeZone = useRef(getCalendars()[0].timeZone)
  const deviceLanguage = useRef(getLocales()[0].languageTag)
  const [dateAt, setDateAt] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))
  const [showCalendar, setShowCalendar] = useState(false)
  const [followingsCode, setFollowingsCode] = useState(worlds.code)
  const [hideScore, setHideScore] = useState(true)
  const { data: matchesData, isLoading: matchesLoad, error: matchesError, refetch: matchesRefetch } = useQuery(['matches', followingsCode, dateAt], () => fetchMatches(followingsCode, dateAt))

  async function getSettings() {
    try {
      const hideScoreJson = await AsyncStorage.getItem('hideScore')
      const followingsJson = await AsyncStorage.getItem('followings')
      if (followingsJson !== null) {
        const followingsParsed = JSON.parse(followingsJson)
        let newCode = worlds.code
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

  function onChangeDate(_: any, selectedDate: any) {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    if (Platform.OS === "android") {
      setShowCalendar(false)
    }
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
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View>
            {Platform.OS === "ios" ?
              <DateTimePicker value={dateAt} is24Hour={true} onChange={onChangeDate} /> :
              <View>
                <Pressable style={matchStyles.showDate} onPress={() => setShowCalendar(true)}>
                  <Text style={matchStyles.dateText}>{dateAt.toDateString()}</Text>
                </Pressable>
                {showCalendar && <DateTimePicker value={dateAt} is24Hour={true} onChange={onChangeDate} />}
              </View>
            }
          </View>
        ),
        headerRight: () => (
          <IconButton
            icon="arrow-right"
            color="black"
            onPress={forwardPressed}
          />
        ),
      })
    }, [dateAt, showCalendar])
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
      <View style={matchStyles.listItem}>

        <View style={matchStyles.block}>
          <Image
            style={matchStyles.teamImage}
            source={{ uri: item.opponents[0].opponent.image_url }}
            resizeMode="contain"
          />
          <Text style={styles.generalText}>{item.opponents[0].opponent.name}</Text>

        </View>

        <View style={matchStyles.block}>
          <Text style={styles.generalText}>{item.league.name}</Text>
          <Text style={styles.generalText}>Best of {item.number_of_games}</Text>
          {item.videogame_version ?
            <Text style={styles.generalText}>Patch: {item.videogame_version.name}</Text> :
            <Text style={styles.generalText}>Patch: N.A.</Text>}
          {!hideScore && item.status === "finished" ?
            <Text style={styles.generalText}>{item.results[0].score} - {item.results[1].score}</Text> :
            <Text style={styles.generalText}>{new Date(item.scheduled_at).toLocaleString(deviceLanguage.current, { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: deviceTimeZone.current! })}</Text>}
        </View>

        <View style={matchStyles.block}>
          <Image
            style={matchStyles.teamImage}
            source={{ uri: item.opponents[1].opponent.image_url }}
            resizeMode="contain"
          />
          <Text style={styles.generalText}>{item.opponents[1].opponent.name}</Text>
        </View>

      </View>
    )
  }

  //console.log(matchesData)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Text>{followingsCode}</Text> */}
      <FlatList
        style={{ flex: 1 }}
        data={matchesData}
        renderItem={renderMatch}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={listSeperator}
        ListEmptyComponent={noMatches}
        onRefresh={matchesRefetch}
        refreshing={false}
      />
    </SafeAreaView>
  )
}
