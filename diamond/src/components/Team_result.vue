<template>
    <div class="s_team">
      <div slot="header" class="clearfix" style="padding-top: 5px">
        <span>团队名称</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="text">加入团队</el-button>
      </div>
      <div style="height: 1px;width: 90%;background-color: gainsboro;margin-bottom: 20px"></div>
      <div class="text item">创建者:xxx</div>
      <div class="text item">创建时间:2020/8/11 20:00</div>
      <div class="text item">团队文档数:1</div>
    </div>
</template>
<script>
  export default {
    name: 'Team_result'
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
</style>
