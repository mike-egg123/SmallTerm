<template>
  <div>
    <diamond-header title="团队名称">
      <div slot="right">
        <el-button type="danger" @click="handleDissolve" >退出团队</el-button>
        <el-button @click="drawer = true" type="warning" style="margin-left: 16px;">查看成员</el-button>
      </div>
    </diamond-header>
    <el-drawer :visible.sync="drawer" :direction="direction" >
      <div style="font-size: 23px;margin-top: -50px;margin-bottom: 10px">xxx的团队</div>
      <div style="text-align: right; margin-right: 30px"><el-button type="success" round size="mini" @click="invite">邀请新成员</el-button></div>
      <ul>
        <li v-for="(o, index) in 10" :key="o">
          <Member title="某个成员">
            <el-button type="danger" round slot="right" size="mini" class="memdelete" @click="handleDeleteMem" >删除成员</el-button>
          </Member>
        </li>
      </ul>
    </el-drawer>
    <el-row>
      <el-col style="text-align: left;padding: 20px">
        <div class="text item">创建者:xxx</div>
        <div class="text item">创建时间:2020/8/11 20:00</div>
        <div class="text item">团队文档数:1</div>
      </el-col>
      <hr>
      <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597145866902&di=832fbb88637a7e41c778cdb9a8d8d0d3&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft17584%2F253%2F2043472217%2F52049%2F6f4f6993%2F5ae1354bN57b15f6e.jpg"  alt="word" class="image">
          <div style="padding: 20px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <br>
              <br>
              <el-tooltip class="item" effect="dark" content="收藏" placement="bottom-start">
                <el-button icon="el-icon-star-off" circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom-start">
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看权限" placement="bottom-start">
                <el-button type="primary" icon="el-icon-more-outline" circle @click="goauthorization_no"></el-button>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import DiamondHeader from '../../components/DiamondHeader'
  import Member from '../../components/Member'
  export default {
    name: 'Joined',
    components: {Member, DiamondHeader},
    data() {
      return {
        drawer: false,
        direction: 'rtl',
        currentDate: new Date()
      };
    },
    methods: {
      handleDeleteMem(){},
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
      goauthorization_no(){
        this.$router.push('/workplace/team/authorization_no')
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
