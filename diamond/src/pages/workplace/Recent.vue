<template>
  <div>
    <el-row>
      <el-col :span="4" v-for="(currentItem, index) in currentList" :key="index" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
          <CurrentArticle :currentItem="currentItem" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex'
  import CurrentArticle from '../../components/CurrentArticle'
  export default {
    name: 'Recent',
    mounted () {
      this.getCurrentList()
    },

    computed:{
      ...mapState(['currentList'])
    },
    methods:{
      ...mapActions(['getCurrentList']),
    },
    components:{CurrentArticle}
  }
</script>

<style scoped>

</style>
