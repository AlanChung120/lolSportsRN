import { FlatList, SafeAreaView, Text, View, Image, Platform } from 'react-native'
import { fetchStandings } from '../api/standing'
import { useQuery } from 'react-query'
import { useCallback, useState } from 'react'
import { League } from 'interfaces/League'
import { initFollowings, textFontSize } from '../const'
import { useFocusEffect } from '@react-navigation/native'
import { listSeperator, noStandings } from '../components/common'
import { styles, standingsStyles, pickerSelectStyles } from '../styles/common'
import SelectDropdown from 'react-native-select-dropdown'

export default function Standings({ navigation }: any) {
  const standingsLeagues = initFollowings.filter((league: League) => league.standing)
  const [currentLeague, setCurrentLeague] = useState("-1")
  const { data: standingsData, isLoading: standingsLoad, error: standingsError, refetch: standingsRefetch } = useQuery(['standings', currentLeague], () => fetchStandings(currentLeague))

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitleAlign: 'center',
        headerTitle: () => (
          <SelectDropdown
            data={standingsLeagues}
            search={true}
            searchPlaceHolder="Search League"
            defaultButtonText="Select League"
            onSelect={(selectedItem: League) => {
              setCurrentLeague(selectedItem.code)
            }}
            buttonTextAfterSelection={(selectedItem: League) => {
              return selectedItem.name
            }}
            rowTextForSelection={(item: League) => {
              return item.name
            }}
            selectedRowStyle={{ backgroundColor: "#CACACA" }}
            rowStyle={{ backgroundColor: "#E7E7E7" }}
            buttonStyle={Platform.OS === "ios" ? pickerSelectStyles.iosPicker : pickerSelectStyles.androidPicker}
            buttonTextStyle={Platform.OS === "ios" ? { fontSize: textFontSize * 1.5 } : { fontSize: textFontSize * 1.5, color: 'white' }}
          />
        )
      })
    }, [])
  )

  if (standingsLoad || standingsError) {
    return
  }

  const renderStanding = ({ item }: any) => {
    return (
      <View style={standingsStyles.listItem}>
        <View style={standingsStyles.rankingBlock}>
          <Text style={styles.largerLeftText}>{item.rank}.</Text>
        </View>
        <View style={standingsStyles.imageBlock}>
          <Image
            style={standingsStyles.teamImage}
            source={{ uri: item.team.image_url }}
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