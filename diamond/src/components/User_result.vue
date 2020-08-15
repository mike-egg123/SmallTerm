<template>
    <div class="s_user">
      <el-avatar class="upic" size="large" :src="user.avatar"></el-avatar>
      <div class="uname">{{user.username}}</div>
    </div>
</template>
<script>
  export default {
    name: 'User_result',
    props:{
      user:Object
    }
  }
</script>

<style scoped>
  .uname{
    margin-top: 10px;
  }
  .upic{
    height: 100px;
    width: 100px;
  }
  .s_user{
    padding-top: 15px;
    padding-bottom: 15px;
  }
</style>
