<template>
  <div>
    <el-row>
      <el-col :span="4" v-for="(garbageItem, index) in garbageList" :key="index" :offset="index%4==0?0:2">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 20px; -webkit-transition-duration:0.3s; -webkit-transition-timing-function:linear; -webkit-transition-delay:0.01s;">
          <GarbageArticle :garbageItem="garbageItem"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import GarbageArticle from '../../components/GarbageArticle'
export default {
  name: 'Recycler',
  mounted () {
    this.getGarbageList()
  },

  computed:{
    ...mapState(['garbageList'])
  },
  methods:{
    ...mapActions(['getGarbageList']),
  },
  components:{GarbageArticle}
  }
</script>


<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  margin-top: 8px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
