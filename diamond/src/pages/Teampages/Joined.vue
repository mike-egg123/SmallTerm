<template>
  <div>
    <diamond-header :title="checkTeamInfo.teamname">
      <div slot="right">
        <el-button type="danger" @click="handleDissolve" >退出团队</el-button>
        <el-button @click="drawer = true" type="warning" style="margin-left: 16px;">查看成员</el-button>
      </div>
    </diamond-header>
    <el-drawer :visible.sync="drawer" :direction="direction" >
      <div style="font-size: 23px;margin-bottom: 30px;margin-top: -10px">{{checkTeamInfo.creator}}的团队</div>
      <div style="text-align: right; margin-right: 30px;margin-top: 10px"><el-button type="success" round size="mini" @click="invite">邀请新成员</el-button></div>
      <ul>
        <li v-for="(checkTeamMember, index) in checkTeamMemberList" :key="index">
          <Member :title="checkTeamMember.username">
            <el-avatar size="small" :src="checkTeamMember.avatar" slot="left"></el-avatar>
<!--            <el-button type="danger" round slot="right" size="mini" class="memdelete" @click="handleDeleteMem" >删除成员</el-button>-->
          </Member>
        </li>
      </ul>
    </el-drawer>
    <el-row>
      <el-col style="text-align: left;padding: 20px">
        <div class="text item">创建者:{{checkTeamInfo.creator}}</div>
        <div class="text item">创建时间:{{checkTeamInfo.createtime}}</div>
        <div class="text item">团队成员人数:{{checkTeamInfo.tnum}}</div>
      </el-col>
      <hr>
      <!--创建的文档-->
      <el-col :span="3" v-for="(teamArticleItem, index) in teamArticleList" :key="index" :offset="index%5==0?0:1">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
          <TeamArticle :teamArticleItem="teamArticleItem"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import DiamondHeader from '../../components/DiamondHeader'
import Member from '../../components/Member'
import {mapState,mapActions} from 'vuex'
import TeamArticle from '../../components/TeamArticle'
import {reqExitTeam} from '../../api'
export default {
  name: 'Joined',
  components: {Member, DiamondHeader,TeamArticle},
  data() {
    return {
      drawer: false,
      direction: 'rtl',
    };
  },
  computed:{
    ...mapState(['userInfo','checkTeamInfo','checkTeamMemberList','teamArticleList']),
  },
  methods: {
    ...mapActions(['getTeamArticle','getMyCreateTeam','getMyTeam','getTeamInfo','getTeamMemberInfo']),
    handleDissolve() {
      this.$confirm('此操作将退出该团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.back(),
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        //退出团队:userid,teamid
        if(this.userInfo && this.checkTeamInfo) {
          //我创建\加入的团队列表减少一个团队
          const result=reqExitTeam(this.userInfo.userid,this.checkTeamInfo.teamid)
          //重新获取创建团队列表
          this.getMyCreateTeam()
          //重新获取加入团队列表
          this.getMyTeam()
          if(result.status===0) {
            setTimeout(() => {
              this.getMyCreateTeam()
              this.getMyTeam()
            }, 200)
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
    invite() {
      this.$prompt('请输入用户名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你邀请的新成员是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
  },
}
</script>
<style>
.el-drawer.rtl {
  overflow-y: scroll
}
.memdelete{
  opacity:0;
}
li{
  margin: 10px;
  padding: 5px;
  vertical-align: center;
}
li:hover{
  color: #409EFF;
}
li:hover .memdelete{
  opacity: 1;
}
/*.item {*/
/*  margin: 4px;*/
/*}*/

.left .el-tooltip__popper,
.right .el-tooltip__popper {
  padding: 8px 10px;
}
.text {
  /*font-size: 16px;*/
  /*letter-spacing: 2px;*/
}

.item {
  margin-bottom: 18px;
}
</style>
