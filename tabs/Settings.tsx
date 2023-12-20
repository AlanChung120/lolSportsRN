import { FlatList, StyleSheet, Text, View } from 'react-native'

// const styles = StyleSheet.create({
// })

export default function Settings() {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>Settings</Text>
    </View>
  )
}

// style here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
})