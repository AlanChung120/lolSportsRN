import { Text, View, Switch, SafeAreaView, Pressable } from 'react-native'
import { useState, useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { settingsStyles } from '../../styles/common'

export default function Settings({ navigation }: any) {
  const [hideScore, setHideScore] = useState(false)

  async function getSettings() {
    try {
      const hideScoreJson = await AsyncStorage.getItem('hideScore')
      if (hideScoreJson === null) {
        setHideScore(false)
      } else {
        const hideScoreparsed = JSON.parse(hideScoreJson)
        setHideScore(hideScoreparsed)
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function resetSettings() {
    try {
      setHideScore(false)
      await AsyncStorage.clear()
    } catch (e) {
      console.error(e)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSettings()
    }, [])
  )

  useEffect(() => {
    try {
      AsyncStorage.setItem('hideScore', String(hideScore))
    } catch (e) {
      console.error(e)
    }
  }, [hideScore])

  return (
    <SafeAreaView>
      <View style={settingsStyles.settingsList}>
        <View style={settingsStyles.listItem}>
          <View style={settingsStyles.nameBlock}>
            <Text style={settingsStyles.settingsLeftText}>Hide Score</Text>
          </View>
          <View style={settingsStyles.switchBlock}>
            <Switch
              trackColor={{ false: '#E9EFE5', true: '#70E024' }}
              thumbColor='white'
              onValueChange={() => setHideScore(!hideScore)}
              value={hideScore}
            />
          </View>
        </View>
        <View style={settingsStyles.listItem}>
          <Pressable style={({ pressed }: any) => [
            {
              backgroundColor: pressed ? '#A7A7A7' : '#E5E5E5',
            },
            settingsStyles.followingButton]} onPress={() => navigation.navigate("Followings")} accessibilityLabel="View/Set Following Leagues">
            <Text style={settingsStyles.settingsLeftText}>Followings</Text>
          </Pressable>
        </View>
        <View style={settingsStyles.listItem}>
          <Pressable style={({ pressed }: any) => [
            {
              backgroundColor: pressed ? '#A7A7A7' : '#E5E5E5',
            },
            settingsStyles.resetButton]} onPress={resetSettings} accessibilityLabel="Reset setting">
            <Text style={settingsStyles.resetText}>Reset Settings</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}