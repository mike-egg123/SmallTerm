import {reqPwdLogout,reqGetStatus,reqGetAllCreateArticle,
  reqGetRecentArticle,reqGetAllLikesArticle,reqGetGarbageArticle} from '../api'
import {GET_USER_INFO,USER_LOGOUT,GET_CURRENT_LIST,GET_LIKE_LIST,
  GET_CREATE_LIST,GET_GRABAGE_LIST} from './mutation-types'
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
    // console.log(userInfo)
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
  },

  //异步获取最近浏览文档列表
  async getCurrentList({commit,state}){
    const currentList=await reqGetRecentArticle(state.userInfo.userid)
    commit(GET_CURRENT_LIST,{currentList})
  },

  //异步获取收藏的文档列表
  async getLikeList({commit,state}){
    const likeList=await reqGetAllLikesArticle(state.userInfo.userid)
    commit(GET_LIKE_LIST,{likeList})
  },

  //异步获取自己创建的文档列表
  async getCreateList({commit,state}){
    const createList=await reqGetAllCreateArticle(state.userInfo.userid)
    commit(GET_CREATE_LIST,{createList})
  },

  //异步获取在垃圾桶的文档列表
  async getGarbageList({commit,state}){
    const garbageList=await reqGetGarbageArticle(state.userInfo.userid)
    commit(GET_GRABAGE_LIST,{garbageList})
  },
}
