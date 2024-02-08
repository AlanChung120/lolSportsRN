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
  showDate: {
    backgroundColor: '#06A4EE',
    alignSelf: 'center',
    padding: 10
  },
  dateText: {
    color: 'white',
    fontSize: textFontSize * 1.5,
    alignSelf: 'center'
  }
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
  iosPicker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 5,
    backgroundColor: 'white'
  },
  androidPicker: {
    backgroundColor: '#06A4EE',
    alignSelf: 'center',
    padding: 10
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