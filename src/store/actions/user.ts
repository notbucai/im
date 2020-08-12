import { SET_USERINFO } from "../constants/user";
import { ActionType } from "../types";
import { tim } from "../../global";
import { ProfileToUserInfo } from "../../utils/business";

export const setUserAction: (payload: UserInfo) => ActionType = (payload) => ({
  type: SET_USERINFO,
  payload: payload
});

export const getUserAction = () => async (dispatch: (acton: ActionType) => void) => {
  const res = await tim.getMyProfile();
  const profile: Profile = res.data;
  const userinfo = ProfileToUserInfo(profile);

  return dispatch(setUserAction(userinfo));
}