<template>
  <div>
    <DiamondHeader title="金刚石文档登录">
      <div class="back" slot="left">
        <i class="iconfont icon-fanhui1"></i>
        <el-link target="_blank" @click="$router.back()" class="act_back" :underline="false">返回</el-link>
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
        <section class="login_captcha">
          <input type="text" maxlength="11" placeholder="验证码" v-model="my_captcha">
          <div class="img_wrap"><img ref="captcha" class="get_verification" :src="captchaImg" alt="captcha" @click="getCaptchaCode"></div>
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
import {reqPwdLogin,reqGetValidCode} from '../../api'

export default {
  name: 'login',
  data() {
    return {
      showPassword: false, // 是否显示密码
      name: '', //用户名
      pwd: '', //密码
      showAlert: false, //显示提示组件
      alertText: null, //提示的内容
      captcha:'',
      my_captcha:'',
      captchaImg:'',
      captchaItem:{}
    }
  },
  async mounted () {
    this.captchaItem=await reqGetValidCode()
    this.captchaImg=this.captchaItem.url
    this.captcha=this.captchaItem.code
  },
  methods: {
    ...mapActions([
      'recordUserInfo',
    ]),
    //获取新得图片验证码
    async getCaptchaCode(event){
      this.captchaItem=await reqGetValidCode()
      event.target.src=this.captchaItem.url;
      this.captcha=this.captchaItem.code
    },
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
      }else if(!this.my_captcha){
        this.alertOut('请输入验证码')
        return
      }
      console.log(name)
      console.log(pwd)
      if(this.my_captcha.toLocaleLowerCase()!==this.captcha.toLocaleLowerCase()){
        this.alertOut('验证码不正确')
        return
      }
      const result = await reqPwdLogin(name, pwd)

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
    width: 600px;
    margin: 20px auto;
    margin-top: 70px;
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
    width: 70%;
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
    top:52.5%;
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
    width: 50%;
    height: 42px;
    background-color: #409EFF;
    color:#ffffff;
    font-size: 20px;
    letter-spacing: 3px;
    font-weight: bolder;
    border-radius: 5px;
    outline: none;
    /*position: absolute;*/
    /*left: 516px;*/
  }
  .login_wrap .get_verification{
    width: 170px;
    height: 40px;
  }
  .login_captcha{
    /*background-color: #fab;*/
    padding-left: 84px;
    padding-right: 50px
  }
  .login_captcha input{
    margin-bottom: 40px;
    height: 47px;
    width: 220px;
    border-radius: 10px ;
    box-shadow: 0px 0px 5px gray;
    outline: none;
    padding-left:10px ;
    float: left;
  }
  .login_captcha .img_wrap{
    display: inline;
    /*background-color: #abf;*/
    line-height: 50px;
  }
  .login_captcha .img_wrap img{
    width: 160px;
    height: 45px;
    border-radius: 10px;
  }
</style>
