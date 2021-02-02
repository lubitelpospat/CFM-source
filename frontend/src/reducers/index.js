import {SET_USER} from "../constants/action-types"



const initialState = {
    user:
    {username: "",
    password: ""}
  };
  
  function rootReducer(state = initialState, action) {
      if (action.type == SET_USER){
        return action.payload;
      }
    return state;
  };
  
  export default rootReducer;