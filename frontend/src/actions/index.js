import {SET_USER} from "../constants/action-types"


export function setUser(payload) {

    return { type: SET_USER,
       payload }
  };