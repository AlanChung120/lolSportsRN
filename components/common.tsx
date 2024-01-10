import { Divider } from "@rneui/themed"
import { Text } from "react-native"

export function listSeperator() {
  return <Divider width={3}/>
}

export function noMatches() {
  return <Text>No Matches Scheduled</Text>
}

export function noStandings() {
  return <Text>Not Available</Text>
}