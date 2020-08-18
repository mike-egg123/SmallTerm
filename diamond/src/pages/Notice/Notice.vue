<template>
  <div>
    <DiamondHeader title="通知中心" style="width: 90%;margin: 10px auto">
      <div class="back" slot="left">
        <i class="iconfont icon-fanhui1"></i>
        <el-link target="_blank" @click="goTo_Workplace" class="act_back" style="text-decoration:none" :underline="false">返回个人工作台</el-link>
      </div>
      <div class="trick" slot="right" style="text-align: end">
        <div class="userInfo_wrap">
          <el-button icon="el-icon-user-solid" circle @click="goTo_PersonInfo" type="primary"></el-button>
        </div>
      </div>
    </DiamondHeader>
    <div class="notice_main_body">
      <div class="notice_title">团队相关&nbsp;&nbsp;&nbsp;<el-badge class="mark" :value="teamMessageList.length" style="margin-top: -5px"/></div>
      <el-divider></el-divider>
      <el-table :data="teamMessageList" style="width: 100%">
        <el-table-column label="用户" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="团队" width="110px">
          <template slot-scope="scope">
            <span>{{ scope.row.teamname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="内容" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="160px">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="teamNoticeShow(scope.$index)">
              <el-button type="success" round size="mini" class="invite_action" @click="AgreeInvite(scope.$index)"><i class="el-icon-circle-check"></i>&nbsp;&nbsp;同意</el-button>
              <el-button type="danger" round size="mini" class="invite_action" @click="RefuseInvite(scope.$index)"><i class="el-icon-circle-close"></i>&nbsp;&nbsp;拒绝</el-button>
            </div>
            <div v-else>
              <el-button type="primary" round size="mini" class="invite_action" @click="AlreadyRead(scope.$index)">
                <i class="el-icon-circle-close"></i>&nbsp;&nbsp;已读
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="notice_title">评论相关&nbsp;&nbsp;&nbsp;<el-badge class="mark" :value="commentMessageList.length" style="margin-top: -5px"/></div>
      <el-divider></el-divider>
      <el-table :data="commentMessageList" style="width: 100%">
        <el-table-column prop="name" label="用户" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="article" label="文档" width="110px">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="message" label="内容" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="160px">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理" class="invite_action">
          <template slot-scope="scope">
            <el-button type="success" round size="mini" class="invite_action"><i class="el-icon-circle-check"></i>&nbsp;&nbsp;前往查看</el-button>
            <el-button type="danger" round size="mini" class="invite_action" @click="handleHaveRead(scope.$index)"><i class="el-icon-circle-close"></i>&nbsp;&nbsp;忽略</el-button>
          </template>
        </el-table-column>
      </el-table>



      <div class="notice_title">私信&nbsp;&nbsp;&nbsp;<el-badge class="mark" :value="privateMessageList.length"  style="margin-top: -5px"/></div>
      <el-divider></el-divider>
      <el-table :data="privateMessageList" style="width: 100%">
        <el-table-column prop="name" label="用户" width="110px">
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="message" label="内容" width="280px">
          <template slot-scope="scope">
            <span>{{ scope.row.message }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="180px" style="padding-left: 20px ">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理" class="invite_action" >
          <template slot-scope="scope">
            <el-button type="success" round size="mini" class="invite_action" @click="reply(scope.$index)"><i class="el-icon-circle-check"></i>&nbsp;&nbsp;回复</el-button>
            <el-button type="danger" round size="mini" class="invite_action" @click="handleDel(scope.$index)"><i class="el-icon-circle-close"></i>&nbsp;&nbsp;删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
import DiamondHeader from '../../components/DiamondHeader'
import {mapState,mapActions} from 'vuex'
import {
  reqAgreeInvitation, reqJoinTeam, reqRefuseInvitation, reqSolveTeamMessage,
  reqSolveCommentMessage, reqAgreeApply, reqRefuseApply, reqDeletePrivateMessage, reqSendPrivateMessage
} from '../../api'
export default {
  name: "Notice",
  components:{
    DiamondHeader
  },
  computed:{
    ...mapState(['userInfo','teamMessageList','commentMessageList','privateMessageList'])
  },
  mounted () {
    if(this.userInfo.userid) {
      this.recordTeamMessageList(this.userInfo.userid)
      this.recordCommentMessageList(this.userInfo.userid)
      this.recordPrivateMessageList(this.userInfo.userid)
    }
  },

  methods:{
    ...mapActions(['recordTeamMessageList','recordCommentMessageList','recordPrivateMessageList']),
    goTo_Workplace(){
      this.$router.replace('/workplace')
    },
    goTo_PersonInfo(){
      this.$router.replace('/personInfo')
    },
    teamNoticeShow(index){
      if(this.teamMessageList[index].messagetype==1 || this.teamMessageList[index].messagetype==4){
        return true
      }
      else return false
    },
    //同意邀请1 / 同意申请4
    async AgreeInvite(index){
      if(this.teamMessageList[index].messagetype==1) {
        //发出同意申请的消息
        await reqAgreeInvitation(this.teamMessageList[index].teamid, this.teamMessageList[index].userid, this.userInfo.userid)
        //加入团队
        const result = await reqJoinTeam(this.teamMessageList[index].teamid, this.userInfo.userid)
        if (result && result.status === 0) {
          this.$message({
            message: '接收邀请，加入团队成功',
            type: 'success'
          });
          //删除团队消息通知
          const res = await reqSolveTeamMessage(this.teamMessageList[index].messageid)
          //更新消息列表
          await this.recordTeamMessageList(this.userInfo.userid)
          await this.recordCommentMessageList(this.userInfo.userid)
          await this.recordPrivateMessageList(this.userInfo.userid)
        } else if (result && result.status !== 0) {
          this.$message.error('加入团队失败');
        }
      }
      else if(this.teamMessageList[index].messagetype==4) {
        //发出同意申请的消息
        await reqAgreeApply(this.teamMessageList[index].teamid, this.teamMessageList[index].userid, this.userInfo.userid)
        //加入团队
        const result = await reqJoinTeam(this.teamMessageList[index].teamid, this.teamMessageList[index].userid)
        if (result && result.status === 0) {
          this.$message({
            message: `已同意${this.teamMessageList[index].username}加入团队`,
            type: 'success'
          });
          //删除团队消息通知
          const res = await reqSolveTeamMessage(this.teamMessageList[index].messageid)
          //更新消息列表
          await this.recordTeamMessageList(this.userInfo.userid)
          await this.recordCommentMessageList(this.userInfo.userid)
          await this.recordPrivateMessageList(this.userInfo.userid)
        } else if (result && result.status !== 0) {
          this.$message.error('因异常，未能处理该消息');
        }
      }
    },
    //拒绝邀请1 / 拒绝申请2
    async RefuseInvite(index){
      if(this.teamMessageList[index].messagetype==1) {
        //发出拒绝邀请的消息
        const res = reqRefuseInvitation(this.teamMessageList[index].teamid, this.teamMessageList[index].userid, this.userInfo.userid)
        this.$message({
          message: `已拒绝${this.teamMessageList[index].username}的邀请`,
          type: 'success'
        });
        //删除团队消息通知
        const res1 = await reqSolveTeamMessage(this.teamMessageList[index].messageid)
        //更新消息列表
        await this.recordTeamMessageList(this.userInfo.userid)
        await this.recordCommentMessageList(this.userInfo.userid)
        await this.recordPrivateMessageList(this.userInfo.userid)
      }
      else if(this.teamMessageList[index].messagetype==4) {
        //发出拒绝申请的消息
        const res = reqRefuseApply(this.teamMessageList[index].teamid, this.teamMessageList[index].userid, this.userInfo.userid)
        this.$message({
          message: `已拒绝${this.teamMessageList[index].username}的申请`,
          type: 'success'
        });
        //删除团队消息通知
        const res1 = await reqSolveTeamMessage(this.teamMessageList[index].messageid)
        //更新消息列表
        await this.recordTeamMessageList(this.userInfo.userid)
        await this.recordCommentMessageList(this.userInfo.userid)
        await this.recordPrivateMessageList(this.userInfo.userid)
      }
    },
    //已阅读
    async AlreadyRead(index){
      this.$message({
        message: '已阅读',
        type: 'info'
      });
      //删除团队消息通知
      const res1=await reqSolveTeamMessage(this.teamMessageList[index].messageid)
      console.log(res1)
      //更新消息列表
      await this.recordTeamMessageList(this.userInfo.userid)
    },
    //前往查看（跳转对应article）
    //忽略
    async handleHaveRead(index){
      this.$message({
        message: '已忽略该条评论',
        type: 'info'
      });
      //删除评论消息通知
      const res1=await reqSolveCommentMessage(this.commentMessageList[index].messageid)
      console.log(res1)
      //更新消息列表
      await this.recordCommentMessageList(this.userInfo.userid)
    },

    reply(index) {
      this.$prompt('请输入回复内容', '私信', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '私信请在140字以内！',
        inputPattern:/^.{0,140}$/,
        inputType:'textarea',
      }).then(async ({value}) => {
        //发送私信
        const res=await reqSendPrivateMessage(this.userInfo.userid,value,this.privateMessageList[index].userid)
        this.$message({
          type: 'success',
          message: '回复成功'
        });
        //输出该条记录
        await reqDeletePrivateMessage(this.privateMessageList[index].messageid)
        //更新私信列表
        await this.recordPrivateMessageList(this.userInfo.userid)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消回复'
        });
      });
    },
    async handleDel(index){
      if(this.privateMessageList[index]) {
        this.$message({
          message:'已删除该条私信',
          type:'info'
        })
        //删除私信通知
        await reqDeletePrivateMessage(this.privateMessageList[index].messageid)
        //更新私信列表
        await this.recordPrivateMessageList(this.userInfo.userid)
      }
    }
  }
}

</script>

<style scoped rel="stylesheet">
DiamondHeader{
  /*display:flex;*/
  background-color: #02a774;
}
.notice_main_body{
  width: 66%;
  margin:50px auto;
}
.invite_action{
  opacity: 0;
}
.invite_action:hover{
  opacity: 1;
}
.notice_title{
  font-size: 20px;
  text-align: left;
  margin-top: 50px;
  color: #409eff;
}
</style>
