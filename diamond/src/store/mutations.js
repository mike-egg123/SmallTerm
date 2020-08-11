import Vue from 'vue'
import {GET_USER_INFO} from './mutation-types'
export default {
  [GET_USER_INFO] (state, {userInfo}) {
    console.log('mutations 测试：')
    console.log(userInfo)
    state.userInfo = userInfo
  }
}
