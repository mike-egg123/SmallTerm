<template>
    <div>
      <div class="search_title">"{{keyword}}"的搜索结果:</div>
      <br>
      <br>
      <div>
        <div class="result_title">&nbsp;&nbsp;&nbsp;&nbsp;用户:</div>
        <div style="height:35px"></div>
        <el-row>
          <el-col :span="3" v-for="(user, index) in userList" :key="index" :offset="index > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
              <User_result :user="user"/>
              
            </el-card>
          </el-col>
        </el-row>
      </div>
      <br>
      <br>
      <div>
        <div class="result_title">&nbsp;&nbsp;&nbsp;&nbsp;团队:</div>
        <div style="height:35px"></div>
        <el-row>
          <el-col :span="5" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
              <Team_result></Team_result>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <br>
      <br>
      <div>
        <div class="result_title">&nbsp;&nbsp;&nbsp;&nbsp;我的文档:</div>
        <div style="height:35px"></div>
        <el-row>
          <el-col :span="3" v-for="(o, index) in 6" :key="o" :offset="index > 0 ? 1 : 0">
            <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
              <Article_result></Article_result>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

</template>
<script>
  import User_result from '../../components/User_result'
  import Team_result from '../../components/Team_result'
  import Article_result from '../../components/Article_result'
  import {mapState} from 'vuex'
  export default {
    name: 'SearchResult',
    components: {Article_result, Team_result, User_result},
    computed:{
      ...mapState(['keyword','userList'])
    },
  }
</script>

<style scoped>
 .search_title{
   font-size: 23px;
   color: #409eff;
   text-align: left;
 }
  .result_title{
    text-align: left;
    font-weight: bold;
  }
</style>
