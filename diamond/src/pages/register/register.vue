<template>
  <div>
    <DiamondHeader title="金刚石文档注册">
      <div class="back" slot="left">
        <i class="iconfont icon-fanhui1"></i>
        <el-link target="_blank" @click="$router.back()" class="act_back">返回</el-link>
      </div>
      <div class="trick" slot="right">
          已有账号？
          <el-link type="primary" class="act_login">登录</el-link>
      </div>
    </DiamondHeader>
    <form @submit.prevent="login" class="login_wrap">
      <div class="login_wrap1">
        <section class="login_message">
          <input type="text" placeholder="设置用户名" v-model="name">
        </section>
        <section class="login_verification">
          <input type="password" placeholder="输入密码" v-model="pwd1">
        </section>
        <section class="login_verification">
          <input type="password" placeholder="再次输入密码" v-model="pwd2">
        </section>
      </div>
      <input type="submit" class="login_submit" value="注册">
      <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import AlertTip from '../../components/AlertTip'
import DiamondHeader from '../../components/DiamondHeader'

export default {
  name: 'register',
  data() {
    return {
      name: '', //用户名
      pwd1: '', //密码
      pwd2: '', //密码
      showAlert: false, //显示提示组件
      alertText: null, //提示的内容
    }
  },
  computed:{
    // rightEmail(){
    //   return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.email)
    // }
  },
  methods: {
    ...mapActions([
      'recordUserInfo',
    ]),

    // 发送登录信息
    async login () {
      const {pwd1, name, pwd2} = this
      // debugger
      if (!this.name) {
        this.showAlert = true
        this.alertText = '请输入用户名'
        return
      } else if (!this.pwd1) {
        this.showAlert = true;
        this.alertText = '请输入密码'
        return
      } else if (!this.pwd2) {
        this.showAlert = true;
        this.alertText = '请再次输入密码'
        return
      }else if (this.pwd1 && this.pwd2 && !(this.pwd1 === this.pwd2)) {
        this.showAlert = true;
        this.alertText = '两次密码输入不一致'
        return
      }
    },
    // 关系提示框
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
  },
  components: {
    AlertTip,
    DiamondHeader
  }
}
</script>

<style rel="stylesheet" scoped>
.login_wrap{
  width: 800px;
  margin: 20px auto;
  margin-top: 120px;
  /*background-color: #02a774;*/
  text-align: center;
}
.login_wrap1{
  margin: 20px auto;
  /*background-color: yellowgreen;*/
}
.login_message input,.login_verification input{
  margin-bottom: 40px;
  height: 50px;
  width: 50%;
  border-radius: 10px ;
  box-shadow: 0px 0px 5px gray;
  outline: none;
  padding-left:10px ;
}

.login_submit{
  width: 200px;
}
.login_submit{
  width: 200px;
  height: 40px;
  background-color: #409EFF;
  color:#ffffff;
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: bolder;
  border-radius: 5px;
  outline: none;
}
</style>
