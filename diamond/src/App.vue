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
