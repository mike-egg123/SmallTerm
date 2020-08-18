<template>
    <div class="s_user">
      <router-link to="/otherPersonInfo">
        <el-avatar class="upic" size="large" :src="user.avatar"></el-avatar>
        <div class="uname">{{user.username}}</div>
      </router-link>
    </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'User_result',
    props:{
      user:Object
    },
    mounted () {
      if(this.user) {
        this.getOtherUserInfo(this.user.userid)
      }
    },
    computed:{
      ...mapState(['otherUserInfo'])
    },
    methods:{
      ...mapActions(['recordOtherUserInfo','getOtherUserInfo']),
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
