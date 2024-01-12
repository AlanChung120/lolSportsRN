import {  Text, View, Switch, SafeAreaView, Pressable } from 'react-native'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles, settingsStyles } from '../../styles/common'

export default function Settings({navigation}: any) {
  const [hideScore, setHideScore] = useState(false)
  setSettings()

  async function getSettings() {
    try {
      const hideScoreJson = await AsyncStorage.getItem('hideScore')
      if (hideScoreJson === null) {
        setSettings()
      } else {
        const hideScoreparsed = JSON.parse(hideScoreJson)
        setHideScore(hideScoreparsed)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function resetSettings() {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      console.log(e)
    }
  }

  async function setSettings() {
    try {
      AsyncStorage.setItem('hideScore', String(hideScore))
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
          <Pressable style={settingsStyles.followingButton} onPress={() => navigation.navigate("Followings")} accessibilityLabel="View/Set Following Leagues">
            <Text style={settingsStyles.settingsLeftText}>Followings</Text>
          </Pressable>
        </View>
        <View style={settingsStyles.listItem}>
          <Pressable style={settingsStyles.resetButton} onPress={resetSettings} accessibilityLabel="Reset setting">
            <Text style={settingsStyles.resetText}>Reset Settings</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}