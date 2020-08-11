import {reqUserInfo} from '../api'
import {RECEIVE_USER_INFO} from './mutation-types'
export default {
//记录用户信息
  recordUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  async getUserInfo({commit}){
    const result=await reqUserInfo()
    if(result.status===0){
      // console.log(2)
      // console.log(result)
      const user=result.username
      commit(RECEIVE_USER_INFO, {user})
    }
  }
}
