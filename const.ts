import { League } from "./interfaces/League"
import { Dimensions } from 'react-native'

export const worldsCode = "297" // worlds followed by default
export const screenWidth = Dimensions.get('screen').width
export const screenHeight = Dimensions.get('screen').height
export const textFontSize = 15

export const initFollowings: League[] = [
  { name: "LCK", code: "293", following: false },
  { name: "LPL", code: "294", following: false },
  { name: "LEC", code: "4197", following: false },
  { name: "LCS", code: "4198", following: false },
  { name: "MSI", code: "300", following: false },
  { name: "Emea Masters", code: "4996", following: false },
  { name: "PCS", code: "4288", following: false },
  { name: "CBLOL", code: "302", following: false },
  { name: "VCS", code: "4141", following: false },
  { name: "TCL", code: "1003", following: false },
  { name: "LLA", code: "4199", following: false },
  { name: "LDL", code: "4226", following: false },
  { name: "LJL", code: "2092", following: false },
  { name: "LFL", code: "4292", following: false },
  { name: "LCO", code: "4539", following: false },
  { name: "LCK CL", code: "4553", following: false },
  { name: "All Star", code: "296", following: false },
  { name: "Asian Games", code: "5012", following: false },
  { name: "Demacia Cup", code: "4140", following: false },
  { name: "NACL", code: "4961", following: false },
  { name: "LCK Academy", code: "4768", following: false },
  { name: "LCS Academy", code: "4228", following: false }
]