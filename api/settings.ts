import AsyncStorage from '@react-native-async-storage/async-storage'
import settings from '../initial.json'
import { getTournamentID } from './standing'

export async function resetSettings() { //remove this or this file for that matter
  try {
    //await AsyncStorage.removeItem('setting')
    await AsyncStorage.clear()
  } catch (e) {
    console.log(e)
  }
}

export async function getSettings() {
  try {
    const settingJson = await AsyncStorage.getItem('setting')
    if (settingJson === null) {
      return settings
    } else {
      return JSON.parse(settingJson) 
    }
  } catch (e) {
    console.log(e)
  }
}


export async function getRecentCode(code: string, index: number) {
  try {
    const settingJson = await AsyncStorage.getItem('setting')
    if (settingJson === null) {
      console.log("Not Initialized")
    } else {
      const parsed = JSON.parse(settingJson)
      parsed.followings[index].recentCode = await getTournamentID(code)
      const result = {
        hideScore: parsed.hideScore,
        followings: parsed.followings
      }
      AsyncStorage.setItem('setting', JSON.stringify(result))
    }
  } catch (e) {
    console.log(e)
  }
}