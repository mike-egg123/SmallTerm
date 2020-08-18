<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
export default {
  name: 'App',
  //存储数据到硬盘上
  created(){
    setTimeout(() => {
      if (window.localStorage.getItem("key_data")) {
        this.$store.replaceState(Object.assign({},
          this.$store.state, JSON.parse(window.localStorage.getItem("key_data"))))
      }
      window.addEventListener("beforeunload", () => {
        window.localStorage.setItem("key_data", JSON.stringify(this.$store.state))
      })
    },800)
  },
  mounted () {
    //异步获取信息
    this.getUserInfo()
    this.getCurrentList()
    this.getLikeList()
    this.getCreateList()
    this.getGarbageList()
  },
  computed:{
    ...mapState(['checkTeamInfo'])
  },
  methods:{
    ...mapActions(['getUserInfo','getCurrentList','getLikeList','getCreateList','getGarbageList',
    'getMyTeam','getMyCreateTeam']),
  }
}
</script>

<style scoped rel="stylesheet">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
