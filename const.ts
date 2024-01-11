import { League } from "./interfaces/League"
import { Dimensions } from 'react-native'

export const worldsCode = "297" // worlds followed by default
export const screenWidth = Dimensions.get('screen').width
export const screenHeight = Dimensions.get('screen').height
export const textFontSize = 15

export const initFollowings: League[] = [
  { name: "LCK", code: "293", following: false, standing: true },
  { name: "LPL", code: "294", following: false, standing: true },
  { name: "LEC", code: "4197", following: false, standing: true },
  { name: "LCS", code: "4198", following: false, standing: true },
  { name: "MSI", code: "300", following: false, standing: false },
  { name: "Emea Masters", code: "4996", following: false, standing: false },
  { name: "PCS", code: "4288", following: false, standing: true },
  { name: "CBLOL", code: "302", following: false, standing: true },
  { name: "VCS", code: "4141", following: false, standing: true },
  { name: "TCL", code: "1003", following: false, standing: true },
  { name: "LLA", code: "4199", following: false, standing: true },
  { name: "LDL", code: "4226", following: false, standing: true },
  { name: "LJL", code: "2092", following: false, standing: true },
  { name: "LFL", code: "4292", following: false, standing: true },
  { name: "LCO", code: "4539", following: false, standing: true },
  { name: "LCK CL", code: "4553", following: false, standing: true },
  { name: "All Star", code: "296", following: false, standing: false },
  { name: "Asian Games", code: "5012", following: false, standing: false },
  { name: "Demacia Cup", code: "4140", following: false, standing: false },
  { name: "NACL", code: "4961", following: false, standing: true },
  { name: "LCS Academy", code: "4228", following: false, standing: true }
]