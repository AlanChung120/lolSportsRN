import { Divider } from "@rneui/themed"
import { Text } from "react-native"
import { styles } from "../styles/common"

export function listSeperator() {
  return <Divider width={3}/>
}

export function noMatches() {
  return <Text style={styles.notAvailableText}>No Matches Scheduled</Text>
}

export function noStandings() {
  return <Text style={styles.notAvailableText}>No Data Yet</Text>
}