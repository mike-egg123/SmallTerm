<template>
    <div>
      <el-card class="box-card" shadow="always">
        <img style="height: 100%;float: left" alt="doc" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597145866902&di=832fbb88637a7e41c778cdb9a8d8d0d3&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft17584%2F253%2F2043472217%2F52049%2F6f4f6993%2F5ae1354bN57b15f6e.jpg">
        <ul style="margin: 15px;line-height: 30px;float: left">
          <li>文档创建者:xxx</li>
          <li>所属团队:11111</li>
          <li>创建时间:2020/8/11 20:00</li>
          <li>文档大小:100kb</li>
        </ul>
      </el-card>
      <div style="font-size: 24px;font-weight: bold;text-align: left ;padding-top: 40px">成员权限：</div>
      <div>
        <ul class="memlist">
          <li v-for="(member,index) in members">
            {{member.name}}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-checkbox>查看</el-checkbox>
            <el-checkbox>编辑</el-checkbox>
            <el-checkbox>分享</el-checkbox>
          </li>
        </ul>
        <div style="margin-left: 400px">
          <el-button type="success" round @click="handlechange">确认修改</el-button>
          <el-button round @click="$router.back()">取消修改</el-button>
        </div>
      </div>
    </div>
</template>
<script>
  const aOptions = ['查看', '编辑','分享'];
  export default {
    name: 'Authorization',
    data(){
      return{
        members:[
          {id:1,name:'jack1'},
          {id:2,name:'jack2'},
          {id:3,name:'jack3'},
          {id:4,name:'jack4'},
        ],
        // checkAll: false,
        as: aOptions,
        // isIndeterminate: true
      }
    },
    methods:{
      handlechange() {
        this.$confirm('此操作将修改成员对此文档的权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.back(),
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      },
    }
  }
</script>

<style scoped>
  .box-card{
    text-align: left;
    height: 200px;
    display: flex;
  }
  .memlist{
    text-align: left;
    padding: 20px;
    line-height: 40px;
    font-size: 20px;
  }
</style>
