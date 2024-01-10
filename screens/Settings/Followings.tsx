import { FlatList, Text, View, SafeAreaView } from 'react-native'
import { IconButton } from 'react-native-paper'
import { League } from 'interfaces/League'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initFollowings } from '../../const'
import { styles } from '../../styles/common'
import { listSeperator } from '../../components/common'

export default function Followings() {
  const [followings, setFollowings] = useState<League[]>(initFollowings)

  async function getSettings() {
    try {
      const followingsJson = await AsyncStorage.getItem('followings')
      if (followingsJson === null) {
        setSettings()
      } else {
        const follwingsParsed = JSON.parse(followingsJson)
        setFollowings(follwingsParsed)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function setSettings() {
    try {
      AsyncStorage.setItem('followings', JSON.stringify(followings))
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSettings()

      // return () => {
      // }
    }, [])
  )


  function handleHeartClick(leagueIndex: number) {
    let changedArray = [...followings]
    changedArray[leagueIndex].following = !followings[leagueIndex].following
    setFollowings(changedArray)
    setSettings()
  }

  const renderFollows = ({ item, index }: any) => {
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
        <View>
          <IconButton
            icon={item.following ? "heart": "heart-outline"}
            color={item.following ? "red": "black"}
            onPress={() => handleHeartClick(index)}
          />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={followings}
          renderItem={renderFollows}
          keyExtractor={(item) => String(item.name)}
          ItemSeparatorComponent={listSeperator}
        />
      </View>
    </SafeAreaView>
  )
}