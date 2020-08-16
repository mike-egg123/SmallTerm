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
