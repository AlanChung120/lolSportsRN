import { FlatList, SafeAreaView, Text, View, Image } from 'react-native'
import { fetchStandings } from '../api/standing'
import { useQuery } from 'react-query'
import { useCallback, useRef, useState } from 'react'
import { League } from 'interfaces/League'
import { initFollowings } from '../const'
import { useFocusEffect } from '@react-navigation/native'
import { listSeperator, noStandings } from '../components/common'
import { styles, standingsStyles, pickerSelectStyles } from '../styles/common'
import RNPickerSelect from 'react-native-picker-select'

export default function Standings({navigation}: any) {
  const [currentLeague, setCurrentLeague] = useState("293")
  const followings = useRef<{ label: string, value: string }[]>([])
  const { data: standingsData, isLoading: standingsLoad, error: standingsError, refetch: standingsRefetch } = useQuery(['standings', currentLeague], () => fetchStandings(currentLeague))

  useFocusEffect(
    useCallback(() => {
      initFollowings.map(
        (league: League) => {
          if ( league.standing ) {
            followings.current.push({label: league.name, value: league.code})
          } 
        }
      )
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