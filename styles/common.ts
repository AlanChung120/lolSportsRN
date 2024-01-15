import { StyleSheet } from "react-native"
import { screenHeight, screenWidth, textFontSize } from "../const"

export const styles = StyleSheet.create({
  generalText: {
    fontSize: textFontSize,
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center'
  },
  largerLeftText: {
    fontSize: textFontSize * 1.1,
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
  notAvailableText: {
    fontSize: textFontSize * 2,
    alignSelf: 'center',
    marginTop: 30,
    textAlign: 'center'
  }
})

export const matchStyles = StyleSheet.create({
  listItem: {
    padding: 2,
    margin: 2,
    flexDirection: 'row',
    height: 0.2 * screenHeight
  },
  block: {
    alignSelf: 'center', 
    width: '33.33%'
  },
  teamImage: {
    height: "80%",
    width: "100%"
  },
})

export const standingsStyles = StyleSheet.create({
  listItem: {
    padding: 2,
    margin: 2,
    flexDirection: 'row',
    height: 0.075 * screenHeight
  },
  rankingBlock: {
    alignSelf: 'center', 
    width: '7%'
  },
  imageBlock: {
    alignSelf: 'center', 
    width: '18%'
  },
  infoBlock: {
    alignSelf: 'center', 
    width: '75%'
  },
  teamImage: {
    height: '100%',
    width: '100%'
  },
})

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: textFontSize * 1.5,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      marginBottom: 2,
      color: 'black',
  },
  inputAndroid: {
      fontSize: textFontSize * 1.5,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      marginBottom: 2,
      color: 'black'
  }
})

export const followingsStyles = StyleSheet.create({
  listItem: {
    padding: 2,
    margin: 2,
    flexDirection: 'row',
    height: 0.05 * screenHeight
  },
  nameBlock: {
    alignSelf: 'center', 
    width: '90%'
  },
  buttonBlock: {
    alignSelf: 'center', 
    width: '10%'
  },
})

export const settingsStyles = StyleSheet.create({
  settingsList: {
    marginTop: 50,
    flexDirection: 'column',
    width: 0.8 * screenWidth,
    borderColor: 'black',
    alignSelf: 'center'
  },
  listItem: {
    padding: 2,
    margin: 2,
    flexDirection: 'row',
    borderColor: 'black',
    height: '20%'
  },
  nameBlock: {
    alignSelf: 'center', 
    justifyContent: 'center', 
    width: '80%',
    height: '100%',
    backgroundColor: '#E5E5E5'
  },
  switchBlock: {
    alignSelf: 'center',
    justifyContent: 'center', 
    width: '20%',
    height: '100%',
    backgroundColor: '#E5E5E5'
  },
  followingButton: {
    width: '100%',
    justifyContent: 'center', 
    height: '100%',
    backgroundColor: '#E5E5E5'
  },
  arrowView: {
    width: '5%',
    height: '100%'
  },
  resetButton: {
    textAlign: 'center',
    justifyContent: 'center', 
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5E5',
  },
  resetText: {
    color: 'red',
    fontSize: textFontSize * 1.1,
    textAlign: 'center'
  },
  settingsLeftText: {
    fontSize: textFontSize * 1.1,
    alignSelf: 'flex-start',
    textAlign: 'center',
    marginLeft: 10
  },
})