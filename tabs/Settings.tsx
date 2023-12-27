import { FlatList, StyleSheet, Text, View, Switch, SafeAreaView, Button } from 'react-native'
import { League } from 'interfaces/League'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import settings from '../initial.json'
import { resetSettings, getRecentCode } from '../api/settings'

export default function Settings() {
  const [followings, setFollowings] = useState<League[]>([])
  const [hideScore, setHideScore] = useState(false)

  async function getSettings() {
    try {
      const settingJson = await AsyncStorage.getItem('setting')
      console.log(settingJson)
      if (settingJson === null) {
        setFollowings(settings.followings)
        setHideScore(settings.hideScore)
      } else {
        const parsed = JSON.parse(settingJson)
        setFollowings(parsed.followings)
        setHideScore(parsed.hideScore)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function setSettings() {
    const result = {
      hideScore: hideScore,
      followings: followings
    }
    try {
      AsyncStorage.setItem('setting', JSON.stringify(result))
    } catch (e) {
      console.log(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSettings()

      return () => {
        setSettings()
      }
    }, [])
  )


  function handleSwitch(leagueIndex: number) {
    if (leagueIndex === -1) {
      setHideScore(!hideScore)
    } else {
      let changedArray = [...followings]
      changedArray[leagueIndex].following = !followings[leagueIndex].following
      setFollowings(changedArray)
    }
  }

  const renderFollows = ({ item, index }: any) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <View>
          <Button
            onPress={() => getRecentCode(item.code, index)}
            title="Update Recent Code"
            color="#841584"
            accessibilityLabel="Get recent code"
          />
        </View>
        <View>
          <Switch
              trackColor={{ false: '#E9EFE5', true: '#70E024' }}
              thumbColor='white'
              onValueChange={() => handleSwitch(index)}
              value={item.following}
            />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Hide Score</Text>
        <Switch
          trackColor={{ false: '#E9EFE5', true: '#70E024' }}
          thumbColor='white'
          onValueChange={() => handleSwitch(-1)}
          value={hideScore}
        />
      </View>
      <View>
        <Button
          onPress={resetSettings}
          title="Reset Settings"
          color="#841584"
          accessibilityLabel="Reset setting"
        />
      </View>
      <View>
        <Text>Following</Text>
        <FlatList
          data={followings}
          renderItem={renderFollows}
          keyExtractor={(item) => String(item.name)}
        />
      </View>
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