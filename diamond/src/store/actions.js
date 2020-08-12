import {reqPwdLogout,reqGetStatus} from '../api'
import {GET_USER_INFO,USER_LOGOUT} from './mutation-types'
export default {
  //同步存储用户信息
  recordUserInfo ({commit}, userInfo) {
    commit(GET_USER_INFO, {userInfo})
  },

  //异步存储用户信息
  async getUserInfo({commit}){
    //登录成功，调用接口获取信息
    console.log("action1:")
    const userInfo=await reqGetStatus()
    console.log(userInfo)
    if(userInfo.status===0) {
      console.log(userInfo)
      commit(GET_USER_INFO, {userInfo})
    }
  },

  //异步登出
  async logout({commit}){
    const result=await reqPwdLogout()
    if(result.status===0){
      commit(USER_LOGOUT)
    }
  }
}
