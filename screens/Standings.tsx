import { FlatList, SafeAreaView, Text, View, Image } from 'react-native'
import { fetchStandings } from '../api/standing'
import { useQuery } from 'react-query'
import { useCallback, useRef, useState } from 'react'
import { League } from 'interfaces/League'
import { textFontSize, worlds } from '../const'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { listSeperator, noStandings } from '../components/common'
import { styles, standingsStyles, pickerSelectStyles } from '../styles/common'
import RNPickerSelect from 'react-native-picker-select'

export default function Standings({navigation}: any) {
  const [currentLeague, setCurrentLeague] = useState(worlds.code)
  const followings = useRef<{ label: string, value: string }[]>([])
  const { data: standingsData, isLoading: standingsLoad, error: standingsError, refetch: standingsRefetch } = useQuery(['standings', currentLeague], () => fetchStandings(currentLeague))


  async function getSettings() {
    try {
      const followingsJson = await AsyncStorage.getItem('followings')
      if (followingsJson !== null) {
        const followingsParsed = JSON.parse(followingsJson)
        followings.current = [{label: worlds.name, value: worlds.code}]
        followingsParsed.map(
          (league: League) => {
            if ( league.following && league.standing ) {
              followings.current.push({label: league.name, value: league.code})
            } 
          }
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSettings()
      navigation.setOptions({
        headerTitle: () => (
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{}}
            onValueChange={(newCode: string) => setCurrentLeague(newCode)}
            items={followings.current}
          />
        )
      })
    }, [followings])
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