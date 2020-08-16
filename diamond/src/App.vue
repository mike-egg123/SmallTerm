<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'App',
  mounted () {
    this.getUserInfo()
  },
  methods:{
    ...mapActions(['getUserInfo'])
  },
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
