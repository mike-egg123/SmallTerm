import {reqGetStatus} from '../api'
import {GET_USER_INFO} from './mutation-types'
export default {
//记录用户信息
  recordUserInfo ({commit}, userInfo) {
    commit(GET_USER_INFO, {userInfo})
  },
  async getUserInfo({commit}){
    const result=await reqGetStatus()
    if(result.status===0){
      console.log('action 测试：')
      console.log(result)
      commit(GET_USER_INFO, {result})
    }
  }
}
