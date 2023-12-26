import { QueryClient, QueryClientProvider } from 'react-query'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import store from './store'
import Matches from './tabs/Matches'
import Settings from './tabs/Settings'
import Standings from './tabs/Standings'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome, Feather } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={screenOptions} initialRouteName="Matches">

            <Tab.Screen
              name="Standings"
              component={Standings}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                      <FontAwesome name="trophy" size={24} color={focused ? "black" : "silver"} />
                      {focused ?
                        <Text style={{ fontSize: 12, color: "black" }}>Standings</Text> :
                        <Text style={{ fontSize: 12, color: "silver" }}>Standings</Text>
                      }
                    </View>
                  )
                }
              }}
            />

            <Tab.Screen
              name="Matches"
              component={Matches}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                      <Feather name="list" size={24} color={focused ? "black" : "silver"} />
                      {focused ?
                        <Text style={{ fontSize: 12, color: "black" }}>Matches</Text> :
                        <Text style={{ fontSize: 12, color: "silver" }}>Matches</Text>
                      }
                    </View>
                  )
                }
              }}
            />

            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                      <FontAwesome name="gear" size={24} color={focused ? "black" : "silver"} />
                      {focused ?
                        <Text style={{ fontSize: 12, color: "black" }}>Settings</Text> :
                        <Text style={{ fontSize: 12, color: "silver" }}>Settings</Text>
                      }
                    </View>
                  )
                }
              }}
            />

          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}
