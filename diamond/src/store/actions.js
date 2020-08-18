import {reqPwdLogout,reqGetStatus,reqGetAllCreateArticle,reqMyJoinTeam,
  reqGetRecentArticle,reqGetAllLikesArticle,reqGetGarbageArticle,
  reqMyCreateTeam,reqGetTeamMember,reqMyJoinTeamYi,reqGetAllArticles,
  reqGetRecentArticleYi,reqGetAllLikesArticleYi,reqGetAllCreateArticleYi,
  reqGetGarbageArticleYi,reqMyCreateTeamYi,reqTeamInfo,reqSearchUser,reqSearchDoc,
  reqSearchTeam,reqGet,reqGetTeamMessage,reqGetCommentMessage,reqGetPrivateMessage} from '../api'
import {GET_USER_INFO,USER_LOGOUT,GET_CURRENT_LIST,GET_LIKE_LIST,
  GET_CREATE_LIST,GET_GRABAGE_LIST,GET_MY_TEAM,GET_MY_CREATE_TEAM,RECORD_KEYWORD,
  GET_CHECK_TEAM_INFO,GET_TEAM_MEMBER_INFO,GET_TEAM_ARTICLE,GET_SEARCH_USER_LIST,
  GET_SEARCH_ARTICLE_LIST,GET_SEARCH_TEAM_LIST,GET_OTHER_USER_INFO,
  GET_TEAM_MESSAGE_LIST,GET_COMMENT_MESSAGE_LIST,GET_PRIVATE_MESSAGE_LIST} from './mutation-types'
export default {
  //同步存储用户信息
  recordUserInfo ({commit}, userInfo) {
    commit(GET_USER_INFO, {userInfo})
  },
  //同步存储其他用户信息
  recordOtherUserInfo({commit},otherUserInfo){
    commit(GET_OTHER_USER_INFO, {otherUserInfo})
  },
  //异步存储用户信息
  async getOtherUserInfo({commit},userid){
    if(userid){
      const otherUserInfo = await reqGet({userid})
      console.log(otherUserInfo)
      commit(GET_OTHER_USER_INFO,{otherUserInfo})
    }
  },
  //异步存储用户信息
  async getUserInfo({commit}){
    //登录成功，调用接口获取信息
    const userInfo=await reqGetStatus()
    // console.log(userInfo)
    if(userInfo.status===0) {
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

  //同步获取最近浏览
  async recordCurrentList({commit}){
    const currentList=await reqGetRecentArticleYi()
    if(currentList) {
      commit(GET_CURRENT_LIST, {currentList})
    }
  },
  //异步获取最近浏览文档列表
  async getCurrentList({commit,state}){
    const currentList=await reqGetRecentArticle(state.userInfo.userid)
    commit(GET_CURRENT_LIST,{currentList})
  },

  //同步获取收藏的文档列表
  async recordLikeList({commit}){
    const likeList=await reqGetAllLikesArticleYi()
    if(likeList) {
      commit(GET_LIKE_LIST, {likeList})
    }
  },
  //异步获取收藏的文档列表
  async getLikeList({commit,state}){
    const likeList=await reqGetAllLikesArticle(state.userInfo.userid)
    commit(GET_LIKE_LIST,{likeList})
  },

  //同步获取自己创建的文档列表
  async recordCreateList({commit}){
    const createList=await reqGetAllCreateArticleYi()
    if(createList) {
      commit(GET_CREATE_LIST, {createList})
    }
  },
  //异步获取自己创建的文档列表
  async getCreateList({commit,state}){
    const createList=await reqGetAllCreateArticle(state.userInfo.userid)
    commit(GET_CREATE_LIST,{createList})
  },

  //同步获取在垃圾桶的文档列表
  async recordGarbageList({commit}){
    const garbageList=await reqGetGarbageArticleYi()
    if(garbageList) {
      commit(GET_GRABAGE_LIST, {garbageList})
    }
  },
  //异步获取在垃圾桶的文档列表
  async getGarbageList({commit,state}){
    const garbageList=await reqGetGarbageArticle(state.userInfo.userid)
    commit(GET_GRABAGE_LIST,{garbageList})
  },

  //同步获取我加入的所有团队的列表
  async recordMyTeam ({commit}) {
    const myTeamList=await reqMyJoinTeamYi()
    if(myTeamList) {
      commit(GET_MY_TEAM, {myTeamList})
    }
  },
  //异步获取我加入的所有团队的列表
  async getMyTeam({commit,state}){
    if(state.userInfo.userid) {
      const myTeamList = await reqMyJoinTeam(state.userInfo.userid)
      commit(GET_MY_TEAM, {myTeamList})
    }
  },

  //同步获取我创建的所有团队列表
  async recordMyCreateTeam({commit}){
    const myCreateTeamList=await reqMyCreateTeamYi()
    if(myCreateTeamList) {
      commit(GET_MY_CREATE_TEAM, {myCreateTeamList})
    }
  },
  //异步获取我创建的所有团队列表
  async getMyCreateTeam({commit,state}){
    const myCreateTeamList = await reqMyCreateTeam(state.userInfo.userid)
    commit(GET_MY_CREATE_TEAM, {myCreateTeamList})
  },
  //用于翻页
  increment:({commit})=> {
    commit('increment');
  },
  decrement:({commit}) => {
    commit('decrement');
  },
  clickAsync: ({commit}) => {
    new Promise((resolve) => {
      setTimeout(function(){
        commit('increment');
        resolve();
      },1000);
    })
  },

  //---------------某个团队具体的信息-----------------
  //同步存储点击查看团队的信息
  recordTeamInfo({commit},checkTeamInfo){
    if(checkTeamInfo) {
      commit(GET_CHECK_TEAM_INFO, {checkTeamInfo})
    }
  },
  //异步获取团队信息
  async getTeamInfo({commit},teamid){
    const checkTeamInfo=await reqTeamInfo(teamid)
    commit(GET_CHECK_TEAM_INFO, {checkTeamInfo})
  },

  //异步获取团队成员的信息
   async getTeamMemberInfo({commit},checkTeamInfo){
    if(checkTeamInfo) {
      const checkTeamMemberList =await reqGetTeamMember(checkTeamInfo.teamid)
      commit(GET_TEAM_MEMBER_INFO, {checkTeamMemberList})
    }
  },

  //异步获取某个团队的所有文档
  async getTeamArticle({commit},checkTeamInfo){
    if(checkTeamInfo) {
      const teamArticleList =await reqGetAllArticles(checkTeamInfo.teamid)
      commit(GET_TEAM_ARTICLE, {teamArticleList})
    }
  },

  //搜索
  //存储keyword
  async recordKeyword({commit},keyword){
    commit(RECORD_KEYWORD,{keyword})
  },

  //全局搜索用户，存储用户列表
  async recordSearchUser({commit},keyword){
    const userList=await reqSearchUser(keyword)
    commit(GET_SEARCH_USER_LIST,{userList})
  },
  //全局搜索文档，存储文档列表
  async recordSearchDoc({commit,state},keyword){
    const articleList=await reqSearchDoc(state.userInfo.userid,keyword)
    commit(GET_SEARCH_ARTICLE_LIST,{articleList})
  },
  //全局搜索团队，存储团队列表
  async recordTeamList({commit,state},keyword){
    const teamList=await reqSearchTeam(state.userInfo.userid,keyword)
    commit(GET_SEARCH_TEAM_LIST,{teamList})
  },

  //=======================消息=====================
  //存储团队消息通知列表
  async recordTeamMessageList({commit},userid){
    const teamMessageList=await reqGetTeamMessage(userid)
    commit(GET_TEAM_MESSAGE_LIST,{teamMessageList})
  },
  //存储评论信息通知列表
  async recordCommentMessageList({commit},userid){
    const commentMessageList=await reqGetCommentMessage(userid)
    commit(GET_COMMENT_MESSAGE_LIST,{commentMessageList})
  },
  //存储私信消息列表
  async recordPrivateMessageList({commit},userid){
    const privateMessageList=await reqGetPrivateMessage(userid)
    commit(GET_PRIVATE_MESSAGE_LIST,{privateMessageList})
  }
}
