<template>
  <div>
    <DiamondHeader title="个人信息" style="width: 90%;margin: 10px auto">
      <div class="back" slot="left">
        <i class="iconfont icon-fanhui1"></i>
        <el-link target="_blank" @click="goTo_Workplace" class="act_back" style="text-decoration:none" :underline="false">返回搜索</el-link>
      </div>
<!--      <div class="trick" slot="right" style="text-align: end">-->
<!--        <el-dropdown trigger="click" style="outline: none" >-->
<!--          <span class="el-dropdown-link" >-->
<!--            点我查看<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->
<!--          </span>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item class="clearfix">-->
<!--              团队邀请-->
<!--              <el-badge class="mark" :value="12" />-->
<!--            </el-dropdown-item>-->
<!--            <el-dropdown-item class="clearfix">-->
<!--              文档评论-->
<!--              <el-badge class="mark" :value="3" />-->
<!--            </el-dropdown-item>-->
<!--            <el-dropdown-item class="clearfix">-->
<!--              踢出团队-->
<!--              <el-badge class="mark" :value="0" />-->
<!--            </el-dropdown-item>-->
<!--            <el-dropdown-item class="clearfix">-->
<!--              加入/退出团队-->
<!--              <el-badge class="mark" :value="2" />-->
<!--            </el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
<!--      </div>-->
    </DiamondHeader>
    <div class="personInfo_wrap">
      <div class="personInfo_left_wrap">
        <div class="personInfo_img_wrap">
          <img :src="otherUserInfo.avatar" alt="暂无头像">
        </div>
        <span class="personInfo_left_text">头 像</span>
      </div>
      <div class="personInfo_mid_wrap"></div>

      <form class="personInfo_right_wrap">
        <div class="personInfo_id"><span class="iconfont icon-idcard"></span> ID
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="email" v-model="otherUserInfo.userid" readonly>
        </div>
        <div class="personInfo_name"><span class="iconfont icon-gerenyonghutouxiang"></span> 昵称
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="otherUserInfo.username" readonly>
        </div>
        <div class="personInfo_email"><span class="iconfont icon-youxiang2"></span> 邮箱
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="email" v-model="otherUserInfo.email" readonly>
        </div>
        <div class="personInfo_phone"><span class="iconfont icon-shouji4"></span> 电话
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="otherUserInfo.phone" readonly>
          <el-link type="primary" class="change" @click="ChangePhone" v-show="isShow" :underline="false">修改</el-link>
        </div>
        <div class="personInfo_intro"><span class="iconfont icon-zhuye"></span> 简介
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="otherUserInfo.bio" readonly>
          <el-link type="primary" class="change" @click="ChangeIntro" v-show="isShow" :underline="false">修改</el-link>
        </div>
        <el-button type="danger" class="logout" @click="logout" v-show="isShow" round>退出登录</el-button>
        <el-button type="success" class="logout" @click="reply" v-show="!isShow" round>发私信</el-button>

      </form>

    </div>
  </div>
</template>

<script>
import DiamondHeader from '../../components/DiamondHeader'
import {mapActions,mapState} from 'vuex'
import {reqChange,reqSendPrivateMessage} from '../../api'
export default {
  name: "PersonInfo",
  components:{
    DiamondHeader
  },
  data:function (){
    return{
      src:'',
      file:{},
      file1:{},
      imgUrl:'',
      showAvatar:true
    }
  },
  computed:{
    ...mapState(['userInfo','otherUserInfo']),
    isShow(){
      return this.userInfo.userid==this.otherUserInfo.userid
    }
  },
  methods: {
    ...mapActions(['recordOtherUserInfo']),
    goTo_Workplace () {
      this.$router.go(-1)
    },
    AlertOpen (str, title, pattern, errors) {
      this.$prompt(str, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: pattern ? pattern : '',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: errors ? errors : ''
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: title + '成功！'
        });
        if (pattern) {
          console.log('patten')
          this.phone = value
          console.log('PersonInfo!!!')
          // const avatar=this.userInfo.avatar
          this.userInfo.phone = value
          let formData = new FormData()
          formData.append("userid", this.userInfo.userid)
          formData.append("phone", this.phone)
          formData.append("bio", this.userInfo.bio)
          formData.append("avatar", this.userInfo.avatar)
          //,this.userInfo.avatar.name
          reqChange(formData)
        } else {
          this.bio = value
          this.userInfo.bio = value
          let formData = new FormData()
          formData.append("userid", this.userInfo.userid)
          formData.append("phone", this.userInfo.phone)
          formData.append("bio", this.bio)
          formData.append("avatar", this.userInfo.avatar)
          //,this.userInfo.avatar.name
          reqChange(formData)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },
    ChangePhone () {
      this.AlertOpen('请输入新手机号码', '修改手机号码', /^1\d{10}$/, '输入手机号码格式不正确')
    },
    ChangeIntro () {
      this.AlertOpen('请输入新个人简介', '修改个人简介')
    },
    logout () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
            type: 'success',
            message: '退出成功!'
          },
          this.$store.dispatch('logout')
        );
        this.$router.replace('/welcome')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
    reply() {
      this.$prompt('请输入私信内容', '私信', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '私信请在140字以内！',
        inputPattern:/^.{0,140}$/,
        inputType:'textarea',
      }).then(async ({value}) => {
        //发送私信
        const res=await reqSendPrivateMessage(this.userInfo.userid,value,this.otherUserInfo.userid)
        this.$message({
          type: 'success',
          message: '发送成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消发送'
        });
      });
    },
  }
}
</script>

<style scoped rel="stylesheet">
DiamondHeader{
  /*display:flex;*/
  background-color: #02a774;
}
.el-dropdown-link:hover{
  color: #409EFF;
}
.personInfo_wrap{
  display: flex;
  /*background-color: #AAD3FE;*/
  width: 80%;
  margin: 20px auto;
  /*margin-top: 50px;*/
  height: 500px;
}
.personInfo_left_wrap{
  flex: 1;
  /*background-color: #699bff;*/
  /*line-height: 500px;*/
  padding-top: 150px;
}
.personInfo_left_text{
  display: inline-block;
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
}

.personInfo_img_wrap img{
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #AAD3FE;
}

/*竖线分割线*/
.personInfo_mid_wrap{
  width: 1px;
  height: 400px;
  margin-top: 50px;
  background-color: lightgray;
  /*border: #7e8c8d 1px solid;*/
}
.personInfo_right_wrap{
  flex: 2;
  /*background-color: #AAD3FE;*/
  font-size: 17px;
  padding-top: 120px;
}
.personInfo_right_wrap .iconfont{
  font-weight: bolder;
  color: gray;
  font-size: 19px;
}
.personInfo_right_wrap input{
  margin-bottom: 20px;
  width: 65%;
  height: 40px;
  border-radius: 5px;
  padding-left: 10px;
  outline: none;
  border:1px solid lightsteelblue;
}
.personInfo_right_wrap .change{
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: bold;
  text-decoration: none;
}
.personInfo_id{
  /*background-color: #C2E0FF;*/
  width: 300px;
  margin-left: 49px;
  /*margin-right: 512px;*/
  /*margin-bottom: 20px;*/
}
.personInfo_name,.personInfo_email{
  margin-left: -23px;
}
/*
退出登录
*/
.logout{
  width: 30%;
  margin-top: 20px;
}
</style>
