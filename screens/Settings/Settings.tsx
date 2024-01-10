import {  Text, View, Switch, SafeAreaView, Button } from 'react-native'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { styles } from '../../styles/common'

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
      <View>
        <Text>Hide Score</Text>
        <Switch
          trackColor={{ false: '#E9EFE5', true: '#70E024' }}
          thumbColor='white'
          onValueChange={() => setHideScore(!hideScore)}
          value={hideScore}
        />
      </View>
      <View>
        <Button
          onPress={() => navigation.navigate("Followings")}
          title="Followings"
          color="#841584"
          accessibilityLabel="View/Set Following Leagues"
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
    </SafeAreaView>
  )
}