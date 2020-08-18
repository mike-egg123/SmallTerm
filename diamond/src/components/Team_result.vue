<template>
    <div class="s_team">
      <div slot="header" class="clearfix" style="padding-top: 5px">
        <span style="display: inline-block; white-space: nowrap; width: 60%; overflow: hidden; text-overflow:ellipsis;">{{team.teamname}}
          <span class="creator_syl" v-show="team.state===0">创建者</span>
        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="text" v-show="team.state===2" @click="handleJoin" class="team_button">申请加入</el-button>
        <el-button type="text" v-show="team.state!==2" class="team_button" style="color: gainsboro">已加入</el-button>
      </div>
      <div style="height: 1px;width: 90%;background-color: gainsboro;margin-bottom: 20px"></div>
      <div class="text item">创建者:{{team.teamcreator}}</div>
<!--      <div class="text item">创建时间:2020/8/11 20:00</div>-->
<!--      <div class="text item">团队文档数:1</div>-->
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import {reqApply} from '../api'
  export default {
    name: 'Team_result',
    props:{
      team:Object
    },
    computed:{
      ...mapState(['userInfo','keyword'])
    },
    methods:{
      ...mapActions(['recordTeamList']),
      async handleJoin(){
        //加入团队的接口
        // if(this.userInfo.userid) {
        //   const result =await reqJoinTeam(this.team.teamid, this.userInfo.userid)
        //   console.log(result)
        //   if(result && result.status===0){
        //     this.$message({
        //       message: '加入团队成功',
        //       type: 'success'
        //     });
        //     //设置加入状态
        //     this.team.state=1
        //     await this.recordTeamList(this.keyword)
        //   }
        //   else if(result && result.status!==0){
        //     this.$message.error('加入团队失败');
        //   }
        // }
        //发出申请加入的消息
        const res=await reqApply(this.team.teamid,this.userInfo.userid)
        this.$message({
          message: '已发送申请',
          type: 'success'
        });
      }
    }
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .s_team{
    text-align: left;
    padding-left: 20px;
  }
  .creator_syl{
    background-color: #67C23A;
    font-size: 12.7px;
    padding: 0.7px;
    border-radius: 5px;
    color: #ffffff;
  }

</style>
