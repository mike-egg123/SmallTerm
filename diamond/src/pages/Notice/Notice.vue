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
      <div class="notice_title">团队邀请&nbsp;&nbsp;&nbsp;<el-badge class="mark" :value="3"  style="margin-top: -5px"/></div>
      <el-divider></el-divider>
      <el-table :data="inviteData" style="width: 100%">
        <el-table-column prop="team" label="团队" width="180px"> </el-table-column>
        <el-table-column prop="name" label="邀请人" width="180px"> </el-table-column>
        <el-table-column prop="time" label="时间" width="180px"> </el-table-column>
        <el-table-column label="处理" class="invite_action">
          <el-button type="success" round size="mini" class="invite_action"><i class="el-icon-circle-check"></i>&nbsp;&nbsp;同意</el-button>
          <el-button type="danger" round size="mini" class="invite_action"><i class="el-icon-circle-close"></i>&nbsp;&nbsp;拒绝</el-button>
        </el-table-column>
      </el-table>
      <div class="notice_title">文档评论&nbsp;&nbsp;&nbsp;<el-badge class="mark" :value="3"  style="margin-top: -5px"/></div>
      <el-divider></el-divider>
      <el-table :data="commentData" style="width: 100%">
        <el-table-column prop="doc" label="文档" width="180px"> </el-table-column>
        <el-table-column prop="name" label="评论用户" width="180px"> </el-table-column>
        <el-table-column prop="time" label="时间" width="180px"> </el-table-column>
        <el-table-column label="处理" class="invite_action">
          <el-button type="success" round size="mini" class="invite_action"><i class="el-icon-circle-check"></i>&nbsp;&nbsp;前往回复</el-button>
          <el-button type="danger" round size="mini" class="invite_action"><i class="el-icon-circle-close"></i>&nbsp;&nbsp;忽略</el-button>
        </el-table-column>
      </el-table>
      <div class="notice_title">踢出/加入团队&nbsp;&nbsp;&nbsp;<el-badge class="mark" :value="3"  style="margin-top: -5px"/></div>
      <el-divider></el-divider>
      <el-table :data="teamData" style="width: 100%">
        <el-table-column prop="team" label="团队" width="180px"> </el-table-column>
        <el-table-column prop="type" label="踢出/加入" width="180px"> </el-table-column>
        <el-table-column prop="time" label="时间" width="180px"> </el-table-column>
        <el-table-column label="处理" class="invite_action">
          <el-button type="primary" round size="mini" class="invite_action"><i class="el-icon-circle-close"></i>&nbsp;&nbsp;已读</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import DiamondHeader from '../../components/DiamondHeader'

  export default {
    name: "Notice",
    components:{
      DiamondHeader
    },

    methods:{
      goTo_Workplace(){
        this.$router.replace('/workplace')
      },
      goTo_PersonInfo(){
        this.$router.replace('/personInfo')
      },
    },
    data() {
      return {
        inviteData: [
          {
            time: '2016-05-02 20:00',
            name: '王小虎',
            team: 'xxx',
          },
          {
            time: '2016-05-02 20:00',
            name: '王小虎',
            team: 'xxx',
          },{
            time: '2016-05-02 20:00',
            name: '王小虎',
            team: 'xxx',
          }
        ],
        commentData: [
          {
            time: '2016-05-02 20:00',
            name: '王小虎',
            doc: 'xxx',
          },
          {
            time: '2016-05-02 20:00',
            name: '王小虎',
            doc: 'xxx',
          },{
            time: '2016-05-02 20:00',
            name: '王小虎',
            doc: 'xxx',
          }
        ],
        teamData: [
          {
            time: '2016-05-02 20:00',
            team: '王小虎',
            type: '您已被踢出团队！',
          },
          {
            time: '2016-05-02 20:00',
            team: '王小虎',
            type: '加入团队成功！',
          },{
            time: '2016-05-02 20:00',
            team: '王小虎',
            type: '加入团队成功！',
          }
        ],
      }
    },
  }

</script>

<style scoped rel="stylesheet">
  DiamondHeader{
    /*display:flex;*/
    background-color: #02a774;
  }
  .notice_main_body{
    width: 50%;
    margin: auto;
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
