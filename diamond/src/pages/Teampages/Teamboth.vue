<template>
  <div>
    <br>
    <br>
    <div class="teamclass"><i class="el-icon-suitcase-1"></i>&nbsp;我创建的团队<el-button type="primary" @click="handleCreateNewTeam" round size="mini" style="float: right;vertical-align: center;margin-right: 20px;margin-top: -5px">创建新团队</el-button></div>
    <hr>
    <br>
    <el-row>
      <el-col :span="10" v-for="(myCreateTeamItem, index) in myCreateTeamList" :key="index" :offset="index%2==0?0:2" style="margin-bottom: 30px">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{myCreateTeamItem.teamname}}</span>
            <el-button style="padding: 3px 0;margin-left: 240px" type="text" @click="gojoined(myCreateTeamItem)">查看团队</el-button>
          </div>
          <div class="text item">创建者:{{ myCreateTeamItem.creator }}</div>
          <div class="text item">创建时间:{{ myCreateTeamItem.createtime }}</div>
          <div class="text item">团队文档数:{{ myCreateTeamItem.tnum }}</div>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <br>
    <div class="teamclass"><i class="el-icon-suitcase"></i>&nbsp;我加入的团队</div>
    <hr>
    <br>
    <el-row>
      <el-col :span="10" v-for="(myTeamItem, index) in myTeamList" :key="index" :offset="index%2==0?0:2" style="margin-bottom: 30px">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>{{myTeamItem.teamname}}</span>
            <el-button style="padding: 3px 0;margin-left: 240px" type="text" @click="gojoined(myTeamItem)">查看团队</el-button>
          </div>
          <div class="text item">创建者:{{ myTeamItem.creator }}</div>
          <div class="text item">创建时间:{{ myTeamItem.createtime }}</div>
          <div class="text item">团队文档数:{{ myTeamItem.tnum }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
import {reqCreateTeam} from '../../api'
export default {
  name: 'Teamboth',
  mounted () {
    this.recordMyCreateTeam()
    this.recordMyTeam() //同步，获取成功
  },
  computed:{
    ...mapState(['userInfo','myTeamList','myCreateTeamList','checkTeamInfo'])
  },
  methods:{
    ...mapActions(['getMyTeam','getMyCreateTeam','recordMyTeam','recordMyCreateTeam','recordUserInfo',
    'getTeamInfo']),
    //页面跳转
    gocreated(myCreateTeamItem){
      this.$router.push('/workplace/team/created')
      //传值，将要传给Join界面的值保存到state中
      this.$store.dispatch('recordTeamInfo',myCreateTeamItem)
      this.$store.dispatch('getTeamMemberInfo',myCreateTeamItem)
    },
    gojoined(myTeamItem){
      this.$router.push('/workplace/team/joined')
      //传值，将要传给Join界面的值保存到state中
      this.$store.dispatch('recordTeamInfo',myTeamItem)
      this.$store.dispatch('getTeamMemberInfo',myTeamItem)
      console.log('Teamboth 存储')
      console.log(this.checkTeamInfo)
    },
    handleCreateNewTeam(){
      this.$prompt('请输入团队名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '创建成功'
        });
        console.log(value)//value指的输入的团队名字
        if(this.userInfo.userid) {
          //我创建的团队列表增加一个团队
          const result=reqCreateTeam(value, this.userInfo.userid)
          this.getMyCreateTeam()
          //重新获取创建团队列表
          if(result.status===0) {
            setTimeout(() => {
              this.getMyCreateTeam()
            }, 200)
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消创建'
        });
      });
    }
  }
}
</script>

<style scoped>
.teamclass{
  font-size: 20px;
  text-align: left;
  padding-left: 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  text-align: left;
}
</style>
