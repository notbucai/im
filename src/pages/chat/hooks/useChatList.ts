/*
 * @Author: bucai
 * @Date: 2020-07-18 10:14:09
 * @LastEditors: bucai
 * @LastEditTime: 2020-07-18 10:30:56
 * @Description: 
 */
import { useReducer } from "react";

export const ChatActionType = {
  INIT: 'INIT',
  ADD: 'ADD',
};

export type ActionType = {
  type: string,
  payload: any
};

export function chatReducer<T> (state: T[], action: ActionType) {
  let newState = state;
  switch (action.type) {
    case ChatActionType.INIT:
      newState = action.payload;
      break;
    case ChatActionType.ADD:
      newState = JSON.parse(JSON.stringify(state));
      newState.push(action.payload);
      break;
    default:
      break;
  }

  return newState;
}

export default function useChatList<T> () {

  const [state, dispatch] = useReducer<(state: T[], action: ActionType) => T[], T[]>(chatReducer, [], (arg) => {
    return arg;
  });
  return { state, dispatch };
}