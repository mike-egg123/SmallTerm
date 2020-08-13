import Vue from 'vue'
import {GET_USER_INFO,USER_LOGOUT} from './mutation-types'
export default {
  [GET_USER_INFO] (state, {userInfo}) {
    console.log("get_user_info")
    console.log(userInfo)
    state.userInfo = userInfo
  },

  [USER_LOGOUT](state){
    state.userInfo={}
  }
}
