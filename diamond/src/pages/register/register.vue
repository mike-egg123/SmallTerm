<template>
  <div>
    <DiamondHeader title="金刚石文档注册">
      <div class="back" slot="left">
        <i class="iconfont icon-fanhui1"></i>
        <el-link target="_blank" @click="$router.back()" class="act_back">返回</el-link>
      </div>
      <div class="trick" slot="right">
          已有账号？
          <router-link type="primary" class="act_login" to="/login">登录</router-link>
      </div>
    </DiamondHeader>
    <form @submit.prevent="login" class="login_wrap">
      <div class="login_wrap1">
        <section class="login_message">
          <input type="text" placeholder="设置用户名" v-model="name">
        </section>
        <section class="login_verification">
          <input type="email" placeholder="输入邮箱" v-model="email">
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
<!--      <AlertTip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>-->
      <CompleteInfo :name="name" :email="email" :pwd1="pwd1" v-show="showInfo" @infoSubmit="infoSubmit"/>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import AlertTip from '../../components/AlertTip'
import CompleteInfo from '../../components/CompleteInfo'
import DiamondHeader from '../../components/DiamondHeader'
import {reqPwdRegister} from '../../api'

export default {
  name: 'register',
  data() {
    return {
      name: '', //用户名
      pwd1: '', //密码
      pwd2: '', //密码
      email:'',
      showAlert: false, //显示提示组件
      alertText: null, //提示的内容
      showInfo: false,
      phone:'',
      bio:'',
      file: {}
    }
  },
  computed:{
    rightEmail(){
      return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(this.email)
    }
  },
  methods: {
    ...mapActions([
      'recordUserInfo',
    ]),
    alertOut(str){
      this.showAlert = true
      this.alertText = str
    },
    open(str) {
      this.$message({
          message: str,
          type: 'success',
          center: true,
      })
    },

    // 发送登录信息
    async login () {
      const {pwd1, name, pwd2, email} = this
      // debugger
      if (!this.name) {
        this.alertOut('请输入用户名')
        return
      } else if (!this.pwd1) {
        this.alertOut('请输入密码')
        return
      } else if (!this.pwd2) {
        this.alertOut('请再次输入密码')
        return
      }else if (this.pwd1 && this.pwd2 && !(this.pwd1 === this.pwd2)) {
        this.alertOut('两次密码输入不一致')
        return
      }else if(!this.email){
        this.alertOut('请输入邮箱')
        return
      }else if(this.email && !this.rightEmail){
        this.alertOut('邮箱不正确')
        return
      }
      const result=await reqPwdRegister(name,email,pwd1)
      console.log(result)
      if(result.status===0){
        //显示
        this.open('注册成功！')
        //成功
        const user=result.username
        //跳转页面
        // this.$router.replace('/login')
        this.showInfo=true
      }else{
        //失败
        const msg=result.message
        this.alertOut(msg)
        this.pwd1=''
        this.name=''
        this.pwd2=''
        this.email=''
      }
    },
    // 关系提示框
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },
    infoSubmit(phone,bio,file){
      this.phone=phone
      this.bio=bio
      this.file=file
      console.log(this.phone)
      console.log(this.bio)

      console.log(this.file)
      if(!this.phone){
        this.alertOut('请输入电话号码')
        return
      }
      else if(!(/^1\d{10}$/.test(this.phone))){
        this.alertOut('电话号码格式不正确')
        return
      }
      else if(!this.bio){
        this.alertOut('请写入个人简介')
        return
      }
      // else if(!this.file.name){
      //   this.alertOut('请传入个人头像')
      //   return
      // }
      else {
        this.open('个人信息填写完成！')
        //跳转页面
        this.$router.replace('/login')
      }
    }
  },
  components: {
    AlertTip,
    DiamondHeader,
    CompleteInfo
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
