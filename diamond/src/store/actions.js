import {RECEIVE_USER_INFO} from './mutation-types'
export default {
//记录用户信息
  recordUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  }
}
