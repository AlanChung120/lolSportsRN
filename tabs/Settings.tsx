import { FlatList, StyleSheet, Text, View, Switch, SafeAreaView } from 'react-native'
import { leagues } from '../const'
import { useSelector, useDispatch } from 'react-redux'

export default function Settings() {
  const hideScore = useSelector((state: any) => state.hideScore)
  const followings = useSelector((state: any) => state.followings)
  const dispatch = useDispatch()

  function handleFollow(changedTo: boolean, leagueName: string) {
    if (changedTo) {
      dispatch({ type: 'A'+leagueName })
    } else {
      dispatch({ type: 'R'+leagueName })
    }
  }

  function handleHideScore() {
    dispatch({ type: 'H' })
  }

  const renderFollows = ({item}: any) => {
    return (
      <View>
        <Text>{item[0]}</Text>
        <Switch
          trackColor={{false: '#E9EFE5', true: '#70E024'}}
          thumbColor='white'
          onValueChange={(value : any) => handleFollow(value, item[0])}
          value={followings.includes(item[0])}
        />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Hide Score</Text>
        <Switch
          trackColor={{false: '#E9EFE5', true: '#70E024'}}
          thumbColor='white'
          onValueChange={handleHideScore}
          value={hideScore}
        />
      </View>
      <View>
        <Text>Following</Text>
        <FlatList
          data={leagues}
          renderItem={renderFollows}
          keyExtractor={(item) => String(item[0])}
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