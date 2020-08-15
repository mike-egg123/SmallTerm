<template>
  <div>
    <el-row>
      <el-col :span="3" v-for="(likeItem, index) in likeList" :key="index" :offset="index%6==0?0:1">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
          <LikeArticle :likeItem="likeItem"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapState,mapActions} from 'vuex'
  import LikeArticle from '../../components/LikeArticle'
  export default {
    name: 'Star',
    mounted () {
      this.recordLikeList()
    },
    computed:{
      ...mapState(['likeList'])
    },
    methods:{
      ...mapActions(['recordLikeList'])
    },
    components:{LikeArticle}
  }
</script>

<style scoped>

</style>
