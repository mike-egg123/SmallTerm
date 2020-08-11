<template>
  <div>
    <DiamondHeader title="个人信息" style="width: 90%;margin: 10px auto">
      <div class="back" slot="left">
        <i class="iconfont icon-fanhui1"></i>
        <el-link target="_blank" @click="$router.back()" class="act_back" style="text-decoration:none">返回个人工作台</el-link>
      </div>
      <div class="trick" slot="right" style="text-align: end">
        <el-dropdown trigger="click" style="outline: none" >
          <span class="el-dropdown-link" >
            点我查看<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              团队邀请
              <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              文档评论
              <el-badge class="mark" :value="3" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              踢出团队
              <el-badge class="mark" :value="0" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
              加入/退出团队
              <el-badge class="mark" :value="2" />
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </DiamondHeader>
    <div class="personInfo_wrap">
      <div class="personInfo_left_wrap">
        <div class="personInfo_img_wrap">
          <img :src="src" alt="">
        </div>
        <div class="personInfo_left_text">用户信息查询</div>
      </div>
      <div class="personInfo_mid_wrap"></div>
      <div class="personInfo_right_wrap">
          <div class="personInfo_name"><span class="iconfont icon-gerenyonghutouxiang"></span> 昵称
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="userInfo.username">
            &nbsp;&nbsp;&nbsp;<el-link type="primary" class="change">修改</el-link>
          </div>
        <div class="personInfo_email"><span class="iconfont icon-youxiang2"></span> 邮箱
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="email" v-model="userInfo.email">
          &nbsp;&nbsp;&nbsp;<el-link type="primary" class="change">修改</el-link>
        </div>
        <div class="personInfo_pwd"><span class="iconfont icon-mima1"></span> 密码
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" v-model="userInfo.password">
          &nbsp;&nbsp;&nbsp;<el-link type="primary" class="change">修改</el-link>
        </div>
        <div class="personInfo_intro"><span class="iconfont icon-zhuye"></span> 简介
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="userInfo.bio">
          &nbsp;&nbsp;&nbsp;<el-link type="primary" class="change">修改</el-link>
        </div>
        <el-button type="danger" class="logout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import DiamondHeader from '../../components/DiamondHeader'
import {mapState} from 'vuex'
export default {
  name: "PersonInfo",
  components:{
    DiamondHeader
  },
  computed:{
    ...mapState(['userInfo'])
  },
  data:function (){
    return{
      src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597124598217&di=cf1fcfdefb903b90d663b9c1b7d011b2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117230425_eofqv.thumb.700_0.jpg'
    }
  },
  methods:{
    test(){
      console.log('PersonInfo测试：')
      console.log(this.userInfo)
    }
  },
  mounted () {
    this.test();
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
    margin-top: 20px;
    font-weight: bolder;
    font-size: 19px;
    letter-spacing: 1px;
  }

  .personInfo_img_wrap img{
    width: 150px;
    height: 150px;
    border-radius: 50%;

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
  /*
  退出登录
  */
  .logout{
    width: 30%;
    margin-top: 20px;
  }
</style>
