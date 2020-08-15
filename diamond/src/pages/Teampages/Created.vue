<template>
  <div>
    <diamond-header :title="checkTeamInfo.teamname">
      <div slot="right">
        <el-button type="danger" @click="handleDissolve" >解散团队</el-button>
        <el-button @click="drawer = true" type="warning" style="margin-left: 16px;">管理成员</el-button>
      </div>
    </diamond-header>



    <el-drawer :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <div style="font-size: 23px;margin-bottom: 30px;margin-top: -10px">{{checkTeamInfo.creator}}的团队</div>
      <div style="text-align: right; margin-right: 30px;margin-top: 10px"><el-button type="success" round size="mini" @click="invite">邀请新成员</el-button></div>
      <ul>
        <li v-for="(checkTeamMember, index) in checkTeamMemberList" :key="index">
          <Member :title="checkTeamMember.username">
            <el-avatar size="small" :src="checkTeamMember.avatar" slot="left"></el-avatar>
            <el-button type="danger" round slot="right" size="mini" class="memdelete" @click="handleDeleteMem" >删除成员</el-button>
          </Member>
        </li>
      </ul>
    </el-drawer>




    <el-row>
      <el-col style="text-align: left;padding: 20px">
        <div class="text item">创建者:{{checkTeamInfo.creator}}</div>
        <div class="text item">创建时间:{{checkTeamInfo.createtime}}</div>
        <div class="text item">团队文档数:{{checkTeamInfo.tnum}}</div>
      </el-col>
      <hr>
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
import TeamArticle from '../../components/TeamArticle'
import {mapState,mapActions} from 'vuex'
import {reqExitTeam} from '../../api'
export default {
  name: 'Created',
  components: {Member, DiamondHeader,TeamArticle},
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      currentDate: new Date()
    };
  },
  created(){
    setTimeout(() => {
      if (window.localStorage.getItem("key_checkTeamInfo")) {
        this.$store.replaceState(Object.assign({},
          this.$store.state, JSON.parse(window.localStorage.getItem("key_checkTeamInfo"))))
      }
      window.addEventListener("beforeunload", () => {
        window.localStorage.setItem("key_checkTeamInfo", JSON.stringify(this.$store.state))
      })
    },1500)
  },
  computed:{
    ...mapState(['userInfo','checkTeamInfo','checkTeamMemberList','teamArticleList']),
  },
  methods: {
    ...mapActions(['getTeamArticle','getMyCreateTeam','getMyTeam','getTeamInfo','getTeamMemberInfo']),
    handleClose(done) {
      this.$confirm('管理完成！')
        .then(_ => {
          done();
          this.drawer=false;
        })
        .catch(_ => {
          this.drawer=true;
        });
    },
    handleDissolve() {
      this.$confirm('此操作将解散该团队, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.back(),
          this.$message({
            type: 'success',
            message: '解散成功!'
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解散'
        });
      });
    },
    handleDeleteMem() {
      this.$confirm('此操作将删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    invite() {
      this.$prompt('请输入用户名', '邀请新成员', {
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
  }
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
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  margin-top: 8px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.box {
  width: 400px;
}
.top {
  text-align: center;
}

.left {
  float: left;
  width: 60px;
}

.right {
  float: right;
  width: 60px;
}

.bottom {
  clear: both;
  text-align: center;
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

