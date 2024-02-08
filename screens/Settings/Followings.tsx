import { Platform, FlatList, Text, View, SafeAreaView } from 'react-native'
import { IconButton } from 'react-native-paper'
import { League } from 'interfaces/League'
import { useState, useCallback, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initFollowings } from '../../const'
import { styles, followingsStyles } from '../../styles/common'
import { listSeperator } from '../../components/common'
import { SearchBar } from '@rneui/themed'

export default function Followings() {
  const followings = useRef<League[]>([])
  const [searchedFollowings, setSearchedFollowings] = useState<League[]>([])
  const [searchContent, setSearchContent] = useState("")

  async function getSettings() {
    try {
      const followingsJson = await AsyncStorage.getItem('followings')
      if (followingsJson === null) {
        followings.current = JSON.parse(JSON.stringify(initFollowings))
        setSearchedFollowings(followings.current)
        setSettings()
      } else {
        followings.current = JSON.parse(followingsJson)
        setSearchedFollowings(followings.current)
      }
    } catch (e) {
      console.error(e)
    }
  }

  function searchHandler(search: string) {
    setSearchContent(search)
    search = search.toLowerCase()
    if (search === "") {
      setSearchedFollowings(followings.current)
    } else {
      const filteredFollowings = followings.current.filter((league: League) => league.name.toLowerCase().includes(search))
      setSearchedFollowings(filteredFollowings)
    }
  }

  async function setSettings() {
    try {
      AsyncStorage.setItem('followings', JSON.stringify(followings.current))
    } catch (e) {
      console.error(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSettings()
      setSearchContent("")
    }, [])
  )


  function handleHeartClick(leagueIndex: number) {
    let changedArray = [...searchedFollowings]
    changedArray[leagueIndex].following = !changedArray[leagueIndex].following
    setSearchedFollowings(changedArray)
    setSettings()
  }

  const renderFollows = ({ item, index }: any) => {
    return (
      <View style={followingsStyles.listItem}>
        <View style={followingsStyles.nameBlock}>
          <Text style={styles.largerLeftText}>{item.name}</Text>
        </View>
        <View style={followingsStyles.buttonBlock}>
          <IconButton
            icon={item.following ? "heart" : "heart-outline"}
            color={item.following ? "red" : "black"}
            onPress={() => handleHeartClick(index)}
          />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <SearchBar
          platform={Platform.OS === "ios" ? "ios" : "android"}
          placeholder="Type League Name..."
          onChangeText={(value: string) => searchHandler(value)}
          value={searchContent}
        />
        <FlatList
          data={searchedFollowings}
          renderItem={renderFollows}
          keyExtractor={(item) => String(item.name)}
          ItemSeparatorComponent={listSeperator}
        />
      </View>
    </SafeAreaView>
  )
}