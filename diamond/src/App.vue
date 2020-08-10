<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import DiamondHeader from './components/DiamondHeader'
import { Message } from 'element-ui'
export default {
  name: 'App',
  methods:{
    handleClick(){
      Message('弹出成功',{
        showClose: true,
        type: 'success',
        duration: 1000
      })

    }
  },
  // components:{
  //   DiamondHeader
  // }
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
