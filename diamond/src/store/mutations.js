import Vue from 'vue'
import {RECEIVE_USER_INFO} from './mutation-types'
export default {
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  }
}
