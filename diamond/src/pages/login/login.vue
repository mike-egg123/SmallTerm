<template>
  <div>
    <DiamondHeader title="金刚石文档登录">
      <div class="back" slot="left">
        <i class="iconfont icon-fanhui1"></i>
        <el-link target="_blank" @click="$router.back()" class="act_back">返回</el-link>
      </div>
    </DiamondHeader>
    <form @submit.prevent="login" class="login_wrap">
      <div class="login_wrap1">
        <section class="login_message">
          <input type="text" placeholder="用户名" v-model="name">
        </section>
        <section class="login_verification">
          <input type="password" placeholder="密码" v-model="pwd" v-if="!showPassword">
          <input type="text" placeholder="密码" v-model="pwd" v-else>

          <div class="switch_button" :class="showPassword ? 'on' : 'off'"
               @click="showPassword=!showPassword">
            <div class="switch_circle" :class="{right: showPassword}"></div>
            <span class="switch_text">{{showPassword?'显示':''}}</span>
          </div>
        </section>
      </div>
      <input type="submit" class="login_submit" value="登录">
      <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import AlertTip from '../../components/AlertTip'
import DiamondHeader from '../../components/DiamondHeader'
import {reqPwdLogin} from '../../api'

export default {
  name: 'login',
  data() {
    return {
      showPassword: false, // 是否显示密码
      name: '', //用户名
      pwd: '', //密码
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

    //是否显示密码
    changePassWordType() {
      this.showPassword = !this.showPassword
    },
    alertOut(str){
      this.showAlert = true
      this.alertText = str
    },
    // 发送登录信息
    async login() {
      const {name,pwd}=this
      // debugger
      if (!this.name) {
        this.alertOut('请输入用户名')
        return
      } else if (!this.pwd) {
        this.alertOut('请输入密码')
        return
      }
      console.log(name)
      console.log(pwd)
      // try {
        const result = await reqPwdLogin(name, pwd)
      // }catch (e) {
        console.log("result:")
        console.log(result)
        console.log(result.status)
        if (result.status === 0) {
          //成功
          console.log('login测试1：')
          console.log(result)
          //存储用户
          this.recordUserInfo(result)
          //跳转页面
          this.$router.replace('/workplace')
        } else {
          //失败
          console.log('login测试失败：')
          console.log(result)
          console.log(result.status)
          this.alertOut('用户名或者密码不正确，请重新登录！')
          this.pwd = ''
          this.name = ''
        }
      // }
    },
    // 关系提示框
    closeTip() {
      this.showAlert = false
      this.alertText=''
    }
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
  .switch_button{
    font-size:12px;
    border:1px solid #ddd;
    border-radius:10px;
    transition:background-color .3s, border-color .3s;
    padding:0 6px;
    width:40px;
    height:20px;
    line-height:16px;
    color:#fff;
    position: absolute;
    top:60.5%;
    right:35%;

    transform:translateY(-50%);
  }
  .off{
    background:#fff;
    /*float:right;*/
    /*color: #ddd*/
  }
  .on {
    background:#409EFF
  }
  .switch_text {
    float:left;
    color:#fff
  }
  .switch_circle{
    position:absolute;
    top:-1px;
    left:-1px;
    width:20px;
    height:20px;
    border:1px solid #ddd;
    border-radius:50%;
    background:#fff;
    box-shadow:0 2px 4px 0 rgba(0, 0, 0, .1);
    transition:transform .3s;
  }
  .right {
    transform:translateX(33px)
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
