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
    textAlign: 'center'
  },
  notAvailableText: {
    fontSize: textFontSize * 2,
    alignSelf: 'center',
    marginTop: 50,
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