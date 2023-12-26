import {legacy_createStore as createStore} from 'redux'

const initialState = {
  followings: [] as string[],
  hideScore: false
}

const settingsReducer = (state = initialState, action: any) => {
  switch (action.type.charAt(0)) {
    case 'A':
      state.followings.push(action.type.substring(1))
      return {
        ...state,
      }
    case 'R':
      const index = state.followings.indexOf(action.type.substring(1))
      if (index > -1) {
        state.followings.splice(index)
      }
      return {
        ...state
      }
    case 'H':
      return {
        ...state,
        hideScore: !state.hideScore
      }
    default:
      return state
  }
}

const store = createStore(settingsReducer)

export default store
