import Vue from 'vue'
import {GET_USER_INFO,USER_LOGOUT,GET_CURRENT_LIST,GET_LIKE_LIST,
  GET_CREATE_LIST,GET_GRABAGE_LIST,GET_MY_TEAM,GET_MY_CREATE_TEAM,
  GET_CHECK_TEAM_INFO,GET_TEAM_MEMBER_INFO,GET_TEAM_ARTICLE,
  GET_SEARCH_USER_LIST,RECORD_KEYWORD,GET_SEARCH_ARTICLE_LIST,
  GET_SEARCH_TEAM_LIST} from './mutation-types'
export default {
  //存入userInfo
  [GET_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  //获取最近浏览文档列表，并存入currentList
  [GET_CURRENT_LIST](state,{currentList}){
    // console.log(currentList)
    state.currentList=currentList
  },
  //获取收藏文档列表，并存入likeList
  [GET_LIKE_LIST](state,{likeList}){
    // console.log(likeList)
    state.likeList=likeList
  },
  //获取自己创建的文档列表，并存入createList
  [GET_CREATE_LIST](state,{createList}){
    // console.log(createList)
    state.createList=createList
  },
  //获取回收站的文档列表，并存入garbageList
  [GET_GRABAGE_LIST](state,{garbageList}){
    // console.log(garbageList)
    state.garbageList=garbageList
  },
  //获取自己加入的所有团队
  [GET_MY_TEAM](state,{myTeamList}){
    state.myTeamList=myTeamList
  },
  //获取自己创建的所有团队
  [GET_MY_CREATE_TEAM](state,{myCreateTeamList}){
    state.myCreateTeamList=myCreateTeamList
  },


  //获取进入查看的团队的信息
  [GET_CHECK_TEAM_INFO](state,{checkTeamInfo}){
    state.checkTeamInfo=checkTeamInfo
    window.localStorage.setItem("key_checkTeamInfo",JSON.stringify(state.checkTeamInfo))
  },
  //获取查看的团队的成员信息
  [GET_TEAM_MEMBER_INFO](state,{checkTeamMemberList}){
    state.checkTeamMemberList=checkTeamMemberList
  },
  //获取某个团队的文档
  [GET_TEAM_ARTICLE](state,{teamArticleList}){
    state.teamArticleList=teamArticleList
  },
  //存储搜索关键词
  [RECORD_KEYWORD](state,{keyword}){
    state.keyword=keyword
  },
  //全局搜索获取用户列表,并存储
  [GET_SEARCH_USER_LIST](state,{userList}){
    state.userList=userList
  },
  //全局搜索获取文档列表,并存储
  [GET_SEARCH_ARTICLE_LIST](state,{articleList}){
    state.articleList=articleList
  },
  //全局搜索获取团队列表,并存储
  [GET_SEARCH_TEAM_LIST](state,{teamList}){
    state.teamList=teamList
  },

  //退出，清除userInfo
  [USER_LOGOUT](state){
    state.userInfo={}
  },

  //用于翻页
  increment(state) {//处理数据变化的函数
    state.front = state.front+5;
    state.count=state.count+5;
  },
  decrement(state) {
    if (state.front > 0) {
      state.front = state.front-5;
      state.count=state.count-5;
    }
  }
}
