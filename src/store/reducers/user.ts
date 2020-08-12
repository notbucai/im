import { SET_USERINFO } from '../constants/user'
import { ActionType } from '../types'

const INITIAL_STATE = {
  userinfo: null
}

export default function (state = INITIAL_STATE, action: ActionType): (typeof INITIAL_STATE) {
  switch (action.type) {
    case SET_USERINFO:
      return {
        ...state,
        userinfo: action.payload
      }
    default:
      return state
  }
}