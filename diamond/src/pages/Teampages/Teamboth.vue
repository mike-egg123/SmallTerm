<template>
  <div>
    <br>
    <br>
    <div class="teamclass"><i class="el-icon-suitcase-1"></i>&nbsp;我创建的团队</div>
    <hr>
    <br>
    <el-row>
      <el-col :span="9" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>团队名称</span>
            <el-button style="padding: 3px 0;margin-left: 260px" type="text" @click="gocreated">查看团队</el-button>
          </div>
          <div class="text item">创建者:xxx</div>
          <div class="text item">创建时间:2020/8/11 20:00</div>
          <div class="text item">团队文档数:1</div>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <br>
    <div class="teamclass"><i class="el-icon-suitcase"></i>&nbsp;我加入的团队</div>
    <hr>
    <br>
    <el-row>
      <el-col :span="9" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>团队名称</span>
            <el-button style="padding: 3px 0;margin-left: 260px" type="text" @click="gojoined">查看团队</el-button>
          </div>
          <div class="text item">创建者:xxx</div>
          <div class="text item">创建时间:2020/8/11 20:00</div>
          <div class="text item">团队文档数:1</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'Teamboth',
    methods:{
      gocreated(){
        this.$router.push('/workplace/team/created')
      },
      gojoined(){
        this.$router.push('/workplace/team/joined')
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
