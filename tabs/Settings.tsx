import { FlatList, StyleSheet, Text, View, Switch, SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

export default function Settings() {
  const hideScore = useSelector((state: any) => state.hideScore)
  const followings = useSelector((state: any) => state.followings)
  const dispatch = useDispatch()

  function handleSwitch(leagueIndex?: string) {
    if (leagueIndex) {
      dispatch({ type: 'L'+leagueIndex })
    } else {
      dispatch({ type: 'H' })
    }
  }

  const renderFollows = ({item, index}: any) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Switch
          trackColor={{false: '#E9EFE5', true: '#70E024'}}
          thumbColor='white'
          onValueChange={() => handleSwitch(String(index))}
          value={item.following}
        />
      </View>
    )
  }

  return (
    <SafeAreaView>
      {/* <View>
        <Text>Hide Score</Text>
        <Switch
          trackColor={{false: '#E9EFE5', true: '#70E024'}}
          thumbColor='white'
          onValueChange={() => handleSwitch()}
          value={hideScore}
        />
      </View> */}
      <View>
        {/* <Text>Following</Text> */}
        <FlatList
          data={followings}
          renderItem={renderFollows}
          keyExtractor={(item) => String(item.name)}
        />
      </View>
    </SafeAreaView>
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